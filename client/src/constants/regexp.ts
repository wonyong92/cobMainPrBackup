export const ID_REGEXP = /^[A-Za-z0-9]{6,12}$/;
export const PW_REGEXP =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)-_=+]).{8,16}$/;
export const EMAIL_REGEXP =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
// 한글 2-10자
export const USERNAME_REGEXP = /^[가-힣]{2,10}$/;
// 영문, 한글, 숫자 2-8자
export const NICKNAME_REGEXP = /^[가-힣|a-z|A-Z|0-9|]{2,15}$/;
