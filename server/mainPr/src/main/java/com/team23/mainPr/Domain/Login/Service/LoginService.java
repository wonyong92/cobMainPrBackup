package com.team23.mainPr.Domain.Login.Service;

import static com.team23.mainPr.Global.CustomException.ErrorData.*;
import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.*;

import org.springframework.stereotype.Service;

import com.team23.mainPr.Domain.Login.Dto.Request.DoLoginDto;
import com.team23.mainPr.Domain.Login.Entity.Login;
import com.team23.mainPr.Domain.Login.Repository.LoginRepository;
import com.team23.mainPr.Domain.Member.Repository.MemberRepository;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.DefaultTimeZone;
import com.team23.mainPr.Global.Jwt.Service.JwtBuilder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {

	private final JwtBuilder jwtService;
	private final MemberRepository memberRepository;
	private final LoginRepository loginRepository;
	private final DefaultTimeZone defaultTimeZone;
	private final JwtBuilder jwtBuilder;

	public String doLogin(DoLoginDto dto) {

		final String[] token = new String[1];

		memberRepository
			.findByLoginId(dto.getLoginId())
			.ifPresentOrElse(
				member -> {
					if (!member.getPassword().equals(dto.getPassword()))
						throw new CustomException(NOT_MATCHED_PASSWORD);

					token[0] = jwtService.buildJwt(member);

					loginRepository
						.findByMemberId(member.getMemberId())
						.ifPresentOrElse(
							existLogin -> {
								existLogin.setLogouted(false);
								existLogin.setToken(token[0]);
								existLogin.setLogoutDate(null);
								existLogin.setLastLoginDate(defaultTimeZone.getNow());
								loginRepository.flush();
							},
							() -> {
								Login login = new Login();
								login.setLastLoginDate(defaultTimeZone.getNow());
								login.setToken(token[0]);
								login.setLogouted(false);
								login.setMemberId(member.getMemberId());
								login.setLogoutDate(null);
								loginRepository.save(login);
							});
				},
				() -> {
					throw new CustomException(NOT_MATCHED_ID);
				});
		// 단순히 토큰만 응답하도록 변경 - 이전에는 유저 정보까지 보냈는데 그게 아니라 토큰을 해석하는 api를 호출 하면 유저 정보를 확인 가능하므로 프론트에서 요청을 다시
		// 보내는 방식으로 서비스가 구현되어야 한다.
		return token[0];
	}

	public String doLogout(String token) {

		final String[] result = new String[1];

		loginRepository
			.findByToken(token)
			.ifPresentOrElse(
				login -> {
					login.setLogouted(Boolean.TRUE);
					login.setLogoutDate(defaultTimeZone.getNow());
					loginRepository.flush();
					result[0] = SUCCESS.getMsg();
				},
				() -> {
					// 불필요하게 너무 많은 유스케이스를 생각하지 말고, 응답은 최대한 간결하게 구성하도록 하였다. api 에서 작동이 실패하였을 때 메세지가 자세하면
					// 좋지만 너무 자세하게 처리하는 것은 비효율적이다.
					result[0] = FAIL.getMsg();
				});

		return result[0];
	}

	public String refreshToken(String token) {

		final String[] newToken = new String[1];

		loginRepository
			.findByToken(token)
			.ifPresent(
				login -> {
					String createdToken =
						jwtBuilder.buildJwt(memberRepository.findById(login.getMemberId()).orElseThrow());
					login.setToken(createdToken);
					loginRepository.flush();
					newToken[0] = createdToken;
				});
		// 이전 코드 : 로그인 정보를 찾지 못한다 -> if 문으로 감지하고, 에러 메세지 만들어 응답 ==> 수정 코드 : 그냥 없으면 비워서 보낸다. 정상적인 로그인 정보가
		// 없으므로 토큰이 생성되지 않는 것이 정상 응답이다. 나머지는 프론트가 처리해야한다
		return newToken[0];
	}
}
