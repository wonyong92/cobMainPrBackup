import styled from 'styled-components';
import DefaultInput from '../../UI/input/DefaultInput';
import Button from '../../UI/button/Button';
import { ChangeEvent, useState } from 'react';
import {
    ID_REGEXP,
    PW_REGEXP,
    EMAIL_REGEXP,
    USERNAME_REGEXP,
    NICKNAME_REGEXP,
    MSG_01,
    MSG_02,
    MSG_03,
    MSG_04,
    MSG_05,
    MSG_06,
    MSG_07,
    MSG_08,
    MSG_09,
    MSG_10,
    MSG_11,
    MSG_12,
    MSG_13,
    MSG_14,
    MSG_15,
    MSG_16,
    MSG_17,
    MSG_18,
} from '../../constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Signup } from '../../types';

interface Message {
    loginId: string;
    password: string;
    rePassword: string;
    name: string;
    nickname: string;
    email: string;
}
const SignupInput = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<Signup>({
        loginId: '',
        password: '',
        rePassword: '',
        name: '',
        nickname: '',
        email: '',
    });
    const [message, setMessage] = useState<Message>({
        loginId: '>',
        password: '>',
        rePassword: '>',
        name: '>',
        nickname: '>',
        email: '>',
    });
    const handleUserInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
        switch (name) {
            case 'loginId':
                isValidId(value)
                    ? setMessage({ ...message, ['loginId']: MSG_02 })
                    : setMessage({ ...message, ['loginId']: MSG_01 });
                break;
            case 'password':
                isValidPW(value)
                    ? setMessage({ ...message, ['password']: MSG_07 })
                    : setMessage({ ...message, ['password']: MSG_06 });
                break;
            case 'rePassword':
                isValidPW(value)
                    ? setMessage({ ...message, ['rePassword']: MSG_08 })
                    : setMessage({ ...message, ['rePassword']: MSG_09 });
                break;
            case 'name':
                isValidUsername(value)
                    ? setMessage({ ...message, ['name']: '' })
                    : setMessage({ ...message, ['name']: MSG_10 });
                break;
            case 'nickname':
                isValidNickname(value)
                    ? setMessage({ ...message, ['nickname']: MSG_02 })
                    : setMessage({ ...message, ['nickname']: MSG_11 });
                break;
            case 'email':
                isValidEmail(value)
                    ? setMessage({ ...message, ['email']: '' })
                    : setMessage({ ...message, ['email']: MSG_15 });
                break;
            default:
                alert('white'); //?
        }
    };
    // 유효성검사
    const isValidId = (str: string) => {
        return ID_REGEXP.test(str);
    };
    const isValidPW = (str: string) => {
        return PW_REGEXP.test(str);
    };
    const isValidUsername = (str: string) => {
        return USERNAME_REGEXP.test(str);
    };
    const isValidNickname = (str: string) => {
        return NICKNAME_REGEXP.test(str);
    };
    const isValidEmail = (str: string) => {
        return EMAIL_REGEXP.test(str);
    };
    // 중복체크
    const checkUserID = () => {
        if (isValidId(userInfo.loginId)) {
            axios
                .post(
                    `http://3.39.180.45:56178/member/post/checkExistId?id=${userInfo.loginId}`,
                    { withCredentials: false },
                )
                .then((res) => {
                    console.log(res.data);
                    res.data === 'not exist'
                        ? setMessage({ ...message, ['loginId']: MSG_03 })
                        : setMessage({ ...message, ['loginId']: MSG_04 });
                })
                .catch(() => {
                    setMessage({ ...message, ['loginId']: MSG_05 });
                });
        }
    };
    const checkNickname = () => {
        if (isValidNickname(userInfo.nickname)) {
            axios
                .post(
                    `http://3.39.180.45:56178/member/post/checkExistNickname?nickname=${userInfo.nickname}`,
                    { withCredentials: false },
                )
                .then((res) => {
                    res.data === 'not exist'
                        ? setMessage({ ...message, ['nickname']: MSG_13 })
                        : setMessage({ ...message, ['nickname']: MSG_12 });
                })
                .catch(() => {
                    setMessage({ ...message, ['nickname']: MSG_14 });
                });
        }
    };
    const checkEmail = () => {
        if (isValidEmail(userInfo.email)) {
            axios
                .post(
                    `http://3.39.180.45:56178/member/post/checkExistEmail?email=${userInfo.email}`,
                    { withCredentials: false },
                )
                .then((res) => {
                    res.data === 'not exist'
                        ? setMessage({ ...message, ['email']: MSG_17 })
                        : setMessage({ ...message, ['email']: MSG_16 });
                })
                .catch(() => {
                    setMessage({ ...message, ['email']: MSG_18 });
                });
        }
    };
    // 회원가입 요청
    const handleRegisterUser = () => {
        if (
            isValidId(userInfo.loginId) &&
            isValidPW(userInfo.password) &&
            isValidUsername(userInfo.name) &&
            isValidNickname(userInfo.nickname) &&
            isValidEmail(userInfo.email)
        ) {
            delete userInfo.rePassword;
            userInfo.profileImageId = 0;
            axios
                .post(`http://3.39.180.45:56178/member/post`, userInfo, {
                    withCredentials: false,
                })
                .then(() => {
                    navigate('/login', { replace: true });
                });
        } else {
            return;
        }
    };
    return (
        <>
            <Container>
                {/* 중복버튼 */}
                <Button
                    text={'중복확인'}
                    type={'beige'}
                    width={'short'}
                    onClick={checkUserID}
                />
                <Button
                    text={'중복확인'}
                    type={'beige'}
                    width={'short'}
                    onClick={checkNickname}
                />
                <Button
                    text={'중복확인'}
                    type={'beige'}
                    width={'short'}
                    onClick={checkEmail}
                />
                {/* input */}
                <DefaultInput
                    label="아이디"
                    name="loginId"
                    value={userInfo.loginId}
                    onChange={handleUserInfoChange}
                    message={message.loginId}
                    placeholder="아이디를 입력해주세요"
                />
                <DefaultInput
                    label="비밀번호"
                    type="password"
                    name="password"
                    value={userInfo.password}
                    onChange={handleUserInfoChange}
                    message={message.password}
                    placeholder="영문 소문자, 숫자, 특수문자 조합 8자 이상의 비밀번호"
                />
                <DefaultInput
                    label="비밀번호 확인"
                    type="password"
                    name="rePassword"
                    value={userInfo.rePassword}
                    onChange={handleUserInfoChange}
                    message={message.rePassword}
                    placeholder="영문 소문자, 숫자, 특수문자 조합 8자 이상의 비밀번호"
                />
                <DefaultInput
                    label="이름"
                    name="name"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                    message={message.name}
                    placeholder="이름을 입력해주세요"
                />
                <DefaultInput
                    label="닉네임"
                    name="nickname"
                    value={userInfo.nickname}
                    onChange={handleUserInfoChange}
                    message={message.nickname}
                    placeholder="2-15자 이하로 입력해주세요"
                />
                <DefaultInput
                    label="이메일"
                    name="email"
                    onChange={handleUserInfoChange}
                    message={message.email}
                    placeholder="이메일을 입력해주세요"
                />
            </Container>
            <BtnWrapper>
                <Button
                    text={'회원가입'}
                    type={'beige'}
                    onClick={handleRegisterUser}
                />
            </BtnWrapper>
        </>
    );
};
export default SignupInput;

const Container = styled.div`
    button {
        position: relative;
        height: 27.5px;
    }
    button:first-of-type {
        top: 48px;
        left: 237px;
    }
    button:nth-of-type(2) {
        top: 339.5px;
        left: 167px;
    }
    button:nth-of-type(3) {
        top: 412.5px;
        left: 97px;
    }
`;
const BtnWrapper = styled.div`
    margin-top: 20px;
    button {
        width: 310px;
    }
`;
