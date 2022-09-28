import { useState } from 'react';
import styled from 'styled-components';
import UserCard from '../../components/User/UserCard';
import Button from '../../UI/button/Button';
const MyActivity = () => {
    const [isRenting, setIsRenting] = useState<boolean>(false);
    return (
        <Container>
            <Title>활동내역</Title>
            <UserCard />
            <BtnWrapper>
                <Button
                    text={'렌트가능'}
                    width="short"
                    radius={'deep'}
                    type={isRenting ? 'white' : 'default'}
                    onClick={() => setIsRenting(false)}
                />
                <Button
                    text={'렌트중'}
                    width="short"
                    radius={'deep'}
                    type={isRenting ? 'default' : 'white'}
                    onClick={() => setIsRenting(true)}
                />
            </BtnWrapper>
            <div>리스트아이템</div>
        </Container>
    );
};
export default MyActivity;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    align-items: flex-start;
`;

const Title = styled.div`
    text-align: left;
    font-weight: 500;
`;

const BtnWrapper = styled.div`
    display: flex;
    margin-bottom: 15px;
    button {
        margin-right: 5px;
    }
`;
