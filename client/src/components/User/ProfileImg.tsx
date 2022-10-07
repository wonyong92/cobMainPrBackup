import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/context';
import { Container, ImgWrapper } from './profileImg-style';
import Button from '../../UI/button/Button';
import imageCompression from 'browser-image-compression';
import { changeProfileImage } from '../../Utils';
import { config } from '../../config/config';
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
const ProfileImg = () => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem('token');
  const imgInput = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    setImageUrl(`${PROXY}/member/profileImage/get?memberId=${user.memberId}`);
  }, [user]);

  const handleChangeBtnClick = (e: any) => {
    e.preventDefault();
    imgInput.current?.click();
  };
  const compressImg = async (e: any) => {
    e.preventDefault();
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    const imgFile = e.target.files[0];
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 170,
    };
    return await imageCompression(imgFile, options);
  };
  const handleImgChange = async (e: any) => {
    const compressedFile = await compressImg(e);
    const formData = new FormData();
    formData.append('file', compressedFile);
    if (token) {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      };
      const res = await changeProfileImage(formData, config);
      try {
        if (res === 200) {
          alert('이미지 변경에 성공했습니다 :) ');
        }
      } catch {
        alert('이미지 변경에 실패했습니다. 다시 시도해주세요 ㅜ_ㅜ');
      }
    }
  };
  return (
    <Container>
      <div className="title">프로필이미지</div>
      <ImgWrapper>
        <img alt="practice" src={imageUrl} />
        <input
          type="file"
          ref={imgInput}
          accept="image/*"
          onChange={(e) => handleImgChange(e)}
          style={{ display: 'none' }}
        />
        <Button onClick={(e) => handleChangeBtnClick(e)} type={'white'} width={'short'} text={'변경'} />
      </ImgWrapper>
    </Container>
  );
};
export default ProfileImg;
