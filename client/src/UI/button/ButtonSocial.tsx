import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faG } from '@fortawesome/free-solid-svg-icons';

interface Prop {
    text: string;
}
const ButtonSocial = ({ text }: Prop) => {
    return (
        <BtnWrapper>
            <div className="text">{text}</div>
            <FontAwesomeIcon icon={faG} className="google" />
            <button></button>
        </BtnWrapper>
    );
};
export default ButtonSocial;
const BtnWrapper = styled.div`
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .text {
        font-size: 13px;
        font-weight: 600;
        color: #aba8a8;
    }
    .google {
        position: relative;
        left: 32px;
        top: 25px;
    }
    button {
        cursor: pointer;
        background-color: transparent;
        height: 35px;
        width: 80px;
        border-radius: 5px;
        color: #4a4747;
        border: #aba8a8 1px solid;
    }
`;
