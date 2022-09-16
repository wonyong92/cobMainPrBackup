package com.team23.mainPr.Login.Service;

import com.team23.mainPr.Dto.ChildCommonDto;
import com.team23.mainPr.Jwt.Service.JwtBuilder;
import com.team23.mainPr.Login.Dto.DoLoginDto;
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

    public ChildCommonDto doLogin(DoLoginDto dto) {

        try {
            Member member = memberRepository.findByLoginId(dto.getLoginId());

            if (member != null) {
                if (member.getPassword().equals(dto.getPassword())) {

                    String token = jwtService.buildJwt(member);

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
