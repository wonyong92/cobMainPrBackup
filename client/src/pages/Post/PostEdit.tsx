import { ChangeEvent} from 'react';
import { updatePost } from '../../Utils/ApiCall';
import styled from 'styled-components';
import Button from '../../UI/button/Button';
import CustomEditor from '../../components/Editor/CustomEditor';
import TextInput from '../../UI/input/TextInput';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';

  export interface PostData {
   
    rentPostName: string;
    rentPostContents: string;
    rentPrice: number;
    category: string;
    location: string;
    writerId: number;
  
    }
  
  
    const PostEdit = () => {
    const editorRef = useRef<Editor>(null);
    
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state.detail;
    console.log(data)

    const [post,setPost] = useState<PostData>({
        category: data.category,
        rentPostContents: data.rentPostContents,
        rentPostName: data.rentPostName,
        writerId: data.writerId,
        rentPrice: data.rentPrice,
        location: data.location,
    })

    const onChangePost = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value}= e.target;
    setPost({...post,[name]:value,})
    };
  
    
    const clickHandler = () => {
      updatePost({
        category: post.category,
        rentPostContents: post.rentPostContents,
        rentPostName: post.rentPostName,
        writerId: post.writerId,
        rentPrice: post.rentPrice,
        location: post.location,
      })
        
      .then((res) => {
        console.log(res);
        navigate(`/postdetail/${res.rentPostId}`);
        
      }
      );
    }

    const handleEditorChange = () => {
      const editorInstance = editorRef.current?.getInstance();
      const markdown = editorInstance?.getMarkdown();
      const html:any = editorInstance?.getHTML();
      console.log(markdown);
      console.log(html);
      setPost({...post,rentPostContents:html,})
  
    }
      
    
      return (
          <>
              <HeaderRow>빌려주기 작성가이드
              <Button text={'글저장'} width='middle' onClick={clickHandler} />
              </HeaderRow>
              <GuideWrapper>
                <li>사진을 올려주세요</li>
                <li>거래지역을 명시해주세요</li>
                <li>제품의 사용기간, 상태를 작성해주세요</li>
                <li>글 작성과 이미지 업로드시, 타인의 지식재산권을 침해하지 않더록 유의해주세요</li>
                <li>사진 크기에 따른 업로드 제한</li>
              </GuideWrapper>
              
              <WriteWrapper>
              <h4>필수 정보 입력</h4>
              <span>글제목</span>
              <TextInput 
              placeholder={'글제목을 입력해주세요'}
              onChange={onChangePost}
              type={'text'}
              value={data.rentPostName} 
              name={'rentPostName'} />
              
              <span>지역</span>
              <TextInput 
              placeholder={'지역을 입력해주세요'}
              onChange={onChangePost}
              type={'text'}
              value={data.location} 
              name={'location'}/>
              
              <span>카테고리</span>
              <TextInput 
              placeholder={'카테고리를 입력해주세요'}
              onChange={onChangePost}
              type={'text'}
              value={data.category} 
              name={'category'} />
              
              <span>가격</span>
              <TextInput 
              placeholder={'가격을 입력해주세요'}
              onChange={onChangePost}
              type={'text'}
              value={data.rentPrice} 
              name={'rentPrice'} />

              <span>렌트상태</span>
              <Button text={'렌트중'} />
              </WriteWrapper>
              <CustomEditor value={data.rentPostContents} onChange={handleEditorChange}/>
              <Button text='이미지업로드'  onClick={()=>{}}/>
          </>
       
      )
  }
  
  const HeaderRow = styled.h4`
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    margin-top: 20px;
    margin-left:20px;
    `;
  
  const GuideWrapper = styled.ul`
    list-style:none;
    padding-left:20px;
    padding-bottom:20px;
    border-bottom: 1px solid #e5e5e5;
  `;
  
  const WriteWrapper = styled.div`
  display: flex;
  flex-direction:column;
  margin-left: 20px;
  margin-bottom: 10px;
  margin-top: 20px;
  
  .button {
    display: flex;
    justify-content: center;
  }
  `;
  
export default PostEdit;