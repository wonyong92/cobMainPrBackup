package com.team23.mainPr.Domain.Member.Controller;

import com.team23.mainPr.Domain.Member.Dto.Request.CreateMemberDto;
import com.team23.mainPr.Domain.Member.Dto.Request.FindIdDto;
import com.team23.mainPr.Domain.Member.Dto.Request.FindPasswordDto;
import com.team23.mainPr.Domain.Member.Dto.Request.UpdateMemberDto;
import com.team23.mainPr.Domain.Member.Dto.Response.MemberProfileDto;
import com.team23.mainPr.Domain.Member.Dto.Response.MemberResponseDto;
import com.team23.mainPr.Domain.Member.Service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.io.IOException;

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

    @Operation(summary = "회원 가입.", description = "데이터베이스에 회원 정보를 저장하고, 생성된 회원정보를 응답한다.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post")
    public MemberResponseDto createMember(@RequestBody @Valid CreateMemberDto dto) {
        return memberService.createMember(dto);
    }

    @GetMapping("/{memberId}")
    public MemberResponseDto getMember(@PathVariable @Valid @Min(value = 1) Integer memberId) {
        return memberService.getMember(memberId);
    }

    @GetMapping("profile/{memberId}")
    public MemberProfileDto getProfile(@PathVariable @Valid @Min(value = 1) Integer memberId) {
        return memberService.getProfile(memberId);
    }

    @DeleteMapping("/delete")
    public String deleteMember(@RequestParam @Valid @Min(value = 1) Integer memberId) {
        return memberService.deleteMember(memberId);
    }


    @PutMapping("profile/{memberId}")
    public MemberProfileDto updateProfile(@RequestBody @Valid UpdateMemberDto updateMemberDto,
                                          @PathVariable @Valid @Min(value = 1) Integer memberId) {
        return memberService.updateProfile(updateMemberDto, memberId);
    }

    @PostMapping("/post/checkExistEmail")
    public String checkExistEmail(@RequestParam String email) {
        return memberService.checkExistEmail(email);
    }


    @PostMapping("/post/checkExistId")
    public String checkExistId(@RequestParam String id) {
        return memberService.checkExistId(id);
    }


    @PostMapping("/post/findId")
    public String findId(@RequestBody @Valid FindIdDto findIdDto) {
        return memberService.findId(findIdDto);
    }


    @PostMapping("/post/findPassword")
    public String findId(@RequestBody @Valid FindPasswordDto findPasswordDto) {
        return memberService.findPassword(findPasswordDto);
    }

    @PostMapping("/profileImage/post")
    public String upload(@RequestParam MultipartFile file,
                         @RequestParam Integer memberId) throws IOException {
        return memberService.setProfilePicture(memberId, file);
    }

    @GetMapping(value = "/profileImage/get", produces = "image/png")
    public Resource getDefaultProfileImage(@RequestParam Integer memberId) throws IOException {
        return memberService.getProfilePicture(memberId);
    }
}
