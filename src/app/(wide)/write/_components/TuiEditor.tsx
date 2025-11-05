import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";

const WrappedEditor = dynamic(() => import("./EditorWrapper"), { ssr: false });

const TuiEditor = (props) => {
  return <WrappedEditor {...props} />;
};

export default TuiEditor;
