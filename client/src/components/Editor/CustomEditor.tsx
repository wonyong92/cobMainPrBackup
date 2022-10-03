import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'prismjs/themes/prism.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { Editor } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import styled from 'styled-components';



export interface EditorProp {
  height?: string;
  editorRef?: any;
  value: string;
  current?: any;
  onChange: () => void;
  ref?: any;
  
}

const CustomEditor = ({
  height = '500px',
  value,
  editorRef,
  onChange,
  
}: EditorProp) => {
  
  return (
    <>
      <EditorBorder>
        <Editor
          initialValue={value}
          height={height}
          useCommandShortcut
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]} // 코드블럭 하이라이트
          toolbarItems={[
            ['bold', 'italic', 'strike'],
            ['code', 'codeblock'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
          ]}
          autofocus={false}
          ref={editorRef}
          onChange={onChange}
        />
      </EditorBorder>
    </>
  );
};

const EditorBorder = styled.div`
  position: relative;
  outline: rgba(0, 0, 0, 0) solid 4px;
  border: 1px solid rgba(0, 0, 0, 0);
  svg {
    position: absolute;
    top: 230px;
    right: 10px;
    color: hsl(358, 68%, 59%);
    font-size: 20px;
  }
`;

const ErrorMsg = styled.p`
  margin-top: 10px;
  color: hsl(358, 62%, 52%);
  font-size: 12px;
`;
export default CustomEditor;