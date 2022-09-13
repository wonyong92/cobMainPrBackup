package com.team23.mainPr.Member.Controller;

import com.team23.mainPr.Member.Dto.CreateMemberDto;
import com.team23.mainPr.Member.Entity.Member;
import com.team23.mainPr.Member.Service.MemberService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
 * [ETC]
 * expected feature
 * create user data
 * create user profile by auto
 * delete user data
 * user data validation check
 * */

@RestController
@RequestMapping(value = "/user")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /*
     * ETC : 모델 어트리뷰트 vs 리퀘스트 바디
     * ETC : 스프링 validation
     */

    @ApiOperation(value = "회원 가입 입력 데이터 유효성 검증 기능.", notes = "회원 가입을 위해 입력 받은 정보를 정규식을 이용하여 검증.")
    @PostMapping("/validation")
    public boolean validation(@RequestBody @ApiParam(name = "CreateMemberDto", value = "입력한 회원 정보.", required = true) CreateMemberDto dto) {

        boolean result = memberService.loginValidation(dto);

        return result;
    }//validation

    /*
     * refactor : 비밀번호 같은 민감 정보를 전송해도 될까? - response Dto를 만들어서 암호화 할까?
     */

    @ApiOperation(value = "회원 가입 기능.", notes = "데이터베이스에 회원 정보를 저장하고, 생성된 회원정보를 응답한다.")
    @PostMapping("/")
    public ResponseEntity createMember(@RequestBody @ApiParam(name = "CreateMemberDto", value = "입력한 회원 정보.", required = true) CreateMemberDto dto) {

        Member member = memberService.createMember(dto);

        return new ResponseEntity(member, HttpStatus.CREATED);
    }//createMember

    /*
     * refactor : 현재는 전혀 암호화나, 마스킹 또는 맵퍼를 이용해서 리소스 중에 민감 정보를 거르지 않고 응답하고 있다. 프론트-서버 사이에 보안을 믿으면 되는 것일까?
     */

    @ApiOperation(value = "유저 정보 확인 기능.", notes = "데이터베이스에서 회원 정보를 찾아 응답한다.")
    @GetMapping("/")
    public ResponseEntity getMember(@RequestParam @ApiParam(name = "memberId", value = "회원 식별 번호.", required = true) Integer memberId) {

        Member member = memberService.getMember(memberId);

        return new ResponseEntity(member, HttpStatus.OK);
    }//createMember

    @ApiOperation(value = "유저 정보 삭제 기능.", notes = "데이터베이스에서 회원 정보를 찾아 삭제 후 성공여부를 응답한다.")
    @DeleteMapping("getMember")
    public ResponseEntity deleteMember(@RequestParam @ApiParam(name = "memberId", value = "회원 식별 번호.", required = true) Integer memberId) {

        Member member = memberService.getMember(memberId);

        return new ResponseEntity(member, HttpStatus.OK);
    }//deleteMember

    /*
    * refactor : @RestControllerAdvice를 사용해서 별도의 컨트롤러 전용 에러 핸들링 클래스 생성 가능 - 가독성 증가!
    * */

    @ExceptionHandler(NullPointerException.class)
    public String handleNullException(Exception e) {

        System.err.println(e.getClass());

        return "null pointer exception occurred";
    }
}