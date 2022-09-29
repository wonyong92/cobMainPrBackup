import styled from 'styled-components';
const Container = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px 0;
    .line {
        min-width: 30px;
        border-top: 1px solid #e7e5e5;
        margin-top: 7px;
        flex-grow: 1;
    }
    .text {
        color: #aba8a8;
        font-size: 12px;
        font-weight: 500;
        margin: 0 10px;
    }
`;
interface Prop {
    text: string;
}
const InputDescript = ({ text }: Prop) => {
    return (
        <Container>
            <div className="line" />
            <div className="text">{text}</div>
            <div className="line" />
        </Container>
    );
};
export default InputDescript;
