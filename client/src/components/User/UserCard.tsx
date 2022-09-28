import styled from 'styled-components';
const UserCard = () => {
    return (
        <Container>
            <ImgWrapper>
                <img
                    alt="profile"
                    src="https://i.pinimg.com/474x/a8/34/51/a83451b046c3505aadcbdb64cfdb8ad6.jpg"
                />
            </ImgWrapper>
            <InfoWrppaer>
                <div className="nickname">빌려줄거하도할샤</div>
                <div className="signedAt">가입일: 2022.09.21</div>
            </InfoWrppaer>
        </Container>
    );
};
export default UserCard;
const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    width: 100%;
    border-bottom: #efeded 0.5px solid;
    margin-bottom: 25px;
`;
const ImgWrapper = styled.div`
    img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
    }
`;
const InfoWrppaer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .nickname {
        font-size: 13px;
        font-weight: 600;
    }
    .signedAt {
        font-size: 11px;
        color: #464646;
    }
`;
