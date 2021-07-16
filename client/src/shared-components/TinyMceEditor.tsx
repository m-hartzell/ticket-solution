import { useEffect, useRef } from "react";
import tinymce, { Editor } from "tinymce";
import "tinymce/themes/silver";
import "tinymce/icons/default";
import { StyledTextArea } from "./Form";

function TinyMceEditor(props: TinyMceEditorProps) {
  const textarea = useRef(null);
  const tinymceInstance = useRef<any>(null);

  useEffect(() => {
    if (!tinymceInstance.current) {
      tinymce
        .init({
          selector: "textarea",
          height: "20rem",
          setup: (editor: Editor) => {
            tinymceInstance.current = editor;
            editor.on("keyup change", () =>
              props.onBodyChange(editor.getContent())
            );
          },
        })
        .then((editors: Editor[]) => editors[0].setContent(props.content));
    }
  });

  return <StyledTextArea ref={textarea}></StyledTextArea>;
}

export default TinyMceEditor;

interface TinyMceEditorProps {
  content: string;
  onBodyChange: (content: string) => void;
}
