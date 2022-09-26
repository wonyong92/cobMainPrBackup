import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../UI/button/Button';
import PageDescript from '../../components/Descript/PageDescript';
const NewPwGuide = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <PageDescript
                title={'비밀번호 변경 완료'}
                descript={`비밀번호 변경이 성공적으로 완료되었습니다.
                아래  로그인 버튼을 눌러 다시 한 번 로그인 해주세요.`}
                isSuccess={true}
            />
            <Button
                text={'로그인'}
                type={'beige'}
                onClick={() => navigate('/login')}
            />
        </Container>
    );
};
export default NewPwGuide;
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
