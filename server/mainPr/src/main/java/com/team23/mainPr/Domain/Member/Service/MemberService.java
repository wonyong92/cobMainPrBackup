package com.team23.mainPr.Domain.Member.Service;

import com.team23.mainPr.Domain.Comment.Repository.CommentRepository;
import com.team23.mainPr.Domain.Login.Repository.LoginRepository;
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
import com.team23.mainPr.Domain.RentPost.Dto.Response.RentPostResponseDto;
import com.team23.mainPr.Domain.RentPost.Mapper.RentPostMapper;
import com.team23.mainPr.Domain.RentPost.Repository.RentPostRepository;
import com.team23.mainPr.Global.CommonMethod.MemberIdExtractorFromJwt;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.CustomException.ErrorData;
import com.team23.mainPr.Global.DefaultTimeZone;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final DefaultTimeZone defaultTimeZone;
    private final PictureRepository pictureRepository;
    private final RentPostRepository rentPostRepository;
    private final RentPostMapper rentPostMapper;
    private final CommentRepository commentRepository;
    private final LoginRepository loginRepository;
    private final MemberIdExtractorFromJwt memberIdExtractorFromJwt;

    @Value("${multipart.upload.path}")
    String uploadPath;
    String homePath = System.getProperty("user.home");

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
    }

    public MemberResponseDto getMember(Integer memberId, String token) {
        Member member = memberRepository.getReferenceById(memberId);
        return memberMapper.MemberToMemberResponse(member);
    }

    //PR
    public void deleteMember(Integer memberId, String token) {
        loginRepository.findByMemberId(memberId).ifPresentOrElse(login -> {
            if (!login.getLogouted()) {
                loginRepository.delete(login);
            }
        }, () -> {
            throw new CustomException(ErrorData.NOT_EXIST_LOGIN_INFORMATION);
        });
        String fileName = pictureRepository.getReferenceById(
            memberRepository.getReferenceById(memberId).getProfileImageId()).getFileName();
        if (!fileName.equals("defaultProfileImage.png")) {
            if (new File(homePath + uploadPath + fileName).delete()) {
                throw new CustomException(ErrorData.INTERNAL_SERVER_ERROR);
            }
        }
        rentPostRepository.findByWriterId(memberId).forEach(rentPostRepository::delete);
        commentRepository.findByWriterId(memberId).forEach(commentRepository::delete);
        memberRepository.deleteById(memberId);
    }

    public MemberProfileDto getProfile(Integer memberId) {
        return memberMapper.MemberToMemberProfileDto(memberRepository.getReferenceById(memberId));
    }

    public MemberProfileDto updateProfile(UpdateMemberDto dto, String token) {

        Member member = memberRepository.getReferenceById(dto.getMemberId());
        //        if (!memberIdExtractorFromJwt.getMemberId(token).equals(member.getMemberId())) {
        //            throw new CustomException(ErrorData.NOT_ALLOWED_ACCESS_RESOURCE);
        //        }
        member.setNickname(dto.getNickname());
        memberRepository.flush();
        return memberMapper.MemberToMemberProfileDto(member);
    }

    /**
     * 사용 가능하면 TRUE, 불가능(중복 존재)하면 FALSE
     */
    public String checkExistEmail(String email) {
        final String[] result = new String[1];
        // optional 의 메소드를 활용하여 불필요한 if 문을 제거, null 에 대한 처리를 한번에 할 수 있었다.
        memberRepository.findByEmail(email).ifPresentOrElse(member -> result[0] = "exist",
            () -> result[0] = "not exist");
        return result[0];
    }

    public String checkExistId(String id) {
        final String[] result = new String[1];
        memberRepository.findByLoginId(id).ifPresentOrElse(member -> result[0] = "exist",
            () -> result[0] = "not exist");
        return result[0];
    }

    public String findId(FindIdDto dto) {
        final String[] result = new String[1];
        memberRepository.findByEmail(dto.getEmail()).ifPresent(member -> {
            if (member.getName().equals(dto.getName())) {
                result[0] = member.getLoginId();
            }
        });

        return result[0];
    }

    public String findPassword(FindPasswordDto dto) {
        final String[] result = new String[1];
        memberRepository.findByEmail(dto.getEmail()).ifPresent(member -> {
            if (member.getName().equals(dto.getName()) && member.getLoginId().equals(
                dto.getLoginId())) {
                result[0] = member.getPassword();
            }
        });

        return result[0];
    }

    public void setProfilePicture(Integer memberId, MultipartFile file, String token) throws IOException {

        Member member = memberRepository.getReferenceById(memberId);

        if (!file.isEmpty()) {
            String uuid = UUID.randomUUID().toString();
            File newFileName = new File(
                homePath + uploadPath + uuid + "_" + file.getOriginalFilename());
            file.transferTo(newFileName);

            member.setProfileImageId(pictureRepository.save(
                new Picture(uuid + "_" + file.getOriginalFilename())).getImageId());
            memberRepository.flush();
        }
    }

    public Resource getProfilePicture(Integer memberId) throws IOException {

        String filename = pictureRepository.getReferenceById(
            memberRepository.getReferenceById(memberId).getProfileImageId()).getFileName();
        Path path = Paths.get(homePath + uploadPath + filename);

        return new InputStreamResource(Files.newInputStream(path));
    }
    //PR

    /**
     * <p>
     * 프론트 기능 구현 진행 후 토큰만 헤더에서 입력 받아 자동으로 memberId를 추출하여 수행하도록 구현 예정
     * </p>
     */
    public List<RentPostResponseDto> getRentPostMember(Integer memberId) {
        return rentPostRepository.findByWriterIdOrderByRentPostIdDesc(memberId).stream().map(
            rentPostMapper::RentPostToRentPostResponseDto).collect(Collectors.toList());
    }

    public Boolean checkInter(Integer memberId) {
        return Boolean.TRUE;
    }

    public String checkNickname(String nickname) {
        final String[] result = new String[1];
        memberRepository.findByNickname(nickname).ifPresentOrElse(member -> result[0] = "exist",
            () -> result[0] = "not exist");
        return result[0];
    }
}
