import styled from 'styled-components';
import ProfileImg from './ProfileImg';
import Nickname from './Nickname';
const MyInfo = () => {
    return (
        <>
            <Title>회원정보</Title>
            <ProfileImg />
            <Nickname />
        </>
    );
};
export default MyInfo;

const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #464646;
    padding-bottom: 10px;
`;
