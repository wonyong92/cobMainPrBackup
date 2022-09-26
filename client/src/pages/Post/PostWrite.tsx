
import { ChangeEvent, MouseEvent } from 'react';
import { sendPost } from '../../Utils/ApiCall';
import styled from 'styled-components';
import Button from '../../UI/button/Button';
import CustomEditor from '../../components/Editor/CustomEditor';
import TextInput from '../../UI/input/TextInput';
import { useState } from 'react';


const PostWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const onChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const onChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  
  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendPost({
      title ,
      content,
      price,
      category,
      location,
    });
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
            onChange={onChangeTitle} 
            type={'text'} 
            value={title} />
            <span>지역</span>
            <TextInput 
            placeholder={'지역을 입력해주세요'} 
            onChange={onChangeLocation} 
            type={'text'} 
            value={location}/>
            
            <span>카테고리</span>
            <TextInput 
            placeholder={'카테고리를 입력해주세요'} 
            onChange={onChangeCategory} 
            type={'text'} 
            value={category}  />
            
            <span>가격</span>
            <TextInput 
            placeholder={'가격을 입력해주세요'} 
            onChange={onChangePrice} 
            type={'text'} 
            value={price} />
            </WriteWrapper>
            
            <h4>{content}</h4>
            <CustomEditor value={''} isError={false}  onChange={()=>onChangeContent} />
        
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
