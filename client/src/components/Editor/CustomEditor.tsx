import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'prismjs/themes/prism.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { Editor } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import styled from 'styled-components';
import { sendImage } from '../../Utils/ApiCall';



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
            ['image']
          ]}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              console.log(blob);  // File {name: '카레유.png', ... }
              const formData = new FormData();
		        	formData.append('imgUrl', blob);
  
              // 1. 첨부된 이미지 파일을 서버로 전송후, 이미지 경로 url을 받아온다.
              // const imgUrl = await .... 서버 전송 / 경로 수신 코드 ...
              
            // 2. 첨부된 이미지를 화면에 표시(경로는 임의로 넣었다.)
              callback('http://localhost:5000/img/카레유.png', '카레유');
  
              

            }
          }}
  
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