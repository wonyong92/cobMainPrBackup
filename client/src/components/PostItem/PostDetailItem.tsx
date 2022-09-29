import styled from 'styled-components';
import Button from '../../UI/button/Button';


export interface PostItemDetailData {
  
    catergory: string;
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
  
}
export interface PostItemDetailProps {
  data:PostItemDetailData;
  
}

const PostDetailItem = ({data}:PostItemDetailProps) => {
  const imgUrl: string = `http://3.39.180.45:56178/rentPost/image/get?imageId=${data.rentPostId}`;
  
  return (
    <>
        <ListWrapper>
        <Image src={imgUrl} />
        <DescriptionWrapper>
          <Title>{data.rentPostName}</Title>
          <Content>{data.rentPostContents}</Content>
          <Region>{data.location}  조회:{data.viewCount}</Region>
          <Price>{data.rentPrice}원</Price>    
          <Button text='렌트가능' radius='deep' width='short'/>
        </DescriptionWrapper>
      </ListWrapper>
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