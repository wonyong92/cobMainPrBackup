import styled from 'styled-components';
import Button from '../../UI/button/Button';
import TextButton from '../../UI/button/TextButton';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import DeleteModal from '../Modal/DeleteModal';
import { UserContext } from '../../context/context';


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

interface IPostItemDetailProps{
  data:{ 
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
}

const PostDetailItem = ({data}:IPostItemDetailProps) => {
  const imgUrl: string = `http://3.39.180.45:56178/rentPost/image/get?imageId=1`;
  const {user}  =useContext(UserContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate =useNavigate();

  const editHandler = () => {
    console.log(data.rentPostId)
    navigate(`/postedit/${data.rentPostId}`)
  }

  
  return (
    <>
        <ListWrapper>
        <Image src={imgUrl} />
        <DescriptionWrapper>
          <Link to={`/postdetail/${data.rentPostId}`}>{data.rentPostName}</Link>
          <Content>{data.rentPostContents}</Content>
          <Region>{data.location}  조회:{data.viewCount}</Region>
          <Price>{data.rentPrice}원</Price>   
          <ButtonWrapper> 
          <Button text='렌트가능' radius='deep' width='short'/>
          
          {user.memberId===data.writerId ? 
          <TextButtonWrapper>
          <Link className='editbutton' to={`/postedit/${data.rentPostId}`} state= {data} >수정</Link>
          <TextButton text='삭제' isGray={true} btnText={'삭제'} onClick={() =>{
            console.log('삭제버튼 클릭')
            setDeleteModal(true)}}/>
          </TextButtonWrapper>
          : null}
           
          </ButtonWrapper>
        </DescriptionWrapper>
      </ListWrapper>
      {deleteModal ? (
          <DeleteModal
            setDeleteModal={setDeleteModal}
            data={data}
          />
        ) : null}
    </>
  );
};

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media (min-width: 500px) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    
    }
`;

const Content = styled.div`
    font-size: 13px;
    color: #868e96;
    margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

const TextButtonWrapper = styled.div`
    display: flex;
    justify-content: reverse-row;
    margin-top: 10px;
.editbutton {
    text-decoration: none;
  }
`;




const ListWrapper = styled.div`
    width: 100%;
    height: 370px;
    object-fit: cover;
    margin:0;
    padding:0 ;
    margin-bottom: 20px;
    display: flex;
    flex-direction:column;
    border-bottom: 1px solid #dee2e6;
   
    @media (min-width: 500px) {
    width: 100%;
    height: 100%;
    margin:0;
    padding:0;
    object-fit: cover;
   
    }

`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
`;



const Title = styled.h2`
  padding-top: 10px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 4px;
  margin-left:7px;
`;

const Price = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 4px;
  margin-left:7px;
 
`;

const Region = styled.div`
  display:flex;
  flex-direction:row-reverse;
  font-size: 13px;
  color: #868e96;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
  line-height: 1.5;
  padding-left:300px;
  padding-right:10px;
`;

export default PostDetailItem;