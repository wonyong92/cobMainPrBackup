import styled from 'styled-components';
import { ReactComponent as ArrowRight } from '../../asessts/img/arrowRight.svg';
import { ReactComponent as ArrowLeft } from '../../asessts/img/arrowLeft.svg';

interface Props {
  page: number;
  totalPages: number;
  decreasePage: () => void;
  increasePage: () => void;
}
const PageNation = ({ page, totalPages, decreasePage, increasePage }: Props) => {
  // const totalPage = Math.ceil(totalPost / 10);
  return (
    <Container>
      <Wrapper>
        {page + 1} / {totalPages === 0 ? 1 : totalPages} 페이지
        {page + 1 > 1 ? <ArrowLeftSVG onClick={decreasePage} /> : <ArrowLeftSVG />}
        {page + 1 >= totalPages ? <ArrowRightSVG /> : <ArrowRightSVG onClick={increasePage} />}
      </Wrapper>
    </Container>
  );
};
export default PageNation;
const Container = styled.div`
  border-top: 1px #e8e5e5 solid;
  border-bottom: 1px #e8e5e5 solid;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  width: 80%;
  justify-content: flex-end;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 110px;
  height: 20px;
  display: flex;
  padding-bottom: 5px;
  align-items: center;
  justify-content: space-between;
  color: #727272;
  font-size: 12px;
`;

const ArrowRightSVG = styled(ArrowRight)`
  cursor: pointer;
`;
const ArrowLeftSVG = styled(ArrowLeft)`
  cursor: pointer;
`;
