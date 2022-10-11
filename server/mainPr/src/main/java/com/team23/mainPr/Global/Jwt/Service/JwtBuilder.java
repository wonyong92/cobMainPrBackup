package com.team23.mainPr.Global.Jwt.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.team23.mainPr.Domain.Member.Entity.Member;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * <pre>
 * Dologin 의 서브 기능 : 로그인 결과 값을 이용하여 토큰을 생성한다.
 * 암호화키가 공개되어있고, 만료시간이 길어 테스트용으로만 사용해야 한다. - gitignore + env.properties 파일을 이용해서 암호화키를 숨기고, 리프레시 토큰 기능을 적용해야한다.
 * jwt 라이브러리는 다양한 회사에서 제공되고 있다. 사용하는 라이브러리에 따라 생성하는 코드가 달라진다. -  auth0의 jwt 사용 중
 * </pre>
 */

@Component
public class JwtBuilder {

    @Value("${jwt.token.secret-key}") String key;

    public String buildJwt(Member member) {
        return "Bearer " + JWT.create().withSubject("JWT").withExpiresAt(new Date(System.currentTimeMillis() + (1000*60*30)))
            .withClaim("memberId", member.getMemberId())
            .withClaim("loginId",member.getLoginId())
            .withClaim("nickname",member.getNickname())
            .withClaim("name",member.getName())
            .withClaim("email",member.getEmail())
            .withClaim("profileImageId",member.getProfileImageId())
            .withClaim("createdAt",member.getCreatedAt().toString())
            .withIssuer("auth0")
            .sign(Algorithm.HMAC512(key));
    }
}
