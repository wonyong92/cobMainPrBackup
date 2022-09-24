package com.team23.mainPr.Global.Enum;

import lombok.Getter;

/**
 * <pre>
 * 자바 enum으로 ChildCommonDto의 가능한 메세지 목록을 작성
 * @see ChildCommonDtoMsgList#getMsg() 함수로 저장된 메세지 출력
 * name() 함수는 final 함수라 오버라이드 불가능
 * </pre>
 */

@Getter
public enum ChildCommonDtoMsgList {

    TRUE("true"),
    SUCCESS("success"),
    FAIL("fail"),
    FALSE("false"),
    CREATED("created"),
    NOT_MATCH_PASSWORD("not matched password"),
    NOT_MATCH_ID("not matched loginId"),
    ERROR("error"),
    NULL_NICKNAME("닉네임 정보가 누락 되었습니다.(nickname)"),
    NULL_EMAIL("이메일 정보가 누락 되었습니다.(email)"),
    NULL_LOGINID("로그인 아이디 정보가 누락 되었습니다.(loginId)");


    private final String msg;

    // public 시 컴파일 에러 발생
    ChildCommonDtoMsgList(String msg){
        this.msg = msg;
    }
    public String getMsg() {
        return this.msg;
    }
}
