package com.team23.mainPr;

import com.team23.mainPr.Member.Controller.MemberController;
import com.team23.mainPr.Member.Dto.CreateMemberDto;
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
    CreateMemberDto createMemberDto = new CreateMemberDto("wonyong92", "jangwonyong@@@", "oreooreo");

    @Test
    void contextLoads() {
    }

    /*
     * refactor : 유스케이스 늘리기
     *
     * */

    @Test
    void validateCreateUserData() {

        boolean result = memberController.checkInput(createMemberDto);

        Assert.isTrue(result, "user ID, password check function test");
    }
	/*
    *ResponseEntity 내부에 제네릭으로 body가 선언되어 있다. 가져와서 내부 데이터를 검증할수 있다.
    */

    @Test
    void createUserTest() {

        ResponseEntity result = memberController.createMember(createMemberDto);
        Member created = (Member) result.getBody();//명시적으로 캐스팅해주어야 한다.

        System.out.println(created.getLoginId());

        Assert.isTrue(created.getLoginId().equals("wonyong92"), "user ID check");
        Assert.isTrue(created.getPassword().equals("jangwonyong@@@"), "password check");
        Assert.isTrue(created.getNickname().equals("oreooreo"), "Nickname check");
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
