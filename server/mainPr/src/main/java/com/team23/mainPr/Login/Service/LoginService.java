package com.team23.mainPr.Login.Service;

import com.team23.mainPr.Dto.CommonDto;
import com.team23.mainPr.Jwt.Service.JwtService;
import com.team23.mainPr.Login.Dto.DoLoginDto;
import com.team23.mainPr.Member.Entity.Member;
import com.team23.mainPr.Member.Mapper.MemberMapper;
import com.team23.mainPr.Member.Repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    public CommonDto doLogin(DoLoginDto dto) {

        CommonDto response = null;

        try {
            Member member = memberRepository.findByLoginId(dto.getLoginId());

            if (member != null) {
                if (member.getPassword().equals(dto.getPassword())) {

                    String token = "empty";
                    token = jwtService.buildJwt(member);

                    response = new CommonDto(token, memberMapper.MemberToMemberResponse(member));
                    return response;
                }

                response = new CommonDto("not matched password", null);
                return response;
            }

            response = new CommonDto("not matched loginId", null);
            return response;

        } catch (Exception e) {
            response = new CommonDto("Error", null);
            return response;
        }
    }
}
