package com.team23.mainPr.Domain.RentPost.Controller;

import com.team23.mainPr.Domain.RentPost.Dto.Request.CreateRentPostEntityDto;
import com.team23.mainPr.Domain.RentPost.Dto.Request.RentPostPageRequestDto;
import com.team23.mainPr.Domain.RentPost.Dto.Request.UpdateRentPostDto;
import com.team23.mainPr.Domain.RentPost.Dto.Response.PagedRentPostResponseDtos;
import com.team23.mainPr.Domain.RentPost.Dto.Response.RentPostResponseDto;
import com.team23.mainPr.Domain.RentPost.Service.RentPostService;
import io.swagger.v3.oas.annotations.Operation;
import java.io.IOException;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/rentPost")
@RequiredArgsConstructor
public class RentPostController {

    private final RentPostService rentPostService;

    @Operation(description = "게시글 생성, 토큰을 이용하여 작성자 본인이 맞는지 확인.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post")
    public RentPostResponseDto createRentPost(
        @RequestBody @Valid CreateRentPostEntityDto dto,
        @RequestHeader(value = "Authorization", required = false) String token) {
        return rentPostService.createRentPost(dto, token);
    }

    /**
     * <pre>
     * api 설명 작성할때 비슷한 기능은 같은 용어를 사용해야 혼동을 줄이고, 통일감을 줄 수 있다.
     * </pre>
     */
    @Operation(description = "게시글 수정, 토큰을 이용하여 작성자 본인이 맞는지 확인.")
    @PutMapping("/update")
    public RentPostResponseDto updateRentPost(
        @RequestBody @Valid UpdateRentPostDto updateRentPostDto,
        @RequestHeader(value = "Authorization", required = false) String token) {
        return rentPostService.updateRentPost(updateRentPostDto, token);
    }

    /**
     * <p>
     * 별도의 응답을 출력하지 않고, 200 ok 상태코드를 확인하면 되도록 수정
     * </p>
     */
    @Operation(description = "게시글 삭제, 토큰을 이용하여 작성자 본인이 맞는지 확인, 성공시 200 응답.")
    @DeleteMapping("/delete")
    public void deleteRentPost(
        @RequestParam Integer postId,
        @RequestHeader(value = "Authorization", required = false) String token) {
        rentPostService.deleteRentPost(postId, token);
    }

    /**
     * <pre>
     * 조회에 관련된 uri는 PathVariable 사용하기
     * </pre>
     */
    // 멱등성이 보장되지 않는 api에 대해서는 put으로 변경 - 요청할 때 마다 조회수가 상승하므로 멱등성이 지켜지지 않는 api
    @Operation(description = "게시글 조회.")
    @PostMapping
    public RentPostResponseDto getRentPost(@RequestParam Integer postId) {
        return rentPostService.getRentPost(postId);
    }

    @Operation(description = "전체 게시글 목록 조회, 목록 크기 20 고정, page 0번 부터 시작 , 기본 정렬 - 최신순, sort에서 writeDate, viewCount 로 최신순,인기순 변경 가능," + " 렌트 상태 rentStatus 기본값 false, 카테고리 categoryXXX 형태로 카테고리 설정 가능")
    @GetMapping("/posts")
    public PagedRentPostResponseDtos getRentPosts(
        @RequestBody RentPostPageRequestDto dto,
        @RequestParam(defaultValue = "false") Boolean rentStatus,
        @RequestParam(defaultValue = "category") String category) {
        return rentPostService.getRentPosts(dto, rentStatus, category);
    }

    /**
     * <p>
     * 별도의 응답을 출력하지 않고, 200 ok 상태코드를 확인하면 되도록 수정
     * </p>
     */
    @Operation(description = "게시글 이미지 등록, 토큰을 이용하여 해당 게시글 작성자인지 확인")
    @PostMapping("/images")
    public void postImages(
        @RequestParam(value = "image") List<MultipartFile> files,
        @RequestParam Integer postId,
        @RequestHeader(value = "Authorization", required = false) String token) throws IOException {
        rentPostService.postImages(files, postId, token);
    }

    @Operation(description = "게시글 이미지 조회 - 이미지 식별 번호만 리턴 - 실제 이미지 조회는 해당 api의 식별번호들을 이용하여 /image/get api를 통해 렌더링.")
    @GetMapping("/images/get")
    public List<Integer> getImages(@RequestParam Integer postId) {
        return rentPostService.getPostImages(postId);
    }

    @Operation(description = "게시글 이미지 조회.")
    @GetMapping(value = "/image/get", produces = "image/png")
    public Resource getImage(@RequestParam Integer imageId) throws IOException {
        return rentPostService.getImage(imageId);
    }

    @Operation(description = "검색 기능, 게시글 제목 검색, 카테고리 category -렌트상태 rentStatus 필터링 가능, sort - 최신순-조회수순 정렬 가능(내림차순)")
    @PostMapping("/search")
    public List<RentPostResponseDto> search(
        @RequestParam String phrase,
        @RequestParam(defaultValue = "category") String category,
        @RequestBody RentPostPageRequestDto dto,
        @RequestParam(defaultValue = "false") Boolean rentStatus) {
        return rentPostService.searchAll(phrase.replace(" ", "|").trim(), category, dto,
            rentStatus);
    }

    @Operation(description = "H2의 FULL TEXT SEARCH 기능을 사용한 메소드 입니다. 속도 확인 후 기존의 search 메소드를 대체할수 있다고 판단되면 통합하도록 하겠습니다.")
    @PostMapping("/ftSearch")
    public List<RentPostResponseDto> ftSearch(@RequestParam String phrase) {
        return rentPostService.ftSearchAll(phrase);
    }
}
