package com.team23.mainPr.Domain.Member.Dto.Request;

import io.swagger.annotations.ApiModel;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * swagger 이슈 - private 일때 제대로 인식이 안되는 경우 발생, public으로 사용시 제대로 스웨거 동작
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@ApiModel(value = "CreateMemberDto", description = "입력 받은 회원 가입 정보를 dto로 맵핑")
public class CreateMemberDto {

    @NotNull(message = "로그인 아이디 정보가 누락되었습니다.(loginId)") private String loginId;

    @NotNull(message = "패스워드 정보가 누락되었습니다.(password)") private String password;

    @NotNull(message = "닉네임 정보가 누락되었습니다.(nickname)") private String nickname;

    @NotNull(message = "이메일 정보가 누락되었습니다.(email)") private String email;

    @NotNull(message = "이름 정보가 누락되었습니다.(name)") private String name;
}
