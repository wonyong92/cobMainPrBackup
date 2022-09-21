import styled from 'styled-components';
import { ReactComponent as Logo } from '../asessts/img/biglogo.svg';
interface Prop {
    title: string;
    descript?: string;
}
const PageDescript = ({ title, descript }: Prop) => {
    return (
        <DescriptWrapper>
            <LogoSVG />
            <h4>{title}</h4>
            <p>{descript}</p>
        </DescriptWrapper>
    );
};
export default PageDescript;
const DescriptWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
        margin-bottom: 10px;
    }
    p {
        margin: 0;
        font-size: 12px;
    }
`;
const LogoSVG = styled(Logo)`
    margin-bottom: 35px;
`;
