"use client";
import MDEditor from "@uiw/react-md-editor";
import React from "react";

interface TuiEditorProps {
  content: string;
  contentChange: (value: string) => void;
}

const TuiEditor: React.FC<TuiEditorProps> = ({ content, contentChange }) => {
  return (
    <div className="w-full" data-color-mode="light">
      <MDEditor
        height={500}
        value={content}
        onChange={(value) => contentChange(value || "")}
        preview="edit"
      />
    </div>
  );
};

export default TuiEditor;
