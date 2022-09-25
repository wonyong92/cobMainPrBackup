import styled from 'styled-components';
import Button from '../../UI/button/Button';
const ProfileImg = () => {
    const imgUrl: string =
        'https://i.pinimg.com/474x/a8/34/51/a83451b046c3505aadcbdb64cfdb8ad6.jpg';
    return (
        <Container>
            <div className="title">프로필이미지</div>
            <ImgWrapper>
                <img alt="profile" src={imgUrl} />
                <Button type={'white'} width={'short'} text={'변경'} />
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
        width: 60px;
        height: 60px;
        border-radius: 100%;
    }
    button {
        border: #4a4747 1px solid;
        margin-left: 15px;
        width: 50px;
        border-radius: 5px;
    }
    @media screen and (max-width: 500px) {
        img {
            width: 40px;
            height: 40px;
        }
        button {
            width: 40px;
            height: 30px;
            font-size: 12px;
        }
    }
`;
