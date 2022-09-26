import { getPosts } from '../../Utils/ApiCall';
import styled from 'styled-components';
import PostItem from '../../components/PostItem/PostItem';
import { useEffect, useState } from 'react';

const Main = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then((res) => {
            setPosts(res.data);
            console.log(res);
        });
    }, []);

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
            {posts.map((post) => (
                <PostItem
                category= {post}
                rentPostContents= {post}
                rentPostId= {post}
                rentPostName= {post} 
                updateDate= {post}
                viewCount= {post}
                writeDate= {post}
                writerId= {post}
                rentStatus= {post}
                />
            ))}
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
