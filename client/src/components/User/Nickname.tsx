import { ChangeEvent, useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/context';
import { NicknameWrapper, BtnWrapper, MsgWrapper } from './nickname-style';
import Button from '../../UI/button/Button';
import DefaultInput from '../../UI/input/DefaultInput';
import axios from 'axios';
const Nickname = () => {
    const { user } = useContext(UserContext);
    const [nickname, setNickname] = useState(user.nickname);
    const [message, setMessage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };
    const changeNickname = async () => {
        const data = {
            memberId: user.memberId,
            nickname,
        };
        try {
            const res = await axios.put(`http://3.39.180.45:56178/member/profile`, data);
            setNickname(res.data.nickname);
            setMessage(`닉네임이 ${nickname} (으)로 변경되었습니다 :)`);
        } catch {
            setMessage(`다시 시도해주세요-!`);
        }
    };
    const cancleChangeNickname = () => {
        setNickname(nickname);
    };
    return (
        <NicknameWrapper>
            <div className="title">닉네임</div>
            <DefaultInput
                value={nickname}
                onChange={handleChange}
                placeholder="2-10자 내로 입력해주세요"
            ></DefaultInput>
            <BtnWrapper>
                <Button
                    onClick={cancleChangeNickname}
                    type={'white'}
                    width={'short'}
                    text={'취소'}
                ></Button>
                <Button
                    onClick={changeNickname}
                    type={'white'}
                    width={'short'}
                    text={'변경'}
                ></Button>
            </BtnWrapper>
            {message !== '' ? (
                <MsgWrapper>
                    <p>{message}</p>
                </MsgWrapper>
            ) : null}
        </NicknameWrapper>
    );
};
export default Nickname;
