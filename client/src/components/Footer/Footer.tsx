import styled from 'styled-components';
const MyFooter = styled.footer`
    font-size: 12px;
    text-align: center;
    color: #464646;
    border-top: 1px solid #f1efef;
    width: 100%;
    padding: 15px;
    margin-top: 15px;
`;
const Footer = () => {
    return <MyFooter>@ 2022 빌리지뭐, All rights reserved.</MyFooter>;
};
export default Footer;
