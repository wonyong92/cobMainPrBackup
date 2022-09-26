import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faG } from '@fortawesome/free-solid-svg-icons';
import Button from '../../UI/button/Button';
const DeleteSocialAccount = () => {
    return (
        <Container>
            <div className="title">소셜계정 연동</div>
            <BtnWrapper>
                <FontAwesomeIcon icon={faG} className="google" />
                <Button
                    type={'white'}
                    text={'구글 해제하기'}
                    width={'middle'}
                ></Button>
            </BtnWrapper>
        </Container>
    );
};
export default DeleteSocialAccount;

const Container = styled.div`
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-bottom: 50px;
    .title {
        font-size: 16px;
        font-weight: 600;
        color: #464646;
        margin-bottom: 10px;
    }
    @media screen and (max-width: 500px) {
        padding-bottom: 0px;
    }
`;
const BtnWrapper = styled.div`
    margin-top: 10px;
    .google {
        position: relative;
        left: 30px;
        top: 2px;
    }
    button {
        height: 50px;
        padding-left: 40px;
        padding-right: 20px;
        border-radius: 5px;
        border: #aba8a8 1px solid;
        font-size: 13px;
        white-space: nowrap;
    }
`;
