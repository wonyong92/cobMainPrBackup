package com.team23.mainPr.Domain.Member.Controller;

import com.team23.mainPr.Domain.Member.Dto.Request.CreateMemberDto;
import com.team23.mainPr.Domain.Member.Dto.Request.FindIdDto;
import com.team23.mainPr.Domain.Member.Dto.Request.FindPasswordDto;
import com.team23.mainPr.Domain.Member.Dto.Request.UpdateMemberDto;
import com.team23.mainPr.Domain.Member.Dto.Response.MemberProfileDto;
import com.team23.mainPr.Domain.Member.Dto.Response.MemberResponseDto;
import com.team23.mainPr.Domain.Member.Service.MemberService;
import com.team23.mainPr.Domain.RentPost.Dto.Response.RentPostResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import java.io.IOException;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * <pre>
 * expected feature
 * create user data
 * create user profile by auto
 * delete user data
 * user data validation check
 *
 * 현재 리턴문에 대해 같은 코드가 중복되고 있다 - 이후에 기능 구현이 상세해지면 분기가 달라질 가능성이 있어서 남겨두고
 * 만약 분기가 나누어 지지 않는다면 하나의 static 메소드로 만들어서 response에 들어갈 객체만 제네릭을 이용해서 처리 가능하게 만들기 -> 서비스에서 모두 처리하도록 리팩토링 완료
 * </pre>
 */
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @Operation(description = "회원 가입, 데이터베이스에 회원 정보를 저장하고, 생성된 회원정보를 응답.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post")
    public MemberResponseDto createMember(@RequestBody @Valid CreateMemberDto dto) {
        return memberService.createMember(dto);
    }

    @Operation(description = "회원 정보 확인, 토큰을 이용하여 본인 확인.")
    @GetMapping
    public MemberResponseDto getMember(
        @RequestParam @Valid @Min(value = 1) Integer memberId,
        @RequestHeader(value = "Authorization", required = false) String token) {
        return memberService.getMember(memberId, token);
    }

    @Operation(description = "프로필 정보 확인.")
    @GetMapping("profile")
    public MemberProfileDto getProfile(@RequestParam @Valid @Min(value = 1) Integer memberId) {
        return memberService.getProfile(memberId);
    }

    @Operation(description = "프로필 정보 업데이트, 토큰을 이용하여 본인 정보인지 확인.")
    @PutMapping("profile")
    public MemberProfileDto updateProfile(
        @RequestBody @Valid UpdateMemberDto updateMemberDto,
        @RequestHeader(value = "Authorization", required = false) String token) {
        return memberService.updateProfile(updateMemberDto, token);
    }

    @Operation(description = "회원 탈퇴, 토큰을 이용하여 본인 정보인지 확인.")
    @DeleteMapping("/delete")
    public void deleteMember(
        @RequestParam @Valid @Min(value = 1) Integer memberId,
        @RequestHeader(value = "Authorization", required = false) String token) {
        memberService.deleteMember(memberId, token);
    }

    @Operation(description = "이메일 중복확인.")
    @GetMapping("/checkExistEmail")
    public String checkExistEmail(@RequestParam String email) {
        return memberService.checkExistEmail(email);
    }

    @Operation(description = "아이디 중복확인.")
    @GetMapping("/checkExistId")
    public String checkExistId(@RequestParam String id) {
        return memberService.checkExistId(id);
    }

    @Operation(description = "닉네임 중복확인.")
    @GetMapping("/checkExistNickname")
    public String checkNicknameId(@RequestParam String nickname) {
        return memberService.checkNickname(nickname);
    }

    @Operation(description = "아이디 찾기, 이름과 이메일을 확인하여 매칭되는 아이디 응답.")
    @GetMapping("/findId")
    public String findId(@RequestBody @Valid FindIdDto findIdDto) {
        return memberService.findId(findIdDto);
    }

    @Operation(description = "비밀번호 찾기, 이름과 이메일, 아이디를 확인하여 매칭되는 비밀번호 응답.")
    @GetMapping("/findPassword")
    public String findPassword(@RequestBody @Valid FindPasswordDto findPasswordDto) {
        return memberService.findPassword(findPasswordDto);
    }

    @Operation(description = "프로필 이미지 변경, 토큰을 이용하여 본인인지 확인.")
    @PostMapping("/profileImage/post")
    public void upload(
        @RequestParam MultipartFile file,
        @RequestParam Integer memberId,
        @RequestHeader(value = "Authorization", required = false) String token) throws IOException {
        memberService.setProfilePicture(memberId, file, token);
    }

    @Operation(description = "프로필 이미지 조회.")
    @GetMapping(value = "/profileImage/get", produces = "image/png")
    public Resource getDefaultProfileImage(@RequestParam Integer memberId) throws IOException {
        return memberService.getProfilePicture(memberId);
    }

    @Operation(description = "유저가 작성한 게시글 목록 확인")
    @GetMapping("/rentPosts")
    public List<RentPostResponseDto> getRentPosts(@RequestParam Integer memberId) {
        return memberService.getRentPostMember(memberId);
    }

    //    @Operation(description = "인터셉터 테스트")
    //    @GetMapping("/inter")
    //    @Login
    //    public Boolean checkInter(@RequestParam Integer memberId) {
    //        return memberService.checkInter(memberId);
    //    }
}
