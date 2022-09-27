package com.team23.mainPr.Global.CustomException;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * <pre>
 * 예외 객체 자체가 아니라 예외의 정보를 감싸는 열거 객체
 * 실제 사용시에는 예외를 상속받은 예외 객체에 사용해야 한다.
 * 내부에 저장된 예외 정보가 수정(국제화 : 다른나라에서도 사용할 수 있게)이 어렵다.
 * 코드 정보를 확인해서 국제화된 메세지로 교체 하는 로직을 사용할 수도 있다 - 불필요한 로직 구현 필요
 * 초기화 없이 private로 템플릿과 같이 껍데기 객체만 선언하여 외부 데이터 소스(DB, 프로그램 외부에서 관리되고 있는 에러 코드 정보를 가진 파일)를 이용하여 실시간으로 변경된 에러 정보 응답 가능
 * 대신 구현이 어렵고, 공통적인 에러코드만 응답하면 되는 작은 시스템에서는 과한면이 있다. - 대형, 다양한 언어로 제공되는 서비스에 적합
 * 에러코드 자체는 거의 고정, 메세지에 대해서 다양한 언어로 표현 필요 - 어느정도 한정된 언어만 커버해야한다면 내부에 국가코드-메세지(자료구조 : 맵) 이런식으로 저장해서 사용하는 방식은 어떨까
 * enum 사용시 하나의 타입에 여러 이름의 객체 사용가능 - 비슷하게 인터페이스와 구현체들을 이용해보는 건? - 한눈에 관리하기 힘들다. 중복 코드가 많이 발생한다. 코드 구현이 간결하지 않다.
 * </pre>
 */

@RequiredArgsConstructor
@Getter
public enum ErrorData {

    BAD_REQUEST(HttpStatus.BAD_REQUEST, "공통 에러 : 잘못된 요청 값 입니다."),
    CLASS_CASTING_EXCEPTION(HttpStatus.BAD_REQUEST, "잘못된 BODY 입력"),
    DB_ERROR_OCCURED(HttpStatus.INTERNAL_SERVER_ERROR, "공통 에러 : 데이버베이스 자료에 접근 동안 에러 발생"),
    INVALID_REGISTER_MEMBER_ID(HttpStatus.BAD_REQUEST, "회원 가입 : 잘못된 로그인 ID 형식"),
    INVALID_REGISTER_MEMBER_NICKNAME(HttpStatus.BAD_REQUEST, "회원 가입 : 잘못된 로그인 ID 형식"),
    INVALID_REGISTER_MEMBER_PASSWORD(HttpStatus.BAD_REQUEST, "회원 가입 : 잘못된 로그인 비밀번호 형식"),
    MISSING_REQUIRED_DATA(HttpStatus.BAD_REQUEST, "요청에 필요한 데이터가 누락"),
    NOT_EXIST_LOGIN_INFORMATION(HttpStatus.FORBIDDEN,
        "로그인 정보가 누락되었습니다.() 재 로그인하거나 브라우저의 쿠키 사용여부 설정을 확인하세요."),
    NOT_MATCHED_ID(HttpStatus.BAD_REQUEST, "로그인 : 잘못된 아이디"),
    NOT_ALLOWED_ACCESS_RESOURCE(HttpStatus.FORBIDDEN, "요청한 데이터 소유자가 아닙니다."),
    NOT_MATCHED_PASSWORD(HttpStatus.BAD_REQUEST, "로그인 : 잘못된 비밀번호"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "데이터 처리과정에서 에러가 발생하였습니다.");


    private final HttpStatus code;
    private final String reason;

}
