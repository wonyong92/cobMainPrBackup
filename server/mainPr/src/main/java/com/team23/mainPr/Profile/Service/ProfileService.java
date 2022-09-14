package com.team23.mainPr.Profile.Service;

import com.team23.mainPr.Dto.CommonDto;
import com.team23.mainPr.Profile.Dto.ProfileUpdateDto;
import com.team23.mainPr.Profile.Entity.Profile;
import com.team23.mainPr.Profile.Mapper.ProfileMapper;
import com.team23.mainPr.Profile.Repository.ProfileRepository;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/*
 * refactor : 커스텀 예외 클래스 만들기
 */

@Service
@RequiredArgsConstructor
public class ProfileService {

    /*
     * description : 프로필 내용 조회
     * refactor : 커스텀 예외 클래스 생성으로 오류 상황에 대해서 친절한 응답 만들기
     * */

    private final ProfileRepository profileRepository;
    private final ProfileMapper profileMapper;

    public CommonDto getProfile(Integer postId) {

        CommonDto response = null;

        try {
            Profile profile = profileRepository.findById(postId).get();

            if(profile!=null)
                response = new CommonDto("true",profileMapper.ProfileToProfileResponse(profile));
            else
                response = new CommonDto("false",null);

            if(response == null)
                throw new Exception();

            return response;
        } catch (Exception e) {

            response = new CommonDto("Error",null);

            return response;
        }
    }//getProfile

    /*
     * description : 프로필 데이터 업데이트 , 프로필 식별자와 업데이트 내용이 들어있는 ProfileUpdateDto 를 가져와서 업데이트를 수행한다.
     * refactor : DB 조회 등 여러번 DB 접속이 발생 : 커스텀 에러 객체 사용 등 응답 분기점이 많이 나뉜다. 처리 필요
     * refactor : 영속성 컨텍스트를 사용하고 있다. 1차캐시에만 저장되어 있을 수 있다 이걸 어떻게 처리할 것 인가에 대한 코드 필요
     * ETC : else 문 줄이기
     *  ETC : 래퍼클래스 끼리 값 비교 - 내부캐시(-128~127)를 넘어서는 값은 논리에러 발생 가능. equals 쓰기
     *
     */

    public CommonDto updateProfile(Integer profileId, ProfileUpdateDto dto) {

        CommonDto response = null;

        try {
            Profile profile = profileRepository.findById(profileId).get();

            if(profile!=null)
            {
                profile.setNickname(dto.getNickname());
                profileRepository.flush();

                response = new CommonDto("true",profileMapper.ProfileToProfileResponse(profile));

                return response;
            }
            else
                response = new CommonDto("false",null);

            if(response == null)
                throw new Exception();

            return response;
        } catch (Exception e) {

            response = new CommonDto("Error",null);

            return response;
        }
    }//updateProfile
}
