"use client";

import { useRef } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";

export default function Page() {
  const emailEditorRef = useRef<EditorRef>(null);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { html } = data;
      navigator.clipboard.writeText(html);
    });
  };

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
    console.log(unlayer);
  };
  return (
    <>
      <div className="h-full flex flex-col p-8">
        <button onClick={exportHtml}>Export HTML</button>
        <EmailEditor
          editorId="email-editor"
          ref={emailEditorRef}
          onReady={onReady}
        />
      </div>
    </>
  );
}
