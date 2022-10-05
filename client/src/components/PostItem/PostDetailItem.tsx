import styled from 'styled-components';
import Button from '../../UI/button/Button';
import TextButton from '../../UI/button/TextButton';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import DeleteModal from '../Modal/DeleteModal';
import { UserContext } from '../../context/context';
// import { ImgWrapper } from './ListItem';
import { config } from '../../config/config';
export interface PostItemDetailData {
  category: string;
  image: string;
  location: string;
  rentPostContents: string;
  rentPostId: number;
  rentPostName: string;
  rentPrice: number;
  rentStatus: boolean;
  updateDate: string;
  viewCount: number;
  writeDate: string;
  writerId: number;
  deleteModal: boolean;
  commentId: number;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IPostItemDetailProps {
  data: {
    category: string;
    image: string;
    location: string;
    rentPostContents: string;
    rentPostId: number;
    rentPostName: string;
    rentPrice: number;
    rentStatus: boolean;
    updateDate: string;
    viewCount: number;
    writeDate: string;
    writerId: number;
    deleteModal: boolean;
    commentId: number;
    setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const PostDetailItem = ({ data }: IPostItemDetailProps) => {
  // const imgUrl: string = `http://3.35.90.143:54130/rentPost/image/get?imageId=${data.rentPostId}`;
  const imgUrl: string = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQBF20H_iscXjbpbSQTRpnQukKDuYfT3Y7dQ&usqp=CAU`;
  const { user } = useContext(UserContext);
  const wirterImageUrl = `${config.apiUrl}member/profileImage/get?memberId=${data.writerId}`;
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const price = data.rentPrice?.toLocaleString();
  const location = data.location?.slice(8);
  const category = data.category?.slice(8);
  // const createdAt = new Date(String(data.updateDate)).toLocaleDateString().slice(0, 11);

  const editHandler = () => {
    // console.log(data.rentPostId);
    navigate(`/postedit/${data.rentPostId}`);
  };
  return (
    <>
      <ListWrapper>
        <ImgWrapper>
          <GoodsImage src={imgUrl} />
        </ImgWrapper>
        <DescriptionWrapper>
          <Title>{data.rentPostName}</Title>
          <InfoWrapper>
            <span>{category}</span>
            <PostInfo>
              <span>{location}</span>
              <span>조회{data.viewCount}</span>
              {/* <span>{createdAt}</span> */}
            </PostInfo>
          </InfoWrapper>
          <Price>{price}원</Price>
          <FourthRow>
            <Button text={data.rentStatus === false ? '렌트가능' : '렌트중'} radius="deep" width="short" />
            <WriterInfo>
              <ImgWrapper>
                <img src={wirterImageUrl} className="writerImage" />
              </ImgWrapper>
              <div className="nickname">글쓴이닉네임</div>
            </WriterInfo>
          </FourthRow>
          <ButtonWrapper>
            <TextButtonWrapper>
              {user.memberId === data.writerId ? (
                <>
                  <TextButton isGray={true} btnText={'수정'} onClick={editHandler} />
                  <TextButton isGray={true} btnText={'삭제'} onClick={() => setDeleteModal(true)} />
                </>
              ) : (
                <Button text="채팅하기" type="beige" width="short" />
              )}
            </TextButtonWrapper>
          </ButtonWrapper>
          <ContentWrapper>
            <Content>{data.rentPostContents}</Content>
          </ContentWrapper>
        </DescriptionWrapper>
      </ListWrapper>
      {deleteModal ? <DeleteModal setDeleteModal={setDeleteModal} data={data} /> : null}
    </>
  );
};
const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const GoodsImage = styled.img`
  width: 300px;
  height: 300px;
`;
const ContentWrapper = styled.div`
  padding: 10px;
  margin-bottom: 10px;
`;
const Content = styled.div`
  font-size: 15px;
  color: #464646;
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
`;
const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  .writerImage {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
  .nickname {
    font-size: 14px;
  }
`;
const PostInfo = styled.div`
  display: flex;
  color: #727272;
  span {
    margin-right: 3px;
    font-size: 14px;
  }
`;
const FourthRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px 10px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  button {
    margin-left: 5px;
    font-size: 14px;
  }
`;

const TextButtonWrapper = styled.div`
  display: flex;
  justify-content: reverse-row;
  margin-top: 5px;
  .editbutton {
    text-decoration: none;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  object-fit: cover;
  @media screen and (max-width: 500px) {
    width: 100%;
    object-fit: cover;
    margin: 0;
    padding: 0;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.div`
  padding: 10px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;

  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  padding: 0 10px;
`;

const Region = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-size: 13px;
  color: #868e96;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
  line-height: 1.5;
  padding-left: 300px;
  padding-right: 10px;
`;

export default PostDetailItem;
