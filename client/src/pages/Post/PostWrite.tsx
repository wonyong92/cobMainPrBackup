import { ChangeEvent } from 'react';
import { sendImage, sendPost } from '../../Utils/ApiCall';
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
import useScroll from '../../hooks/useScroll';
export interface PostData {
  rentPostName: string;
  rentPostContents: string;
  rentPrice: number | undefined;
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
  const copyCategory = category.slice(1);
  const [post, setPost] = useState({
    rentPostName: '',
    rentPostContents: '',
    rentPrice: undefined,
    category: '',
    location: '',
    writerId: user.memberId,
  });
  useScroll();
  const onChangePost = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const clickHandler = async () => {
    post.category = selectedCategory;
    post.location = selectedLocation;
    if (!post.rentPostName || !post.category || !post.location || !post.rentPostContents || !post.rentPrice) {
      return;
    }
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
      navigate(`/`);
    } catch {}
  };

  const handleEditorChange = () => {
    const editorInstance = editorRef.current?.getInstance();
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
          {/* <HeaderRow> */}
          {/* <div>빌려주기 작성가이드</div> */}
          <Button text="완료" width="short" onClick={clickHandler} />
          {/* </HeaderRow> */}
          {/* <GuideWrapper>
            <li>1. 사진을 올려주세요</li>
            <li>2. 거래지역을 명시해주세요</li>
            <li>3. 제품의 사용기간, 상태를 작성해주세요</li>
            <li>4. 글 작성과 이미지 업로드시, 타인의 지식재산권을 침해하지 않도록 유의해주세요</li>
            <li>5. 사진 크기에 따른 업로드 제한</li>
          </GuideWrapper> */}
        </TopLeft>
      </Top>
      <Middle>
        <WriteWrapper>
          {/* <div className="title">필수 정보 입력</div> */}
          {/* <span>글제목</span> */}
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
          <DropMenu props={copyCategory} onChange={handleCategoryChange} state={selectedCategory} />
          {/* <span>가격</span> */}
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
              {/* <div>사진 미리보기</div> */}
              <img onClick={deleteImage} src={imageUrl} />
            </ImgWrapper>
          ) : (
            <IconWrapper>
              <FontAwesomeIcon icon={faCamera} className="icon" />
              <span>사진</span>
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
  width: 950px;
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 10%;
    width: 100px;
    height: 40px;
    font-size: 14px;
    white-space: nowrap;
  }
  @media screen and (max-width: 500px) {
    width: 90%;
    font-size: 16px;
    button {
      width: 60px;
      height: 35px;
      font-size: 13px;
    }
  }
`;
export const TopLeft = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const HeaderRow = styled.h4`
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  /* margin-top: 5px; */
  margin-left: 20px;
`;

export const GuideWrapper = styled.ul`
  list-style: none;
  padding-left: 20px;
  padding-right: 20px;
  /* padding-bottom: 10px; */
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
  align-items: flex-start;
  margin-bottom: 15px;
  .title {
    font-weight: 600;
  }
  input {
    width: 550px;
    border-radius: 5px;
    height: 50px;
    background-color: white;
    border-bottom: 1px solid #ececec;
  }
  button {
    margin-top: 10px;
  }
  span {
    padding-top: 5px;
    padding-left: 10px;
    font-size: 14px;
  }
  @media screen and (max-width: 500px) {
    margin: 0px;

    input {
      width: 330px;
      height: 50px;
    }
    span {
      width: 100%;
      text-align: left;
    }
  }
`;
export const ImgUploadeWrapper = styled.div`
  border: none;
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  img {
    width: 120px;
    height: 110px;
    border-radius: 3px;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    align-items: flex-start;
    width: 370px;
    img {
      width: 80px;
      height: 80px;
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
  border: 1px solid #ececec;
  padding: 44px 37px;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 25%;
    padding: 26px 16px;
    margin-left: 10px;
    margin-top: 5px;
    align-items: center;
    span {
      white-space: nowrap;
      padding-left: 5px;
    }
  }
`;
export default PostWrite;
