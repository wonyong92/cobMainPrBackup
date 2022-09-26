import styled from 'styled-components';

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
}

const PostItem = ({}:Props) => {
  const imgUrl: string = 'https://images.unsplash.com/photo-1616161616161-1b1b1b1b1b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
  return (
    <>
      <HeadRow>
        <h2>인기리스트</h2>
      </HeadRow>
      <ListWrapper>
        <Image src={imgUrl} />
        <DescriptionWrapper>
          <Title>50년된 자전거</Title>
          <Region>서울</Region>
          <Price>50000원</Price>
          <div style={{ color: '#868e96', fontSize: '13px' }}>
            <span>❤️</span> <span>조회</span>
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

export default PostItem;

const HeadRow = styled.div``;

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
  background-image: url('https://pbs.twimg.com/profile_images/449975524350103554/zBK8lr4U.jpeg');
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
