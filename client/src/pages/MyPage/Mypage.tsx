import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import MyInfo from '../../components/User/MyInfo';
import MyAccount from '../../components/User/MyAccount';
const Mypage = () => {
    const [isInfo, setIsInfo] = useState(true);
    return (
        <Container>
            <Top>
                <div className="title">내 계정</div>
                <Btns>
                    <BtnWrapper
                        onClick={() => setIsInfo(true)}
                        className={isInfo ? 'active' : 'deActive'}
                    >
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <button>회원정보</button>
                    </BtnWrapper>
                    <BtnWrapper
                        onClick={() => setIsInfo(false)}
                        className={isInfo ? 'deActive' : 'active'}
                    >
                        <FontAwesomeIcon icon={faEdit} className="icon" />
                        <button>계정</button>
                    </BtnWrapper>
                </Btns>
            </Top>
            <Bottom>{isInfo ? <MyInfo /> : <MyAccount />}</Bottom>
        </Container>
    );
};
export default Mypage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
`;
const Top = styled.div`
    width: 95%;
    margin-bottom: 10px;
    border-bottom: 1px solid #efefef;
    .title {
        color: #171715;
        font-size: 16px;
        font-weight: 600;
    }
`;
const Btns = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    .active {
        background-color: #e4d8c6;
        transition: 0.2s;
    }
    .deActive {
        background-color: transparent;
        transition: 0.2s;
    }
`;
const BtnWrapper = styled.div`
    button {
        color: #464646;
        font-size: 14px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 40px;
        text-align: left;
        background-color: transparent;
        border: none;
    }
    .icon {
        position: relative;
        color: #464646;
        top: 2px;
        left: 30px;
    }
`;
const Bottom = styled.div`
    padding-top: 15px;
    display: flex;
    flex-direction: column;
`;
