package com.team23.mainPr.mainPr.Profile.Controller;

import com.team23.mainPr.Dto.ChildCommonDto;
import com.team23.mainPr.Profile.Dto.UpdateProfileDto;
import com.team23.mainPr.Profile.Service.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**<pre>
 * 구현할 기능
 * 조회
 * 생성-삭제 : member 에서 수행 : 서비스 분리할때 문제 발생가능 : member 와 profile 을 합하는 건 어때?
 * 업데이트
 *
 * 서브 기능 : 프로필 이미지 업로드+수정, 다운로드
 *
 * 진행 상태, 결과를 모니터링 및 로깅
 * </pre>
 * */

@Controller
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @Operation(summary = "프로필 정보 조회.", description = "프로필 식별자 번호를 파라미터로 받아, 해당하는 프로필 정보 응답.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 가입 성공."),
            @ApiResponse(responseCode = "400", description = "잘못된 입력."),
            @ApiResponse(responseCode = "500", description = "서버 내부 에러")})
    @GetMapping("/{profileId}")
    public ResponseEntity<ChildCommonDto> getProfileData(@PathVariable @Parameter(name = "profileId", description = "프로필 식별 번호.", required = true) Integer profileId) {

        ChildCommonDto response = profileService.getProfile(profileId);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    /** <pre>
     * description : 프로필 데이터를 리퀘스트 바디로 받아와서 업데이트 수행, 프로필 식별자(유저 식별자와 동일한 번호)를 함께 입력받아야 한다
     * </pre>
     * */

    @Operation(summary = "프로필 정보 업데이트.", description = "프로필 식별자 번호, 수정된 프로필 정보를 요청으로 받아, 해당하는 프로필의 데이터를 수정.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 가입 성공."),
            @ApiResponse(responseCode = "400", description = "잘못된 입력."),
            @ApiResponse(responseCode = "500", description = "서버 내부 에러")})
    @PutMapping("/update")
    public ResponseEntity<ChildCommonDto> updateProfileData(@RequestParam @Parameter(name = "profileId", description = "프로필 식별 번호.", required = true) Integer profileId,
                                                            @RequestBody @Parameter(name = "ProfileUpdateDto", description = "프로필 업데이트 정보.", required = true) UpdateProfileDto dto) {
        ChildCommonDto response = profileService.updateProfile(profileId, dto);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }
}
