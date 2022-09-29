import styled from 'styled-components';

export interface PostItemData {
  
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
export interface PostItemProps {
  data:PostItemData;
  
}

const PostItem = ({data}:PostItemProps) => {
  const imgUrl= `http://3.35.90.143:54130/rentPost/image/get?imageId=${data.rentPostId}`;
  
  return (
    <>
      
      <ListWrapper>
        <Image src={imgUrl} />
        <DescriptionWrapper>
          <Title>{data.rentPostName}</Title>
          <Region>{data.location}</Region>
          <Price>{data.rentPrice}</Price>
          <div style={{ color: '#868e96', fontSize: '13px' }}>
            <span>❤️</span> <span>조회:{data.viewCount}</span>
          </div>
        </DescriptionWrapper>
      </ListWrapper>
    </>
  );
};

// PostItem.defaultProps = {
//   id: '1',
//   title: '자전거',
//   imgs: 'https://media.gettyimages.com/photos/fixedgear-road-bike-picture-id594837789?k=20&m=594837789&s=612x612&w=0&h=-NM56HgV7IKV6RNRXKbdwD_U6tnyvos-P5hKvNk8QqU=',
//   price: '10,000원',
//   region: '서울',
//   like: '3',
//   view: '5',
// };



const ListWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #dee2e6;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
//
  width: 100px;
  height: 100px;
  /* background-image: url('https://pbs.twimg.com/profile_images/449975524350103554/zBK8lr4 */
  background-size: 100px 100px;
  border-radius: 12px;
  border: 0px solid transparent;
`;

const Title = styled.h2`
  font-size: 16px;
  letter-spacing: -0.02px;
  color: #212529;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
  line-height: 1.5;
  font-weight: normal;
  margin: 5px auto;
`;

const Price = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 4px;
`;

const Region = styled.div`
  font-size: 13px;
  color: #212529;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
  line-height: 1.5;
`;

export default PostItem;