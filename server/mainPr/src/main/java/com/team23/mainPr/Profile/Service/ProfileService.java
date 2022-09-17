package com.team23.mainPr.Profile.Service;

import com.team23.mainPr.DefaultTimeZone;
import com.team23.mainPr.Dto.ChildCommonDto;
import com.team23.mainPr.Profile.Dto.UpdateProfileDto;
import com.team23.mainPr.Profile.Entity.Profile;
import com.team23.mainPr.Profile.Mapper.ProfileMapper;
import com.team23.mainPr.Profile.Repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import static com.team23.mainPr.Enum.ChildCommonDtoMsgList.*;

@Service
@RequiredArgsConstructor
public class ProfileService {

    /**<pre>
     * 프로필 내용 조회
     * 커스텀 예외 클래스 생성으로 오류 상황에 대해서 친절한 응답 만들기
     * </pre>
     * */

    private final ProfileRepository profileRepository;
    private final ProfileMapper profileMapper;
    private final DefaultTimeZone defaultTimeZone;

    public ChildCommonDto getProfile(Integer postId) {


        try {
            Profile profile = profileRepository.findById(postId).orElse(null);

            if (profile != null)
                return new ChildCommonDto(TRUE.getMsg(), HttpStatus.OK, profileMapper.ProfileToProfileResponse(profile));
            else
                return new ChildCommonDto(FALSE.getMsg(), HttpStatus.BAD_REQUEST, null);

        } catch (Exception e) {

            return new ChildCommonDto(ERROR.getMsg(), HttpStatus.INTERNAL_SERVER_ERROR, null);

        }
    }//getProfile

    /**<pre>
     * 프로필 데이터 업데이트 , 프로필 식별자와 업데이트 내용이 들어있는 ProfileUpdateDto 를 가져와서 업데이트를 수행한다.
     * DB 조회 등 여러번 DB 접속이 발생 : 커스텀 에러 객체 사용 등 응답 분기점이 많이 나뉜다. 처리 필요
     * 영속성 컨텍스트를 사용하고 있다. 1차캐시에만 저장되어 있을 수 있다 이걸 어떻게 처리할 것 인가에 대한 코드 필요
     * else 문 줄이기
     * 래퍼클래스 끼리 값 비교 - 내부캐시(-128~127)를 넘어서는 값은 논리에러 발생 가능. equals 쓰기
     * </pre>
     */

    public ChildCommonDto updateProfile(Integer profileId, UpdateProfileDto dto) {


        try {
            Profile profile = profileRepository.findById(profileId).orElse(null);

            if (profile != null) {
                profile.setNickname(dto.getNickname());
                profileRepository.flush();

                return new ChildCommonDto(TRUE.getMsg(), HttpStatus.OK, profileMapper.ProfileToProfileResponse(profile));

            } else
                return new ChildCommonDto(FALSE.getMsg(), HttpStatus.BAD_REQUEST, null);

        } catch (Exception e) {

            return new ChildCommonDto(ERROR.getMsg(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }//updateProfile
}
