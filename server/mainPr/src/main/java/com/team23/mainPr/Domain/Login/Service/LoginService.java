package com.team23.mainPr.Domain.Login.Service;

import com.team23.mainPr.Domain.Login.Dto.Request.DoLoginDto;
import com.team23.mainPr.Domain.Login.Entity.Login;
import com.team23.mainPr.Domain.Login.Repository.LoginRepository;
import com.team23.mainPr.Domain.Member.Repository.MemberRepository;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.DefaultTimeZone;
import com.team23.mainPr.Global.Jwt.Service.JwtBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.team23.mainPr.Global.CustomException.ErrorData.NOT_MATCHED_ID;
import static com.team23.mainPr.Global.CustomException.ErrorData.NOT_MATCHED_PASSWORD;
import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.FAIL;
import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.SUCCESS;

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

        memberRepository.findByLoginId(dto.getLoginId()).ifPresentOrElse(
                member -> {

                    if (!member.getPassword().equals(dto.getPassword()))
                        throw new CustomException(NOT_MATCHED_PASSWORD);

                    token[0] = jwtService.buildJwt(member);

                    loginRepository.findByMemberId(member.getMemberId()).ifPresentOrElse(
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
                            }
                    );
                },
                () -> {
                    throw new CustomException(NOT_MATCHED_ID);
                }
        );

        return token[0];
    }

    public String doLogout(String token) {

        final String[] result = new String[1];

        loginRepository.findByToken(token).ifPresentOrElse(
                login -> {
                    login.setLogouted(Boolean.TRUE);
                    login.setLogoutDate(defaultTimeZone.getNow());
                    loginRepository.flush();
                    result[0] = SUCCESS.getMsg();
                },
                () -> {
                    result[0] = FAIL.getMsg();
                }
        );

        return result[0];
    }

    public String refreshToken(String token) {

        final String[] newToken = new String[1];

        loginRepository.findByToken(token).ifPresent(
                login -> {
                    String createdToken = jwtBuilder.buildJwt(memberRepository.findById(login.getMemberId()).orElseThrow());
                    login.setToken(createdToken);
                    loginRepository.flush();
                    newToken[0] = createdToken;
                }
        );

        return newToken[0];
    }
}
