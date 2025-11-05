import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
import { EditorProps } from "@toast-ui/react-editor";

const WrappedEditor = dynamic(() => import("./EditorWrapper"), { ssr: false });

const TuiEditor = (props: EditorProps) => {
  return <WrappedEditor {...props} />;
};

export default TuiEditor;
