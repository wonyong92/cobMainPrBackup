package com.team23.mainPr.Domain.Member.Dto.Request;

import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/** swagger 이슈 - private 일때 제대로 인식이 안되는 경우 발생, public으로 사용시 제대로 스웨거 동작 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@ApiModel(value = "CreateMemberDto", description = "입력 받은 회원 가입 정보를 dto로 맵핑")
public class CreateMemberDto {

	@NotNull(message = "loginId must not be null")
	private String loginId;

	@NotNull(message = "password must not be null")
	private String password;

	@NotNull(message = "nickname must not be null")
	private String nickname;

	@NotNull(message = "email must not be null")
	private String email;

	private Integer profileImageId = 1;

	@NotNull(message = "name must not be null")
	private String name;
}
