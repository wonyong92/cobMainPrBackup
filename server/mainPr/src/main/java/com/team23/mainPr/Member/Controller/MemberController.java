package com.team23.mainPr.Member.Controller;

import com.team23.mainPr.Dto.ChildCommonDto;
import com.team23.mainPr.Member.Dto.CreateMemberDto;
import com.team23.mainPr.Member.Service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**<pre>
 * expected feature
 * create user data
 * create user profile by auto
 * delete user data
 * user data validation check
 *
 * 현재 리턴문에 대해 같은 코드가 중복되고 있다 - 이후에 기능 구현이 상세해지면 분기가 달라질 가능성이 있어서 남겨두고
 * 만약 분기가 나누어 지지 않는다면 하나의 static 메소드로 만들어서 response에 들어갈 객체만 제네릭을 이용해서 처리 가능하게 만들기 -> 서비스에서 모두 처리하도록 리팩토링 완료
 * </pre>
 * */

@Controller
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /*
     * ETC : 모델 어트리뷰트 vs 리퀘스트 바디
     * ETC : 스프링 validation
     * description : 회원 가입에 연관된 기능이니까 register의 하위 리소스? 컨트롤러?로 네이밍
     * refactor : 공통 응답 dto를 만들까? - 수행결과 메세지(String) + 개별 응답 dto(Object? 인터페이스 하나 만들어서 제네릭으로 타입세이프?) - mapstruct 이용해서?
     * refactor : 500 에러 핸들링을 위해서 throws ClassCastException 추가
     *
     */

    @Operation(summary = "회원 가입 정보 유효성 검사.(이후에 중복 검사와 결합 예정)", description = "회원 가입을 위해 입력 받은 정보를 정규식을 이용하여 검증.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "유효한 입력."),
            @ApiResponse(responseCode = "400", description = "잘못된 입력.")})
    @PostMapping("/register/check-input")
    public ResponseEntity<ChildCommonDto> checkInput(@RequestBody @Parameter(name = "CreateMemberDto", description = "입력한 회원 정보.", required = true) CreateMemberDto dto) throws RuntimeException {

        ChildCommonDto response = memberService.loginValidation(dto);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }//validation

    /*
     * refactor : 비밀번호 같은 민감 정보를 전송해도 될까? - response Dto를 만들어서 암호화 할까?
     */

    @Operation(summary = "회원 가입.", description = "데이터베이스에 회원 정보를 저장하고, 생성된 회원정보를 응답한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 가입 성공."),
            @ApiResponse(responseCode = "400", description = "잘못된 입력."),
            @ApiResponse(responseCode = "500", description = "서버 내부 에러")})
    @PostMapping("/register")
    public ResponseEntity<ChildCommonDto> createMember(@RequestBody @Parameter(name = "CreateMemberDto", description = "입력한 회원 정보.", required = true) CreateMemberDto dto) {

        ChildCommonDto response = memberService.createMember(dto);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }//createMember

    /*
     * refactor : 현재는 전혀 암호화나, 마스킹 또는 맵퍼를 이용해서 리소스 중에 민감 정보를 거르지 않고 응답하고 있다. 프론트-서버 사이에 보안을 믿으면 되는 것일까?
     * refactor : 멘토님 리뷰: 지금 서비스 레이어에서 바로 엔티티를 리턴받아오고 있다. 엔티티는 영속성 컨텍스트에 의해 관리되고 있는 객체로, 영속성 컨텍스트를 이용하거나 해당 부분에 대해
     * 프로그램 구조가 변경된다면? 모든 부분이 바뀌어야 한다. - 개별적인 dto를 사용한다면 재사용성이나, 가독성 부분에서 편리하지만 시간 소모가 크다 - 어느정도 공통 dto를 구성하여 효율적으로 응답하기
     * Todo : 서비스 레이어 응답을 어떻게 바꾸어야 계층간 느스한 결합, 재사용성이 좋게 구현할수 있을까 고민하기!
     */

    @Operation(summary = "회원 정보 확인.", description = "데이터베이스에서 회원 정보를 찾아 응답한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공."),
            @ApiResponse(responseCode = "400", description = "잘못된 입력 혹은 존재하지 않는 회원 식별 번호."),
            @ApiResponse(responseCode = "500", description = "서버 내부 에러 혹은 존재하지 않는 회원 식별 번호.")})
    @GetMapping("/{memberId}")
    public ResponseEntity<ChildCommonDto> getMember(@PathVariable @Parameter(name = "memberId", description = "회원 식별 번호.", required = true) Integer memberId) {

        ChildCommonDto response = memberService.getMember(memberId);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }//createMember

    @Operation(summary = "회원 정보 삭제(이후 회원탈퇴 기능으로 전환 예정).", description = "데이터베이스에서 회원 정보를 찾아 삭제 후 성공여부를 응답한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공."),
            @ApiResponse(responseCode = "400", description = "잘못된 입력 혹은 존재하지 않는 회원 식별 번호."),
            @ApiResponse(responseCode = "500", description = "서버 내부 에러 혹은 존재하지 않는 회원 식별 번호.")})
    @DeleteMapping("/delete")
    public ResponseEntity<ChildCommonDto> deleteMember(@RequestParam @Parameter(name = "memberId", description = "회원 식별 번호.", required = true) Integer memberId) {

        ChildCommonDto response = memberService.deleteMember(memberId);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }//deleteMember
}
