package com.team23.mainPr;

import com.team23.mainPr.Dto.ChildCommonDto;
import com.team23.mainPr.Member.Controller.MemberController;
import com.team23.mainPr.Member.Dto.CreateMemberDto;
import com.team23.mainPr.Member.Dto.MemberResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import static com.team23.mainPr.Enum.ChildCommonDtoMsgList.TRUE;
import static org.assertj.core.api.Assertions.*;

/**
 * \@SpringBootTest 사용시 서버가 돌아가고 있으면 에러가 발생한다. 이전에 실행된 스프링부트가 꺼져야 한다.
 * */

@SpringBootTest
class MainPrApplicationTests {

    @Autowired
    MemberController memberController;
    String loginId = "wonyong92@github.com";
    String password = "password@@password";
    String nickname = "닉네임1524";
    CreateMemberDto createMemberDto = new CreateMemberDto(loginId, password, nickname);

    @Test
    void contextLoads() {
    }


    @DisplayName(value = "회원가입 입력 데이터 유효성 검증 기능 테스트 = 성공/실패 검증")
    @Test
    void validateCreateUserData() {

        ResponseEntity<ChildCommonDto> result = memberController.checkInput(createMemberDto);
        ChildCommonDto dto = (ChildCommonDto) result.getBody();
        assertThat(dto.getMsg()).as("check user ID, password").isEqualTo(TRUE.getMsg());
    }
	/**
    *ResponseEntity<ChildCommonDto> 내부에 제네릭으로 body가 선언되어 있다. 가져와서 내부 데이터를 검증할수 있다.
    */

    @DisplayName(value = "회원가입 기능 테스트 = 응답의 아이디,비밀번호, 닉네임 검증")
    @Test
    void createUserTest() {

        ResponseEntity<ChildCommonDto> result = memberController.createMember(createMemberDto);
        ChildCommonDto Cdto = (ChildCommonDto) result.getBody();
        MemberResponse dto = (MemberResponse) Cdto.getDto();

        assertThat(dto.getLoginId()).as("check user ID").isEqualTo(loginId);
        assertThat(dto.getPassword()).as("check user password").isEqualTo(password);
        assertThat(dto.getNickname()).as("check user Nickname").isEqualTo(nickname);
    }

    @Test
    void getUserDataTest() {
    }

    @Test
    void delUserDataTest() {
    }

    @Test
    void autoCreateProfileTest() {
    }

    @Test
    void checkMemberRole() {
    }
}
