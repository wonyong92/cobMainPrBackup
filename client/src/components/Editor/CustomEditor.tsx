import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'prismjs/themes/prism.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { Editor } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import styled from 'styled-components';
import imageCompression from 'browser-image-compression';

export interface EditorProp {
  height?: string;
  editorRef?: any;
  value: string;
  current?: any;
  onChange: () => void;
  ref?: any;
  sendImage: (image: FormData, postId: number) => Promise<any>;
  props?: any;
  setImageFile?: (data: FormData) => void;
  setImageUrl?: (any: string) => void;
}

const CustomEditor = ({
  height = '500px',
  value,
  editorRef,
  onChange,
  setImageFile,
  setImageUrl,
}: EditorProp) => {
  const getCompressedFile = async (blob: any) => {
    const uploadedFile = new File([blob], 'theBlob', {
      lastModified: new Date().getTime(),
      type: blob.type,
    });
    const options = {
      maxSizeMB: 5,
    };
    return await imageCompression(uploadedFile, options);
  };
  return (
    <>
      <EditorBorder>
        <Editor
          initialValue={value}
          placeholder="사진을 올려주시고, 제품의 사용기간, 상태를 작성해주세요."
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
          hooks={{
            addImageBlobHook: async (blob) => {
              const compressedFile = await getCompressedFile(blob);
              let formData = new FormData();
              formData.append('image', compressedFile);
              setImageFile && setImageFile(formData);
              setImageUrl && setImageUrl(URL.createObjectURL(blob)); //미리보기
              // props.sendImage(formData, 28);
              // callback(`http://3.35.90.143:54130/rentPost/image/get?imageId=28`, 'alt text');

              // 1. 첨부된 이미지 파일을 서버로 전송후, 이미지 경로 url을 받아온다.
              // const imgUrl = await .... 서버 전송 / 경로 수신 코드 ...

              // 2. 첨부된 이미지를 화면에 표시(경로는 임의로 넣었다.)
              // callback('http://localhost:5000/img/카레유.png', '카레유');
            },
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
  width: 950px;
  outline: rgba(0, 0, 0, 0) solid 4px;
  border: 1px solid rgba(0, 0, 0, 0);
  svg {
    position: absolute;
    top: 230px;
    right: 10px;
    color: hsl(358, 68%, 59%);
    font-size: 20px;
  }
  @media screen and (max-width: 500px) {
    width: 340px;
  }
`;

const ErrorMsg = styled.p`
  margin-top: 10px;
  color: hsl(358, 62%, 52%);
  font-size: 12px;
`;

const Image = styled.img`
  /* width: 100px; */
  /* height: 100px; */
  /* display: flex; */
  /* justify-content: space-between; */
`;
export default CustomEditor;
