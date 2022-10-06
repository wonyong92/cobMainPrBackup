// page-postEdit
import {
  Top,
  TopLeft,
  Middle,
  HeaderRow,
  GuideWrapper,
  WriteWrapper,
  ImgUploadeWrapper,
  ImgWrapper,
  IconWrapper,
} from './PostWrite';
import { ChangeEvent } from 'react';
import { updatePost, sendImage } from '../../Utils/ApiCall';
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
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostEdit = () => {
  const local = useLocation();
  const data = local.state.data;
  const editorRef = useRef<Editor>();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState<string>(
    `${config.apiUrl}rentPost/image/get?imageId=${data.rentPostImages[0]}`,
  );
  const [imageFile, setImageFile] = useState<FormData>();
  const copyCategory = category.slice(1);
  const [btn, setBtn] = useState(data.rentStatus ? '렌트중' : '렌트가능');
  const [selectedLocation, setSelectedLocation] = useState('');
  const handleLocationChange = (e: any) => {
    setSelectedLocation(e.target.value);
  };
  const [selectedCategory, setSelectedCategory] = useState('');
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
    rentPostImages: data.rentPostImages[0],
    rentPostId: data.rentPostId,
    rentStatus: data.rentStatus,
  });

  const onChangePost = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const clickHandler = () => {
    post.category = selectedCategory;
    post.location = selectedLocation;
    // if (!post.rentPostName || !post.category || !post.location || !post.rentPostContents || !post.rentPrice) {
    //   return;
    // }
    console.log(post.rentStatus);
    updatePost({
      deleteImages: [],
      rentPostId: post.rentPostId,
      location: post.location,
      category: post.category,
      rentPostContents: post.rentPostContents,
      rentPostName: post.rentPostName,
      rentPrice: Number(post.rentPrice),
      rentStatus: post.rentStatus,
    });
    if (imageFile) {
      sendImage(imageFile, post.rentPostId);
    }
    navigate(`/postdetail/${post.rentPostId}`);
    window.location.reload();
  };

  const handleEditorChange = () => {
    const editorInstance = editorRef.current?.getInstance();

    console.log(editorInstance?.getMarkdown());
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
        <TopLeft>
          <HeaderRow>
            <div>빌려주기 작성가이드</div>
            <Button text="수정완료" width="middle" onClick={clickHandler} />
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
          <div>필수 정보 입력</div>
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
          <div onClick={changeBtnName}>
            <Button text={post.rentStatus ? '렌트중' : '렌트가능'} width="short" radius="deep" />
          </div>
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

// const HeaderRow = styled.h4`
//   display: flex;
//   justify-content: space-between;
//   margin-right: 20px;
//   margin-top: 20px;
//   margin-left: 20px;
// `;

// const GuideWrapper = styled.ul`
//   list-style: none;
//   padding-left: 20px;
//   padding-bottom: 20px;
//   border-bottom: 1px solid #e5e5e5;
// `;

// const WriteWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-left: 20px;
//   margin-bottom: 10px;
//   margin-top: 20px;
//   .button {
//     display: flex;
//     justify-content: center;
//   }
// `;

export default PostEdit;
