import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../UI/button/Button';
import PageDescript from '../Descript/PageDescript';
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <PageDescript
        title={'원하시는 페이지를 찾을 수없습니다.'}
        descript={
          '찾으려는 페이지의 주소가 잘못 입력되었거나, 주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다. 입력한 페이지의 주소가 정확한지 확인해주세요.'
        }
      />
      <Button
        text={'빌리지뭐 홈 가기'}
        type={'beige'}
        width={'middle'}
        radius={'deep'}
        onClick={() => navigate('/')}
      />
    </Container>
  );
};
export default NotFound;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  button {
    margin-top: 50px;
  }
  @media screen and (max-width: 500px) {
    height: 25%;
    justify-content: space-around;
    margin-bottom: 70px;
    button {
      margin-top: 0px;
    }
  }
`;
