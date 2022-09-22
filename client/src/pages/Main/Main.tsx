// /* eslint-disable import/no-unresolved */
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import PostItem from '../../components/PostItem';
import TextInput from '../../UI/input/TextInput';

const Main = () => {
    return (
        <>
            <section>
                <WelcomePage>
                    <Title>
                        개인 간 렌탈 플랫폼<br></br> 빌리지뭐
                    </Title>
                    <SubTitle>
                        살까 말까 고민 된다면<br></br> 지금 여기서 빌리고
                        써보세요 :)
                    </SubTitle>
                </WelcomePage>
                <WelcomePage style={{ background: '#FFFCFE' }}>
                    <Title style={{ paddingLeft: '150px' }}>
                        사지말고<br></br> 빌려보세요
                    </Title>
                    <SubTitle style={{ paddingLeft: '150px' }}>
                        현명한 소비습관의 시작,<br></br> 지금 경험해보세요!
                    </SubTitle>
                </WelcomePage>
            </section>
            <TextInput
                type={'text'}
                value={''}
                input={''}
                onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                    throw new Error('Function not implemented.');
                }}
            />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
        </>
    );
};

const WelcomePage = styled.article`
    background-color: #fffbef;
    height: 20rem;
    display: flex;
    flex-direction: column; ;
;
`;
const Title = styled.h3`
    padding: 0;
    margin: 0;
    padding-top: 120px;
    padding-left: 20px;
`;

const SubTitle = styled.p`
    padding-left: 20px;
`;

export default Main;
