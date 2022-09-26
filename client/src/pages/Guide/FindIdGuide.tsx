import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../UI/button/Button';
import PageDescript from '../../components/Descript/PageDescript';
const FindIdGuide = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <PageDescript
                title={'ID 찾기'}
                descript={`아이디는 mmmdo22 입니다.`}
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
export default FindIdGuide;
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
