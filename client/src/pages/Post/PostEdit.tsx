const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
import { Top, Middle, WriteWrapper, ImgWrapper, CameraSVG } from './PostWrite';
import { ChangeEvent } from 'react';
import { updatePost, sendImage } from '../../Utils';
import { config } from '../../config/config';
import Button from '../../UI/button/Button';
import CustomEditor from '../../components/Editor/CustomEditor';
import TextInput from '../../UI/input/TextInput';
import { useState, useContext } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { UserContext } from '../../context/context';
import { useLocation } from 'react-router-dom';
import DropMenu from '../../components/DropMenu/DropMenu';
import { category, location } from '../../constants';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useScroll from '../../hooks/useScroll';
import styled from 'styled-components';
const PostEdit = () => {
  const local = useLocation();
  const data = local.state.data;
  const editorRef = useRef<Editor>();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState<string>(
    `${PROXY}/rentPost/image/get?imageId=${data.rentPostImages[0]}`,
  );
  const [imageFile, setImageFile] = useState<FormData>();
  const copyCategory = category.slice(1);
  const [btn, setBtn] = useState(data.rentStatus ? '렌트중' : '렌트가능');
  const originLocation = data.location.slice(8);
  const originCategory = data.category.slice(8);
  const [selectedLocation, setSelectedLocation] = useState(originLocation);
  const handleLocationChange = (e: any) => {
    setSelectedLocation(e.target.value);
  };
  const [selectedCategory, setSelectedCategory] = useState(originCategory);
  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
  };
  const [post, setPost] = useState({
    rentPostName: data.rentPostName,
    rentPostContents: data.rentPostContents,
    rentPrice: data.rentPrice,
    category: data.category,
    location: data.location,
    writerId: user.memberId,
    rentPostImages: data.rentPostImages,
    rentPostId: data.rentPostId,
    rentStatus: data.rentStatus,
  });
  useScroll();
  const onChangePost = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const clickHandler = () => {
    post.category = selectedCategory;
    post.location = selectedLocation;
    if (!post.rentPostName || !post.category || !post.location || !post.rentPostContents || !post.rentPrice) {
      return;
    }
    if (imageFile) {
      sendImage(imageFile, post.rentPostId);
      updatePost({
        deleteImages: data.rentPostImages[0],
        rentPostId: post.rentPostId,
        location: post.location,
        category: post.category,
        rentPostContents: post.rentPostContents,
        rentPostName: post.rentPostName,
        rentPrice: Number(post.rentPrice),
        rentStatus: post.rentStatus,
      });
    } else {
      updatePost({
        deleteImages: 0,
        rentPostId: post.rentPostId,
        location: post.location,
        category: post.category,
        rentPostContents: post.rentPostContents,
        rentPostName: post.rentPostName,
        rentPrice: Number(post.rentPrice),
        rentStatus: post.rentStatus,
      });
    }
    navigate('/');
    window.location.reload();
  };

  const handleEditorChange = () => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      setPost({ ...post, rentPostContents: editorInstance.getMarkdown() });
    }
  };

  const changeBtnName = () => {
    if (!post.rentStatus) {
      setBtn('렌트중');
      setPost({ ...post, rentStatus: true });
    } else {
      setBtn('렌트가능');
      setPost({ ...post, rentStatus: false });
    }
  };
  const deleteImage = () => {
    setImageUrl('');
  };
  return (
    <>
      <Top>
        <Button text="수정완료" width="middle" onClick={clickHandler} />
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
          <span>렌트상태</span>
          <BtnWrapper onClick={changeBtnName}>
            <Button text={post.rentStatus ? '렌트중' : '렌트가능'} width="short" radius="deep" />
            <div>태그를 클릭하면 렌트상태를 바꿀수있어요 :)</div>
          </BtnWrapper>
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
      <CustomEditor
        editorRef={editorRef}
        value={post.rentPostContents}
        onChange={handleEditorChange}
        sendImage={sendImage}
        setImageFile={setImageFile}
        setImageUrl={setImageUrl}
      />
    </>
  );
};

export default PostEdit;
const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-left: 8px;
  }
  div {
    margin-left: 5px;
    font-size: 13px;
    color: #464646;
  }
`;
