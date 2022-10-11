package com.team23.mainPr.Domain.Login.Service;

import static com.team23.mainPr.Global.CustomException.ErrorData.NOT_EXIST_LOGIN_INFORMATION;
import static com.team23.mainPr.Global.CustomException.ErrorData.NOT_MATCHED_ID;
import static com.team23.mainPr.Global.CustomException.ErrorData.NOT_MATCHED_PASSWORD;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.team23.mainPr.Domain.Login.Dto.Request.DoLoginDto;
import com.team23.mainPr.Domain.Login.Entity.Login;
import com.team23.mainPr.Domain.Login.Repository.LoginRepository;
import com.team23.mainPr.Domain.Member.Entity.Member;
import com.team23.mainPr.Domain.Member.Repository.MemberRepository;
import com.team23.mainPr.Global.CommonMethod.MemberIdExtractorFromJwt;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.DefaultTimeZone;
import com.team23.mainPr.Global.Jwt.Service.JwtBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {

    private final JwtBuilder jwtService;
    private final MemberRepository memberRepository;
    private final LoginRepository loginRepository;
    private final DefaultTimeZone defaultTimeZone;
    private final JwtBuilder jwtBuilder;
    private final MemberIdExtractorFromJwt memberIdExtractorFromJwt;

    public String[] doLogin(DoLoginDto dto) {
        final String[] token = new String[1];
        final Member[] loginMember = new Member[1];
        memberRepository.findByLoginId(dto.getLoginId()).ifPresentOrElse(findmember -> loginMember[0] = findmember, () -> {
            throw new CustomException(NOT_MATCHED_ID);
        });
        loginRepository.findByMemberId(loginMember[0].getMemberId()).ifPresentOrElse(login -> memberRepository.findById(login.getMemberId()).ifPresent(member -> {
            if (member.getPassword().equals(dto.getPassword())) {
                token[0] = jwtService.buildJwt(member);
                login.setToken(token[0]);
                login.setLogouted(false);
                login.setLogoutDate(null);
                loginRepository.flush();
            } else {
                throw new CustomException(NOT_MATCHED_PASSWORD);
            }
        }), () -> memberRepository.findByLoginId(dto.getLoginId()).ifPresentOrElse(member -> {
            if (member.getPassword().equals(dto.getPassword())) {
                token[0] = jwtService.buildJwt(member);
                loginRepository.save(Login.builder().lastLoginDate(defaultTimeZone.getNow()).logoutDate(null).token(token[0]).logouted(false).memberId(member.getMemberId()).build());
            } else {
                throw new CustomException(NOT_MATCHED_PASSWORD);
            }
        }, () -> {
            throw new CustomException(NOT_MATCHED_ID);
        }));

        return token;
    }

    public void doLogout(String token) {
        loginRepository.findByToken(token).ifPresentOrElse(login -> {
            login.setLogouted(Boolean.TRUE);
            login.setLogoutDate(defaultTimeZone.getNow());
            loginRepository.flush();
        }, () -> {
            throw new CustomException(NOT_EXIST_LOGIN_INFORMATION);
        });
    }

    public String refreshToken(String token) {

        final String[] newToken = new String[1];

        loginRepository.findByMemberId(memberIdExtractorFromJwt.getMemberId(token)).ifPresent(login -> {
            if(!login.getLogouted())
            {
                String createdToken = jwtBuilder.buildJwt(memberRepository.getReferenceById(login.getMemberId()));
                login.setToken(createdToken);
                loginRepository.flush();
                newToken[0] = createdToken;
            }
        });

        return newToken[0];
    }
}
