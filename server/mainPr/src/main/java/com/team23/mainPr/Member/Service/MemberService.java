package com.team23.mainPr.Member.Service;

import com.team23.mainPr.CustomException.CustomException;
import com.team23.mainPr.CustomException.Errordata;
import com.team23.mainPr.Dto.CommonDto;
import com.team23.mainPr.Member.Dto.CreateMemberDto;
import com.team23.mainPr.Member.Dto.MemberResponse;
import com.team23.mainPr.Member.Entity.Member;
import com.team23.mainPr.Member.Mapper.MemberMapper;
import com.team23.mainPr.Member.Repository.MemberRepository;
import com.team23.mainPr.Profile.Entity.Profile;
import com.team23.mainPr.Profile.Repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final ProfileRepository profileRepository;
    private final MemberMapper memberMapper;

    /*
     * refactor : spring validation 적용시 서비스 삭제 가능 할듯
     * refactor : 컨트롤러 단으로 예외 위임 하기전에 , 서비스 단에서 발생하는 예외는 처리가 안되니까 조건문에서 확실히 걸러줘야한다
     * dto.getLoginId()==null 와 같이 가장 발생확률이 높은 null 에러에 대해서 처리가 필요
     * -> 그냥 dto 만들때 초기화 하면 되지 않나? 왜 굳이 더 힘든 방법을 쓴거지?
     * refactor : 중복 확인 기능과 결합 될 예정
     */

    public CommonDto loginValidation(CreateMemberDto dto) throws RuntimeException {


            String idPattern = "^[a-zA-Z][\\w]{4,20}@{1,1}[\\w]{2,10}(\\.com|\\.net)$";
            String passworedPattern = "^([@!#%&]{0,}[\\w]{0,}[@!#%&]{0,}){1,}$";
            String nickPattern = "^[\\w가-힣]{2,30}$";

            if (!Pattern.matches(idPattern, dto.getLoginId()))
                throw new CustomException(Errordata.INVALID_REGISTER_MEMBER_ID);

            if(!Pattern.matches(passworedPattern, dto.getPassword()))
                throw new CustomException(Errordata.INVALID_REGISTER_MEMBER_PASSWORD);

            if(!(dto.getPassword().length() <= 20&& dto.getPassword().length() >= 6))
                throw new CustomException(Errordata.INVALID_REGISTER_MEMBER_PASSWORD);

            if(!Pattern.matches(nickPattern, dto.getNickname()))
                throw new CustomException(Errordata.INVALID_REGISTER_MEMBER_NICKNAME);

            CommonDto response = new CommonDto();
            response.setMsg("true");

            return response;
    }

    /*
    * refactor : 트랜젝션 적용
    * refactor : 생성 후 확인 과정에서 어떤 필드 하나라도 null 이면 실패 및 롤백 필요
    * refactor : 캐시, 샤딩 적용하면 저장하는 방법이 복잡해질듯 - 캐싱 전략은 추후에 공부하여 적용
    * ETC : rdbms 쓸때 처럼 auto increment 적용 안되나?
    */

    public CommonDto createMember(CreateMemberDto dto) throws NullPointerException{

        try {
            String LoginId = dto.getLoginId();
            String password = dto.getPassword();
            String Nickname = dto.getNickname();
            Member member = new Member();
            member.setLoginId(LoginId);
            member.setPassword(password);
            member.setNickname(Nickname);

            memberRepository.save(member);

            Member result = memberRepository.findById(member.getId()).orElseThrow();

            Profile profile = new Profile();
            profile.setNickname(member.getNickname());
            profileRepository.save(profile);

            Profile Presult = profileRepository.findById(profile.getId()).orElseThrow();
            result.setProfileId(Presult.getId());

            CommonDto response = new CommonDto();
            response.setMsg("ture");
            response.SetDto(memberMapper.memberToMemberResponse(result));

            return response;
        } catch (Exception e) {
            return null;
        }
    }//createMember

    public CommonDto getMember(Integer memberId) {

        try {
            Member member = memberRepository.findById(memberId).orElseThrow();
            CommonDto response = new CommonDto("true",memberMapper.memberToMemberResponse(member));
            return response;
        } catch (Exception e) {
            return null;
        }
    }

    /*
    * Todo : 연관될 리소스 - 게시글, 댓글, 프로필, 좋아요 도 함꼐 삭제되도록 구성하여야 한다 - cascade 사용 예정
    * */
    
    public CommonDto deleteMember(Integer memberId) {

        CommonDto response = new CommonDto();

        try {
            Member member = memberRepository.findById(memberId).orElseThrow();
            memberRepository.delete(member);

            response.setMsg("true");

            return response;
        } catch (Exception e) {
            response.setMsg("false");

            return response;
        }
    }
}
