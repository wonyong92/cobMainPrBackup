package com.team23.mainPr.Domain.RentPost.Controller;

import com.team23.mainPr.Domain.RentPost.Dto.Request.CreateRentPostEntityDto;
import com.team23.mainPr.Domain.RentPost.Dto.Request.UpdateRentPostDto;
import com.team23.mainPr.Domain.RentPost.Dto.Response.RentPostResponseDto;
import com.team23.mainPr.Domain.RentPost.Service.RentPostService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rentPost")
@RequiredArgsConstructor
public class RentPostController {

    private final RentPostService RentPostService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post")
    public RentPostResponseDto createRentPost(@RequestBody @Parameter(name = "CreateRentPostDto", description = "입력한 렌트 게시글 데이터.", required = true) CreateRentPostEntityDto dto) {
        return RentPostService.createRentPost(dto);
    }

    /**
     * <pre>
     * api 설명 작성할때 비슷한 기능은 같은 용어를 사용해야 혼동을 줄이고, 통일감을 줄 수 있다.
     * </pre>
     */

    @PutMapping("/update")
    public RentPostResponseDto updateRentPost(@RequestBody UpdateRentPostDto updateRentPostDto, Integer postId) {
        return RentPostService.updateRentPost(postId, updateRentPostDto);
    }

    @DeleteMapping("/delete")
    public String updateRentPost(@RequestParam @Parameter(name = "postId", description = "게시글 식별 번호.", required = true) Integer postId) {
        return RentPostService.deleteRentPost(postId);
    }

    /**
     * <pre>
     * 조회에 관련된 uri는 PathVariable 사용하기
     * </pre>
     */

    @PostMapping("/{postId}")
    public RentPostResponseDto getRentPost(@PathVariable @Parameter(name = "postId", description = "게시글 식별 번호.", required = true) Integer postId) {

        return RentPostService.getRentPost(postId);
    }
}
