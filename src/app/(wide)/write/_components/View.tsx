import MDEditor from "@uiw/react-md-editor";

export default function Viewer({ content }: { content: string }) {
  return (
    <div
      className="wmde-markdown wmde-markdown-color
                 bg-background text-foreground "
    >
      <MDEditor.Markdown source={content} />
    </div>
  );
}
