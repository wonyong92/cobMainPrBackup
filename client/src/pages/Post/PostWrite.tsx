
import { ChangeEvent, MouseEvent } from 'react';
import { sendPost } from '../../Utils/ApiCall';
import styled from 'styled-components';
import Button from '../../UI/button/Button';
import CustomEditor from '../../components/Editor/CustomEditor';
import TextInput from '../../UI/input/TextInput';
import { useState } from 'react';



const PostWrite = () => {
  interface Post {
    title: string;
    content: string;
    price: string;
    category: string;
    location: string;
    userId: string;
    userName: string;
    userImg: string
    }
  const [post,setPost] = useState<Post>({
    title: '',
    content: '',
    price: '',
    category: '',
    location: '',
    userId: '',
    userName: '',
    userImg: '',
  })
  const onChangePost = (e: ChangeEvent<HTMLInputElement>) => {
  const {name, value}= e.target;
  setPost({...post,[name]:value,})
  };

  
  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendPost({
      title: post.title,
      content: post.content,
      price: post.price,
      category: post.category,
      location: post.location,
    })
      
    }
    
    
  
    return (
        <>
            <h4>빌려주기 작성가이드</h4>
            <Button text={'글저장'} onClick={(e: MouseEvent<HTMLButtonElement>)=> clickHandler(e)} />
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
            value={post.title} name={'title'} />
            <span>지역</span>
            <TextInput 
            placeholder={'지역을 입력해주세요'}
            onChange={onChangePost}
            type={'text'}
            value={post.location} name={'location'}/>
            
            <span>카테고리</span>
            <TextInput 
            placeholder={'카테고리를 입력해주세요'}
            onChange={onChangePost}
            type={'text'}
            value={post.category} 
            name={'catergory'} />
            
            <span>가격</span>
            <TextInput 
            placeholder={'가격을 입력해주세요'}
            onChange={onChangePost}
            type={'text'}
            value={post.price} 
            name={'price'} />
            </WriteWrapper>
            
            <h4>{post.content}</h4>
            <CustomEditor value={''} isError={false}  onChange={()=>onChangePost} />
        
        </>
     
    )
}

const GuideWrapper = styled.ul`
  list-style:none;
  padding-left:10px;
  padding-bottom:10px;
`;

const WriteWrapper = styled.div`
display: flex;
flex-direction:column;
`;

export default PostWrite;
