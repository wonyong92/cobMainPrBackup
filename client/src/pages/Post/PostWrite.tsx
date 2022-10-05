import { ChangeEvent } from 'react';
import { getImage, sendImage, sendPost } from '../../Utils/ApiCall';
import styled from 'styled-components';
import Button from '../../UI/button/Button';
import CustomEditor from '../../components/Editor/CustomEditor';
import TextInput from '../../UI/input/TextInput';
import { useState, useContext } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { UserContext } from '../../context/context';
import DropMenu from '../../components/DropMenu/DropMenu';
import { category, location } from '../../constants';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface PostData {
  rentPostName: string;
  rentPostContents: string;
  rentPrice: number;
  category: string;
  location: string;
  writerId: number | undefined;
  rentPostId: number;
  formData: FormData;
}

const PostWrite = ({ formData }: any) => {
  const editorRef = useRef<Editor>();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<FormData>();
  const { user } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [post, setPost] = useState({
    rentPostName: '',
    rentPostContents: '',
    rentPrice: 0,
    category: '',
    location: '',
    writerId: user.memberId,
  });
  const onChangePost = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const clickHandler = async () => {
    if (!post.rentPostName || !post.category || !post.location || !post.rentPostContents || !post.rentPrice) {
      return;
    }
    post.category = selectedCategory;
    post.location = selectedLocation;
    try {
      const result = await sendPost({
        category: post.category,
        rentPostContents: post.rentPostContents,
        rentPostName: post.rentPostName,
        writerId: user.memberId,
        rentPrice: Number(post.rentPrice),
        location: post.location,
      });

      if (imageFile) {
        sendImage(imageFile, result.rentPostId);
      }
      navigate(`/postlist`);
    } catch {}
  };

  const handleEditorChange = () => {
    const editorInstance = editorRef.current?.getInstance();

    console.log(editorInstance?.getMarkdown());
    if (editorInstance) {
      setPost({ ...post, rentPostContents: editorInstance.getMarkdown() });
    }
  };
  const [selectedLocation, setSelectedLocation] = useState('');
  const handleLocationChange = (e: any) => {
    setSelectedLocation(e.target.value);
  };
  const [selectedCategory, setSelectedCategory] = useState('');
  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
  };
  const deleteImage = () => {
    setImageUrl('');
  };
  return (
    <>
      <Top>
        <TopLeft>
          <HeaderRow>
            <h4>빌려주기 작성가이드</h4>
            <Button text="글 작성완료" width="short" onClick={clickHandler} />
          </HeaderRow>
          <GuideWrapper>
            <li>1. 사진을 올려주세요</li>
            <li>2. 거래지역을 명시해주세요</li>
            <li>3. 제품의 사용기간, 상태를 작성해주세요</li>
            <li>4. 글 작성과 이미지 업로드시, 타인의 지식재산권을 침해하지 않도록 유의해주세요</li>
            <li>5. 사진 크기에 따른 업로드 제한</li>
          </GuideWrapper>
        </TopLeft>
      </Top>
      <Middle>
        <WriteWrapper>
          <h4>필수 정보 입력</h4>
          <span>글제목</span>
          <TextInput
            placeholder={'글제목을 입력해주세요'}
            onChange={onChangePost}
            type={'text'}
            value={post.rentPostName}
            name={'rentPostName'}
          />
          <span>지역</span>
          <DropMenu props={location} onChange={handleLocationChange} state={selectedLocation} />
          <span>카테고리</span>
          <DropMenu props={category} onChange={handleCategoryChange} state={selectedCategory} />
          <span>가격</span>
          <TextInput
            placeholder={'가격을 입력해주세요'}
            onChange={onChangePost}
            type={'text'}
            value={post.rentPrice}
            name={'rentPrice'}
          />
        </WriteWrapper>
        <ImgUploadeWrapper>
          {imageUrl ? (
            <ImgWrapper>
              <div>사진 미리보기</div>
              <img onClick={deleteImage} src={imageUrl} />
            </ImgWrapper>
          ) : (
            <IconWrapper>
              <FontAwesomeIcon icon={faCamera} className="icon" />
              <span>사진 미리보기</span>
            </IconWrapper>
          )}
        </ImgUploadeWrapper>
      </Middle>
      <Bottom>
        <CustomEditor
          editorRef={editorRef}
          value={post.rentPostContents}
          onChange={handleEditorChange}
          sendImage={sendImage}
          setImageFile={setImageFile}
          setImageUrl={setImageUrl}
        />
      </Bottom>
    </>
  );
};
export const Top = styled.div`
  display: flex;
  align-items: center;
  button {
    border-radius: 10%;
    width: 100px;
    height: 40px;
    font-size: 14px;
    box-shadow: 5px 5px black;
    transition: 0.3s;
    white-space: nowrap;
  }
  @media screen and (max-width: 500px) {
    font-size: 16px;
    button {
      width: 80px;
      height: 35px;
      font-size: 12px;
      box-shadow: 3px 3px black;
    }
  }
`;
export const TopLeft = styled.div``;
export const HeaderRow = styled.h4`
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  margin-top: 5px;
  margin-left: 20px;
`;

export const GuideWrapper = styled.ul`
  list-style: none;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
`;
export const Middle = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;
export const WriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 10px;
  margin-top: 20px;
  input {
    width: 550px;
    border-radius: 5px;
  }
  .button {
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 500px) {
    margin: 0px;
    padding-top: 10px;
    align-items: center;
    input {
      width: 330px;
    }
    h4,
    span {
      width: 100%;
      text-align: left;
    }
  }
`;
export const ImgUploadeWrapper = styled.div`
  border: none;
  margin-top: 10px;
  display: flex;
  align-items: center;

  img {
    width: 200px;
    height: 200px;
    border-radius: 3px;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    align-items: flex-start;
    width: 370px;
    img {
      width: 160px;
      height: 160px;
    }
  }
`;
export const ImgWrapper = styled.div`
  div {
    font-weight: 600;
    padding-bottom: 5px;
  }
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
`;
export const Bottom = styled.div`
  display: flex;
`;
export const IconWrapper = styled.div`
  padding: 100px;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    padding: 100px;
  }
`;
export default PostWrite;
