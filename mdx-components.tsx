import type { MDXComponents } from "mdx/types";
import { Heading } from "@/components/ui/typography/heading";
import { Body } from "@/components/ui/typography/body";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";

const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <Heading level="1" as="h1" className="mb-6 mt-12 first:mt-0" {...props}>
      {children}
    </Heading>
  ),
  h2: ({ children, ...props }) => (
    <Heading level="2" as="h2" className="mb-4 mt-10" {...props}>
      {children}
    </Heading>
  ),
  h3: ({ children, ...props }) => (
    <Heading level="3" as="h3" className="mb-3 mt-8" {...props}>
      {children}
    </Heading>
  ),
  h4: ({ children, ...props }) => (
    <Heading level="4" as="h4" className="mb-2 mt-6" {...props}>
      {children}
    </Heading>
  ),
  p: ({ children, ...props }) => (
    <Body className="mb-4 last:mb-0" {...props}>
      {children}
    </Body>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-4 list-disc space-y-1 pl-6 last:mb-0" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 list-decimal space-y-1 pl-6 last:mb-0" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-base leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mb-4 border-l-4 border-primary pl-4 italic last:mb-0"
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-2 hover:text-primary/80"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  hr: (props) => <hr className="my-8 border-border" {...props} />,
  pre: ({ children, ...props }) => {
    const codeEl = children as React.ReactElement<{
      className?: string;
      children?: string;
    }>;
    const lang = codeEl?.props?.className?.replace("language-", "") ?? "";
    const code = codeEl?.props?.children?.toString() ?? "";
    if (lang) {
      return <CodeBlock code={code} language={lang} className="mb-4" />;
    }
    return (
      <pre className="mb-4 overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm last:mb-0" {...props}>
        {children}
      </pre>
    );
  },
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  img: ({ alt, src, ...props }) => (
    <figure className="mb-6 mt-6 last:mb-0">
      <img
        src={src}
        alt={alt ?? ""}
        className="w-full rounded-lg border border-border"
        loading="lazy"
        {...props}
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  Image: ({ alt, src, ...props }) => (
    <figure className="mb-6 mt-6 last:mb-0">
      <img
        src={src}
        alt={alt ?? ""}
        className="w-full rounded-lg border border-border"
        loading="lazy"
        {...props}
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  table: ({ children, ...props }) => (
    <div className="mb-4 overflow-x-auto last:mb-0">
      <table
        className="w-full border-collapse text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="border-b border-border bg-muted/50" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody {...props}>{children}</tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="border-b border-border last:border-0" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-sm" {...props}>
      {children}
    </td>
  ),
  Callout,
  CodeBlock,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
