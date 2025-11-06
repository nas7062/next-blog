import MDEditor from "@uiw/react-md-editor";

export default function Viewer({ content }: { content: string }) {
  return (
    <div className="wmde-markdown-var">
      <MDEditor.Markdown source={content} />
    </div>
  );
}
