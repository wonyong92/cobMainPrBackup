package com.team23.mainPr.Domain.Member.Service;

import com.team23.mainPr.Domain.Member.Dto.Request.CreateMemberDto;
import com.team23.mainPr.Domain.Member.Dto.Request.FindIdDto;
import com.team23.mainPr.Domain.Member.Dto.Request.FindPasswordDto;
import com.team23.mainPr.Domain.Member.Dto.Request.UpdateMemberDto;
import com.team23.mainPr.Domain.Member.Dto.Response.MemberProfileDto;
import com.team23.mainPr.Domain.Member.Dto.Response.MemberResponseDto;
import com.team23.mainPr.Domain.Member.Entity.Member;
import com.team23.mainPr.Domain.Member.Mapper.MemberMapper;
import com.team23.mainPr.Domain.Member.Repository.MemberRepository;
import com.team23.mainPr.Domain.Picture.Entity.Picture;
import com.team23.mainPr.Domain.Picture.Repository.PictureRepository;
import com.team23.mainPr.Global.DefaultTimeZone;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.SUCCESS;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final DefaultTimeZone defaultTimeZone;
    private final PictureRepository pictureRepository;
    @Value("${multipart.upload.path}")
    String uploadPath;

    /**
     * <pre>
     * 트랜젝션 적용 필요
     * 생성 후 확인 과정에서 어떤 필드 하나라도 null 이면 실패 및 롤백 필요
     * 캐시, 샤딩 적용하면 저장하는 방법이 복잡해질듯 - 캐싱 전략은 추후에 공부하여 적용
     * rdbms 쓸때 처럼 auto increment 적용 안되나?(제대로 유니크 하지도 않고 불필요한 DB 엑세스, 데이터 양이 많아지면 느려진다)
     * 생성후 find 하면 DB가 아니라 1차 캐쉬에서 가져오는 것 아닌가? entityManager 에서 detach 시켜야 제대로 테스트가 될것 같다.
     * ->JpaRepository 이용시 내부에서 엔티티 매니저?를 생성해서 트랜잭션을 설정 및 수행 -> 완료후 1차 캐시 파기
     * -> detach 필요 없이 새로운 트랜잭션으로 find 실행 되므로 문제없이 실행결과 확인 할 수 있다.
     */

    public MemberResponseDto createMember(CreateMemberDto dto) {
        Member member = memberMapper.CreateMemberDtoToMember(dto);

        return memberMapper.MemberToMemberResponse(memberRepository.save(member));
    }//createMember

    public MemberResponseDto getMember(Integer memberId) {

        Member member = memberRepository.getReferenceById(memberId);
        return memberMapper.MemberToMemberResponse(member);
    }

    /**
     * <pre>
     * Todo : 연관될 리소스 - 게시글, 댓글, 프로필, 좋아요 도 함꼐 삭제되도록 구성하여야 한다 - cascade 사용 예정
     * delete 수행시 영속성 컨텍스트의 1차 캐시에서도 삭제(detach)된다. - entityManager.detach(member) 로 테스트 완료
     * </pre>
     */

    public String deleteMember(Integer memberId) {
        memberRepository.deleteById(memberId);

        return SUCCESS.getMsg();
    }

    public MemberProfileDto getProfile(Integer memberId) {
        return memberMapper.MemberToMemberProfileDto(memberRepository.getReferenceById(memberId));
    }

    public MemberProfileDto updateProfile(UpdateMemberDto dto, Integer memberId) {

        Member member = memberRepository.getReferenceById(memberId);
        member.setNickname(dto.getNickname());

        memberRepository.flush();

        return memberMapper.MemberToMemberProfileDto(member);
    }

    /**
     * 사용 가능하면 TRUE, 불가능(중복 존재)하면 FALSE
     */
    public String checkExistEmail(String email) {

        final String[] result = new String[1];
        //optional 의 메소드를 활용하여 불필요한 if 문을 제거, null 에 대한 처리를 한번에 할 수 있었다.
        memberRepository.findByEmail(email).ifPresentOrElse(
                member -> {
                    result[0] = "exist";
                },
                () -> {
                    result[0] = "not exist";
                }
        );

        return result[0];
    }

    public String checkExistId(String id) {
        final String[] result = new String[1];
        memberRepository.findByLoginId(id).ifPresentOrElse(
                member -> {
                    result[0] = "exist";
                },
                () -> {
                    result[0] = "not exist";
                }
        );

        return result[0];
    }

    public String findId(FindIdDto dto) {
        final String[] result = new String[1];
        memberRepository.findByEmail(dto.getEmail()).ifPresent(
                member -> {
                    if (member.getName().equals(dto.getName()))
                        result[0] = member.getLoginId();
                }
        );

        return result[0];
    }

    public String findPassword(FindPasswordDto dto) {
        final String[] result = new String[1];
        memberRepository.findByEmail(dto.getEmail()).ifPresent(
                member -> {
                    if (member.getName().equals(dto.getName()) && member.getLoginId().equals(member.getLoginId()))
                        result[0] = member.getPassword();
                }
        );

        return result[0];
    }

    public String setProfilePicture(Integer memberId, MultipartFile file) throws IOException {

        Member member = memberRepository.getReferenceById(memberId);

        if (!file.isEmpty()) {
            String uuid = UUID.randomUUID().toString();
            File newFileName = new File(System.getProperty("user.home") + uploadPath + "/" + uuid + "_" + file.getOriginalFilename());
            file.transferTo(newFileName);

            member.setProfileImageId(pictureRepository.save(new Picture(uuid + "_" + file.getOriginalFilename())).getImageId());
            memberRepository.flush();
        }

        return SUCCESS.getMsg();
    }

    public Resource getProfilePicture(Integer memberId) throws IOException {

        String filename = pictureRepository.getReferenceById(memberRepository.getReferenceById(memberId).getProfileImageId()).getFileName();
        Path path = Paths.get(System.getProperty("user.home") + uploadPath + "/" + filename);

        return new InputStreamResource(Files.newInputStream(path));
    }
}
