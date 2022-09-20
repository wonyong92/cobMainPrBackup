package com.team23.mainPr.Domain.Member.Controller;


import com.team23.mainPr.Domain.Member.Dto.Request.CreateMemberDto;
import com.team23.mainPr.Domain.Member.Dto.Request.FindIdDto;
import com.team23.mainPr.Domain.Member.Dto.Request.FindPasswordDto;
import com.team23.mainPr.Domain.Member.Dto.Request.UpdateMemberDto;
import com.team23.mainPr.Domain.Member.Dto.Response.MemberProfileDto;
import com.team23.mainPr.Domain.Member.Dto.Response.MemberResponseDto;
import com.team23.mainPr.Domain.Member.Service.MemberService;
import com.team23.mainPr.Domain.Picture.Service.PictureService;
import com.team23.mainPr.Global.Dto.ChildCommonDto;
import com.team23.mainPr.Global.Dto.ParentCommonDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.io.IOException;

import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.*;

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

    /**
     * <pre>
     * ETC : 모델 어트리뷰트 vs 리퀘스트 바디
     * ETC : 스프링 validation
     * description : 회원 가입에 연관된 기능이니까 register의 하위 리소스? 컨트롤러?로 네이밍
     * refactor : 공통 응답 dto를 만들까? - 수행결과 메세지(String) + 개별 응답 dto(Object? 인터페이스 하나 만들어서 제네릭으로 타입세이프?) - mapstruct 이용해서?
     * refactor : 500 에러 핸들링을 위해서 throws ClassCastException 추가
     * </pre>
     */

    /*
     * refactor : 비밀번호 같은 민감 정보를 전송해도 될까? - response Dto를 만들어서 암호화 할까?
     */
    @Operation(summary = "회원 가입.", description = "데이터베이스에 회원 정보를 저장하고, 생성된 회원정보를 응답한다.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post")
    public MemberResponseDto createMember(@RequestBody @Valid CreateMemberDto dto) {
        return memberService.createMember(dto);
    }

    /*
     * refactor : 현재는 전혀 암호화나, 마스킹 또는 맵퍼를 이용해서 리소스 중에 민감 정보를 거르지 않고 응답하고 있다. 프론트-서버 사이에 보안을 믿으면 되는 것일까?
     * refactor : 멘토님 리뷰: 지금 서비스 레이어에서 바로 엔티티를 리턴받아오고 있다. 엔티티는 영속성 컨텍스트에 의해 관리되고 있는 객체로, 영속성 컨텍스트를 이용하거나 해당 부분에 대해
     * 프로그램 구조가 변경된다면? 모든 부분이 바뀌어야 한다. - 개별적인 dto를 사용한다면 재사용성이나, 가독성 부분에서 편리하지만 시간 소모가 크다 - 어느정도 공통 dto를 구성하여 효율적으로 응답하기
     * Todo : 서비스 레이어 응답을 어떻게 바꾸어야 계층간 느스한 결합, 재사용성이 좋게 구현할수 있을까 고민하기!
     */

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

    @GetMapping(value = "/profileImage/get",produces = "image/png" )
    public Resource getDefaultProfileImage(@RequestParam Integer memberId) throws IOException {

        return memberService.getProfilePicture(memberId);
    }
}
