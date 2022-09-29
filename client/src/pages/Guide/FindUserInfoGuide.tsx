import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../UI/button/Button';
import PageDescript from '../../components/Descript/PageDescript';

const FindUserInfoGuide = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const foundInfo = location.state;
    return (
        <Container>
            <PageDescript
                title={foundInfo.loginId ? 'ID 찾기' : '비밀번호 찾기'}
                descript={
                    foundInfo.loginId
                        ? `아이디는 ${foundInfo.loginId} 입니다.`
                        : `비밀번호는 ${foundInfo.password} 입니다.`
                }
                isSuccess={true}
            />
            <Button text={'로그인'} type={'beige'} onClick={() => navigate('/login')} />
        </Container>
    );
};
export default FindUserInfoGuide;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
    @media screen and (max-width: 500px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
