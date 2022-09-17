package com.team23.mainPr.Login.Service;

import com.team23.mainPr.Dto.ChildCommonDto;
import com.team23.mainPr.Jwt.Service.JwtBuilder;
import com.team23.mainPr.Login.Dto.CreateLoginDto;
import com.team23.mainPr.Login.Entity.Login;
import com.team23.mainPr.Login.Mapper.LoginMapper;
import com.team23.mainPr.Login.Repository.LoginRepository;
import com.team23.mainPr.Member.Entity.Member;
import com.team23.mainPr.Member.Mapper.MemberMapper;
import com.team23.mainPr.Member.Repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import static com.team23.mainPr.Enum.ChildCommonDtoMsgList.*;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final JwtBuilder jwtService;
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final LoginRepository loginRepository;
    private final LoginMapper loginMapper;
    public ChildCommonDto doLogin(CreateLoginDto dto) {

        try {
            Member member = memberRepository.findByLoginId(dto.getLoginId());

            if (member != null) {
                if (member.getPassword().equals(dto.getPassword())) {

                    String token = jwtService.buildJwt(member);
                    dto.setToken(token);
                    dto.setMemberId(member.getMemberId());
                    Login login  = loginMapper.createMap(dto);
                    loginRepository.save(login);
                    return new ChildCommonDto(token, HttpStatus.OK, memberMapper.MemberToMemberResponse(member));
                }

                return new ChildCommonDto(NOT_MATCH_ID.getMsg(), HttpStatus.BAD_REQUEST, null);
            }

            return new ChildCommonDto(NOT_MATCH_PASSWORD.getMsg(), HttpStatus.BAD_REQUEST, null);

        } catch (Exception e) {

            return new ChildCommonDto(ERROR.getMsg(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
}
