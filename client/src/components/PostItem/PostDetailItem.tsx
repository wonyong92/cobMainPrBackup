import styled from 'styled-components';
import Button from '../../UI/button/Button';

interface Props{
  category: string,
  rentPostContents: string,
  rentPostId: number,
  rentPostName: string,
  updateDate: string,
  viewCount: number,
  writeDate: string,
  writerId: number,
  rentStatus: string,
  price: string,
}

const PostDetailItem = ({}:Props) => {
  const imgUrl: string = 'https://media.gettyimages.com/photos/equipment-and-accessories-for-mountain-hiking-in-the-wilderness-picture-id994672418?k=20&m=994672418&s=612x612&w=0&h=FVlwbAL_wHNxLLWQ07v0uG3cavvpaNbWhBJvrD2Vw90=';
  
  return (
    <>
        <ListWrapper>
        <Image src={imgUrl} />
        <DescriptionWrapper>
          <Title>50년된 자전거</Title>
          <Region>서울  조회</Region>
          <Price>50000원</Price>
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