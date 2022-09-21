import styled from 'styled-components';
const ProfileImg = () => {
    return (
        <Container>
            <div className="title">프로필이미지</div>
            <ImgWrapper>
                <img
                    alt="profile"
                    src="https://i.pinimg.com/474x/a8/34/51/a83451b046c3505aadcbdb64cfdb8ad6.jpg"
                />
                <button>변경</button>
            </ImgWrapper>
        </Container>
    );
};
export default ProfileImg;
const Container = styled.div`
    padding-top: 5px;
    padding-left: 10px;
    margin-bottom: 40px;
    .title {
        color: #4a4747;
        font-size: 14px;
    }
`;
const ImgWrapper = styled.div`
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    align-items: flex-end;

    img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
    }
    button {
        cursor: pointer;
        background-color: transparent;
        padding: 5px;
        border-radius: 5px;
        color: #4a4747;
        border: #4a4747 1px solid;
        font-size: 12px;
        margin-left: 10px;
    }
`;
