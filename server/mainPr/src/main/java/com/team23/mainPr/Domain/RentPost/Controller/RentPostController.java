package com.team23.mainPr.Domain.RentPost.Controller;

import com.team23.mainPr.Domain.RentPost.Dto.Request.CreateRentPostEntityDto;
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
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post")
    public RentPostResponseDto createRentPost(@RequestBody @Valid CreateRentPostEntityDto dto,
        @RequestHeader(value = "Authorization") String token) {
        return rentPostService.createRentPost(dto, token);
    }

    /**
     * <pre>
     * api 설명 작성할때 비슷한 기능은 같은 용어를 사용해야 혼동을 줄이고, 통일감을 줄 수 있다.
     * </pre>
     */
    @PutMapping("/update")
    public RentPostResponseDto updateRentPost(
        @RequestBody @Valid UpdateRentPostDto updateRentPostDto,
        @RequestHeader(value = "Authorization") String token) {
        return rentPostService.updateRentPost(updateRentPostDto, token);
    }

    /**
     * <p>
     * 별도의 응답을 출력하지 않고, 200 ok 상태코드를 확인하면 되도록 수정
     * </p>
     */
    @DeleteMapping("/delete")
    public void deleteRentPost(@RequestParam Integer postId,
        @RequestHeader(value = "Authorization") String token) {
        rentPostService.deleteRentPost(postId, token);
    }

    /**
     * <pre>
     * 조회에 관련된 uri는 PathVariable 사용하기
     * </pre>
     */
    // 멱등성이 보장되지 않는 api에 대해서는 put으로 변경 - 요청할 때 마다 조회수가 상승하므로 멱등성이 지켜지지 않는 api
    @PostMapping
    public RentPostResponseDto getRentPost(@RequestParam Integer postId) {
        return rentPostService.getRentPost(postId);
    }

    /**
     * <p>
     * 별도의 응답을 출력하지 않고, 200 ok 상태코드를 확인하면 되도록 수정
     * </p>
     */
    @PostMapping("/images")
    public void postImages(@RequestParam(value = "image") List<MultipartFile> files,
        @RequestParam Integer postId, @RequestHeader(value = "Authorization") String token)
        throws IOException {
        rentPostService.postImages(files, postId, token);
    }

    @GetMapping("/images/get")
    public List<Integer> getImages(@RequestParam Integer postId) {
        return rentPostService.getPostImages(postId);
    }

    @GetMapping(value = "/image/get", produces = "image/png")
    public Resource getImage(@RequestParam Integer imageId) throws IOException {
        return rentPostService.getImage(imageId);
    }

    @GetMapping("/posts")
    public PagedRentPostResponseDtos getRentPosts(
        @PageableDefault(page = 0, size = 20, sort = "writeDate", direction = Sort.Direction.DESC) Pageable pageable,
        @RequestParam(defaultValue = "false") Boolean rentStatus,
        @RequestParam(defaultValue = "category") String category) {
        return rentPostService.getRentPosts(pageable, rentStatus, category);
    }

    @PostMapping("/search")
    public List<RentPostResponseDto> search(@RequestParam String phrase,
        @RequestParam(defaultValue = "category") String category,
        @RequestParam(defaultValue = "RENT_POST_ID") String sort,
        @RequestParam(defaultValue = "1") Integer page,
        @RequestParam(defaultValue = "false") Boolean rentStatus) {
        return rentPostService.searchAll(phrase.replace(" ", "|").trim(), category, sort, page,
            rentStatus);
    }

    @Operation(description = "H2의 FULL TEXT SEARCH 기능을 사용한 메소드 입니다. 속도 확인 후 기존의 search 메소드를 대체할수 있다고 판단되면 통합하도록 하겠습니다.")
    @PostMapping("/ftSearch")
    public List<RentPostResponseDto> ftSearch(@RequestParam String phrase) {
        return rentPostService.ftSearchAll(phrase);
    }
}
