import { createServer } from "http"
import { randomBytes } from "crypto"
import { readFileSync, existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const SCOPES = ["https://www.googleapis.com/auth/drive.file"]
const REDIRECT_PORT = 3456
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}/callback`

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, "..")
const jsonPath = join(projectRoot, "google-oauth-client.json")

console.log(`
╔══════════════════════════════════════════════════╗
║     Google Drive OAuth 2.0 Setup                ║
╚══════════════════════════════════════════════════╝
`)

let CLIENT_ID, CLIENT_SECRET

if (existsSync(jsonPath)) {
  const raw = readFileSync(jsonPath, "utf8")
  const parsed = JSON.parse(raw)
  const installed = parsed.installed || parsed.web
  if (!installed || !installed.client_id || !installed.client_secret) {
    console.error("✖ google-oauth-client.json is missing client_id or client_secret.")
    process.exit(1)
  }
  CLIENT_ID = installed.client_id
  CLIENT_SECRET = installed.client_secret
  console.log("✓ Loaded credentials from google-oauth-client.json")
  console.log(`  Client ID: ${CLIENT_ID.substring(0, 20)}...`)
  console.log("  Client Secret: [SET]")
} else {
  CLIENT_ID = (await ask("Enter your Google OAuth Client ID:")).trim()
  CLIENT_SECRET = (await ask("Enter your Google OAuth Client Secret:")).trim()
}

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("\n✖ Both Client ID and Client Secret are required.")
  process.exit(1)
}

const state = randomBytes(16).toString("hex")

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")
authUrl.searchParams.set("client_id", CLIENT_ID)
authUrl.searchParams.set("redirect_uri", REDIRECT_URI)
authUrl.searchParams.set("response_type", "code")
authUrl.searchParams.set("scope", SCOPES.join(" "))
authUrl.searchParams.set("access_type", "offline")
authUrl.searchParams.set("prompt", "consent")
authUrl.searchParams.set("state", state)

console.log(`
╔══════════════════════════════════════════════════════════════╗
║  Authorize in your browser                                  ║
║                                                              ║
║  A local server will start on http://localhost:${REDIRECT_PORT}  ║
║  to receive the authorization code.                          ║
║                                                              ║
║  If the browser doesn't open automatically, copy this URL:   ║
╚══════════════════════════════════════════════════════════════╝

${authUrl.toString()}
`)

const code = await startRedirectServer(state)
console.log("\n✓ Authorization code received. Exchanging for tokens...\n")

const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  }),
})

if (!tokenRes.ok) {
  const err = await tokenRes.text()
  console.error(`\n✖ Token exchange failed: ${tokenRes.status} ${err}`)
  process.exit(1)
}

const tokens = await tokenRes.json()

if (!tokens.refresh_token) {
  console.error(`
✖ No refresh_token returned.
  This usually happens if you've already authorized this app.
  Revoke access at https://myaccount.google.com/permissions and try again.
`)
  process.exit(1)
}

console.log("═══════════════════════════════════════════════════════════════")
console.log("  SUCCESS")
console.log("")
console.log("  Add these variables to .env.local:")
console.log("")
console.log(`  GOOGLE_OAUTH_CLIENT_ID=${CLIENT_ID}`)
console.log(`  GOOGLE_OAUTH_CLIENT_SECRET=${CLIENT_SECRET}`)
console.log(`  GOOGLE_OAUTH_REFRESH_TOKEN=${tokens.refresh_token}`)
console.log("")
console.log("  All 5 folder IDs stay unchanged.")
console.log("  Remove: GOOGLE_DRIVE_CLIENT_EMAIL, GOOGLE_DRIVE_PRIVATE_KEY")
console.log("═══════════════════════════════════════════════════════════════")

async function ask(prompt) {
  process.stdout.write(prompt + " ")
  for await (const line of console) {
    return line
  }
}

function startRedirectServer(expectedState) {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url, `http://localhost:${REDIRECT_PORT}`)

      if (url.pathname === "/callback") {
        const code = url.searchParams.get("code")
        const state = url.searchParams.get("state")
        const error = url.searchParams.get("error")

        if (error) {
          res.writeHead(400, { "Content-Type": "text/html" })
          res.end(`<h1>Authorization failed</h1><p>${error}</p>`)
          reject(new Error(`OAuth error: ${error}`))
          server.close()
          return
        }

        if (state !== expectedState) {
          res.writeHead(400, { "Content-Type": "text/html" })
          res.end("<h1>State mismatch</h1>")
          reject(new Error("State mismatch"))
          server.close()
          return
        }

        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(`<html><body style="font-family:sans-serif;padding:2rem;text-align:center;"><h1 style="color:#16a34a;">✓ Authorization complete</h1><p>Close this tab and return to the terminal.</p></body></html>`)
        server.close()
        resolve(code)
      }
    })

    server.listen(REDIRECT_PORT, () => {
      const open = `start "" "${authUrl.toString()}"`
      console.log("Opening browser for authorization...")
      try {
        import("child_process").then((cp) => cp.exec(open))
      } catch {
        // user will open the URL manually
      }
    })

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`\nPort ${REDIRECT_PORT} is in use. Close the other process and try again.`)
      }
      reject(err)
    })
  })
}
