import styled from 'styled-components';
import { ReactComponent as ArrowRight } from '../../asessts/img/arrowRight.svg';
import { ReactComponent as ArrowLeft } from '../../asessts/img/arrowLeft.svg';
interface Props {
  page: number;
  totalPage: number;
  decreasePage: () => void;
  increasePage: () => void;
}
const PageNation = ({ page, totalPage, decreasePage, increasePage }: Props) => {
  return (
    <Container>
      <Wrapper>
        {page} / {totalPage} 페이지
        <ArrowLeftSVG onClick={decreasePage} />
        <ArrowRightSVG onClick={increasePage} />
      </Wrapper>
    </Container>
  );
};
export default PageNation;
const Container = styled.div`
  border-top: 1px blue solid;
  border-bottom: 1px blue solid;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 110px;
  height: 20px;
  display: flex;
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
