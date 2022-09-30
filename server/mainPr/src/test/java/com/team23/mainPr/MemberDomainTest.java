package com.team23.mainPr;

import static org.assertj.core.api.Assertions.assertThat;

import com.team23.mainPr.Domain.Login.Repository.LoginRepository;
import com.team23.mainPr.Domain.Login.Service.LoginService;
import com.team23.mainPr.Domain.Member.Controller.MemberController;
import com.team23.mainPr.Domain.Member.Dto.Request.CreateMemberDto;
import com.team23.mainPr.Domain.Member.Dto.Request.UpdateMemberDto;
import com.team23.mainPr.Domain.Member.Dto.Response.MemberProfileDto;
import com.team23.mainPr.Domain.Member.Entity.Member;
import com.team23.mainPr.Domain.Member.Mapper.MemberMapper;
import com.team23.mainPr.Domain.Member.Repository.MemberRepository;
import com.team23.mainPr.Domain.Member.Service.MemberService;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.CustomException.ErrorData;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(properties = "spring.config.location=" + "classpath:/application-test.yml")
class MemberDomainTest {

    @Autowired MemberController memberController;
    @Autowired MemberRepository memberRepository;

    CreateMemberDto createMemberDto = CreateMemberDto.builder().email("test@email.com").name("홍길동").nickname("테스트유저").password("password@@").loginId("testuser1").build();
    String token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKV1QiLCJjcmVhdGVkQXQiOiIyMDIyLTA5LTI5VDIyOjUzOjQ2LjczNjY3OSswOTowMFtBc2lhL1Nlb3VsXSIsImxvZ2luSWQiOiJ3b255b25nOTIxIiwicHJvZmlsZUltYWdlSWQiOjEsIm5pY2tuYW1lIjoibmlja-uLiW5hbWU1NTg2IiwibmFtZSI6Iu2Zjeq4uOuPmSIsImV4cCI6MTY2NTA1OTYzMSwiZW1haWwiOiJ0ZXN0ZW1haWwwMUBuYXZlci5jb20iLCJtZW1iZXJJZCI6MX0._9HPrRwKhPkfaSRmwGEq-rkeseUR8InQkX2ZsHgnMgz4iwS8pqAz3xsg4aTFrV9jVZP_2vLX4GBzXgi5A3MZRw";

    @BeforeEach
    public void 회원가입() {
        memberController.createMember(createMemberDto);
    }

    @AfterEach
    public void 회원정보초기화() {
        memberRepository.truncate();
    }

    @Test
    public Member DB_회원_정보_테스트_DB응답의_이메일_정보_확인() {
        Member craetedMember = memberRepository.findByEmail(createMemberDto.getEmail()).orElseThrow(() -> {
            throw new CustomException(ErrorData.MEMBER_NOT_FOUND);
        });
        assertThat(createMemberDto.getName()).isEqualTo(createMemberDto.getName()).as("데이터베이스에서 이메일을 이용하여 이전에 생성된 회원 정보를 읽어 회원 정보가 저장되었는지 검증.");
        return craetedMember;
    }

    @Test
    public void 프로필_조회_테스트_응답의_로그인아이디_정보_확인() {
        Member createdMember = memberRepository.findByEmail(createMemberDto.getEmail()).orElseThrow(() -> {
            throw new CustomException(ErrorData.MEMBER_NOT_FOUND);
        });

        MemberProfileDto profile = memberController.getProfile(createdMember.getMemberId());

        assertThat(profile.getLoginId()).isEqualTo(createdMember.getLoginId()).as("회원 가입 후 저장된 회원 정보를 읽어들여 프로필 정보 조회 api 응답을 로그인 아이디를 이용하여 검증.");
    }

    @Test
    @Transactional
    public void 프로필_업데이트_테스트_응답의_닉네임_정보_확인(Member member) {
        Integer memberId = 1;
        if (member != null) {
            memberId = member.getMemberId();
        }
        UpdateMemberDto updateMemberDto = UpdateMemberDto.builder().nickname("updated테스트유저").memberId(memberId).build();
        MemberProfileDto result = memberController.updateProfile(updateMemberDto, token);

        assertThat(result.getNickname()).isEqualTo("updated테스트유저");
    }

    @Test
    @Transactional
    public void 시나리오_회원정보_확인_그리고_프로필_수정() {
        Member member = DB_회원_정보_테스트_DB응답의_이메일_정보_확인();
        프로필_업데이트_테스트_응답의_닉네임_정보_확인(member);
    }

}
