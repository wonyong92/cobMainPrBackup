package com.team23.mainPr.RentPost.Controller;

import com.team23.mainPr.RentPost.Dto.CreateRentPostDto;
import com.team23.mainPr.RentPost.Entity.RentPost;
import com.team23.mainPr.RentPost.Service.RentPostService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/RentPost")
@RequiredArgsConstructor
public class RentPostController {

    private final RentPostService RentPostService;

    /*
    * refactor : MemberController 와 URI 통일성을 위해 register 사용, 대안으로는 write 를 사용가능
    * */
    
    @ApiOperation(value = "렌트 물품 게시글 등록.", notes = "데이터베이스에 물품 렌트 글을 생성하고, 생성된 게시글 데이터를 응답한다.")
    @PostMapping("/register")
    public ResponseEntity createRentPost(@RequestBody @ApiParam(name = "CreateRentPostDto", value = "입력한 렌트 게시글 데이터.", required = true) CreateRentPostDto dto) {
        RentPost post = RentPostService.createRentPost(dto);
        return new ResponseEntity(post, HttpStatus.CREATED);
    }

    /*
    * ETC : api 설명 작성할때 비슷한 기능은 같은 용어를 사용해야 혼동을 줄이고, 통일감을 줄 수 있다.
    * */

    @ApiOperation(value = "렌트 물품 게시글 업데이트.", notes = "데이터베이스에 물품 렌트 글을 확인하여, 수정 완료한 게시글 데이터를 응답한다.")
    @PutMapping("/update")
    public ResponseEntity updateRentPost(@RequestBody @ApiParam(name = "CreateRentPostDto", value = "입력한 게시글 데이터.", required = true) CreateRentPostDto dto,
                                         @RequestParam @ApiParam(name = "postId", value = "게시글 식별 번호.", required = true) Integer postId) {
        RentPost post = RentPostService.updateRentPost(postId, dto);
        return new ResponseEntity(post, HttpStatus.CREATED);
    }

    @ApiOperation(value = "렌트 물품 게시글 삭제.", notes = "데이터베이스에 물품 렌트 글을 확인하여, 게시글 데이터를 삭제하고, 성공 여부를 응답.")
    @DeleteMapping("/delete")
    public ResponseEntity updateRentPost(@RequestParam @ApiParam(name = "postId", value = "게시글 식별 번호.", required = true) Integer postId) {
        boolean result = RentPostService.deleteRentPost(postId);
        return new ResponseEntity(result, HttpStatus.CREATED);
    }

    /*
    * ETC : 조회에 관련된 uri는 PathVariable 사용하기
    * */

    @ApiOperation(value = "렌트 물품 게시글 조회.", notes = "데이터베이스에 물품 렌트 글을 확인하여, 게시글 정보를 응답.")
    @GetMapping("/{postId}")
    public ResponseEntity getRentPost(@PathVariable @ApiParam(name = "postId", value = "게시글 식별 번호.", required = true) Integer postId) {
        RentPost post = RentPostService.getRentPost(postId);
        return new ResponseEntity(post, HttpStatus.OK);
    }
}
