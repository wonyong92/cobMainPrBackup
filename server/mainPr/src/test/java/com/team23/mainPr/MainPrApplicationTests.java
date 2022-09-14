package com.team23.mainPr;

import com.team23.mainPr.Dto.CommonDto;
import com.team23.mainPr.Member.Controller.MemberController;
import com.team23.mainPr.Member.Dto.CreateMemberDto;
import com.team23.mainPr.Member.Dto.MemberResponse;
import com.team23.mainPr.Member.Entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;

/*
 * ETC : @SpringBootTest 사용시 서버가 돌아가고 있으면 에러가 발생한다. 이전에 실행된 스프링부트가 꺼져야 한다.
 * */

@SpringBootTest
class MainPrApplicationTests {

    @Autowired
    MemberController memberController;
    String loginId = "wonyong92@github.com";
    String password = "password@@password";
    String nickname = "nick닉네임5586";
    CreateMemberDto createMemberDto = new CreateMemberDto(loginId, password, nickname);

    @Test
    void contextLoads() {
    }

    /*
     * refactor : 유스케이스 늘리기
     *
     * */

    @Test
    void validateCreateUserData() {

        ResponseEntity result = memberController.checkInput(createMemberDto);
        CommonDto dto = (CommonDto) result.getBody();

        Assert.isTrue(dto.getMsg().equals(true), "user ID, password check function test");
    }
	/*
    *ResponseEntity 내부에 제네릭(오브젝트라고 봐도 무방)으로 body가 선언되어 있다. 가져와서 내부 데이터를 검증할수 있다.
    */

    @Test
    void createUserTest() {

        ResponseEntity result = memberController.createMember(createMemberDto);
        CommonDto Cdto = (CommonDto) result.getBody();
        MemberResponse dto = (MemberResponse) Cdto.getDto();


        Assert.isTrue(dto.getLoginId().equals(loginId), "user ID check");
        Assert.isTrue(dto.getPassword().equals(password), "password check");
        Assert.isTrue(dto.getNickname().equals(nickname), "Nickname check");
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
