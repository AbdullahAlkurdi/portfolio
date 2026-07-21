"use client";

import { Button } from "@/components/ui/button";
import { Body } from "@/components/ui/typography/body";
import { resumeUi } from "@/content/data/resume-ui";
import { Printer } from "lucide-react";

export function ResumePrintButton() {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.print()}
      >
        <Printer size={14} />
        {resumeUi.header.downloadLabel}
      </Button>
      <Body size="sm" className="mt-2 text-muted-foreground">
        {resumeUi.header.downloadDescription}
      </Body>
    </>
  );
}
