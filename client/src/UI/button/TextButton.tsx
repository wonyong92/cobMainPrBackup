import styled from 'styled-components';
interface Prop {
    text: string;
    btnText: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const TextButton = ({ text, btnText, onClick }: Prop) => {
    return (
        <Container>
            <div className="title">{text}</div>
            <button onClick={onClick}>{btnText}</button>
        </Container>
    );
};
export default TextButton;
const Container = styled.div`
    display: flex;
    width: 65%;
    margin-top: 30px;
    justify-content: space-around;
    .title {
        color: #727272;
        font-size: 12px;
    }
    button {
        cursor: pointer;
        color: #c1a57c;
        font-weight: 600;
        font-size: 12px;
        background-color: transparent;
        border: none;
    }
`;
