import { ReactComponent as Camera } from '../../asessts/img/camera.svg';
import { ChangeEvent } from 'react';
import { sendImage, sendPost } from '../../Utils';
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
import { faCamera, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
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
        <Button text="취소" type="white" width="short" onClick={() => navigate(-1)} />
        <Button text="완료" width="short" onClick={clickHandler} />
      </Top>
      <Middle>
        <WriteWrapper>
          <span>제목</span>
          <TextInput
            placeholder={'제목을 입력해주세요'}
            onChange={onChangePost}
            type={'text'}
            value={post.rentPostName}
            name={'rentPostName'}
          />
          <span>지역</span>
          <DropMenu props={location} onChange={handleLocationChange} state={selectedLocation} />
          <span>카테고리</span>
          <DropMenu props={copyCategory} onChange={handleCategoryChange} state={selectedCategory} />
          <span>가격</span>
          <TextInput
            placeholder={'가격을 입력해주세요'}
            onChange={onChangePost}
            type={'text'}
            value={post.rentPrice}
            name={'rentPrice'}
          />
          {imageUrl ? (
            <ImgWrapper>
              <FontAwesomeIcon onClick={deleteImage} icon={faCircleXmark} className="icon" />
              <img src={imageUrl} />
            </ImgWrapper>
          ) : (
            <>
              <CameraSVG />
            </>
          )}
        </WriteWrapper>
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
  width: 550px;
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 10%;
    width: 80px;
    height: 35px;
    font-size: 14px;
    white-space: nowrap;
    margin-left: 3px;
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

  .title {
    font-weight: 500;
  }
  input {
    width: 550px;
    border-radius: 5px;
    height: 35px;
    background-color: white;
    border-bottom: 1px solid #ececec;
  }
  span {
    padding-top: 5px;
    padding-left: 10px;
    padding-bottom: 5px;
    font-size: 15px;
    font-weight: 500;
  }
  @media screen and (max-width: 500px) {
    margin: 0px;
    input {
      width: 330px;
    }
    span {
      width: 100%;
      text-align: left;
    }
  }
`;
export const CameraSVG = styled(Camera)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ImgWrapper = styled.div`
  margin-bottom: 10px;

  display: flex;
  flex-direction: column;
  img {
    width: 100px;
    height: 100px;
    border-radius: 3px;
  }
  .icon {
    position: relative;
    left: 48px;
    top: 15px;
    font-size: 20px;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    align-items: flex-start;
    padding-bottom: 0px;
    .icon {
      position: relative;
      left: 86px;
      top: 14px;
      font-size: 20px;
    }
  }
`;
export const Bottom = styled.div``;

export default PostWrite;
