import styled from 'styled-components';
interface Prop {
    type?: 'password' | 'text';
    value?: string;
    placeholder?: string;
}
const DefaultInput = ({ type = 'text', value, placeholder }: Prop) => {
    return (
        <Container>
            <input type={type} value={value} placeholder={placeholder} />
        </Container>
    );
};
export default DefaultInput;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    input {
        height: 35px;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #d9d9d9;
        text-indent: 5px;
        font-size: 12px;
    }
`;
