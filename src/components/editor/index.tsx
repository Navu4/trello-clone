import ReactQuill, { ReactQuillProps } from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface EditorProps extends ReactQuillProps {
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const QuillEditor = (props: EditorProps) => {
  return <ReactQuill theme="snow" {...props}  value={props.description} onChange={props.setDescription} />;
};
export default QuillEditor;
