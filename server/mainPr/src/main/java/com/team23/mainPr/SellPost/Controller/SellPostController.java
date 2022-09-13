package com.team23.mainPr.SellPost.Controller;

import com.team23.mainPr.SellPost.Dto.CreateSellPostDto;
import com.team23.mainPr.SellPost.Entity.SellPost;
import com.team23.mainPr.SellPost.Service.SellPostService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sellPost")
@RequiredArgsConstructor
public class SellPostController {

    private final SellPostService sellPostService;

    @ApiOperation(value = "렌트 물품 게시글 등록.", notes = "데이터베이스에 물품 렌트 글을 생성하고, 생성된 게시글 데이터를 응답한다.")
    @PostMapping
    public ResponseEntity createSellPost(@RequestBody @ApiParam(name = "CreateSellPostDto", value = "입력한 게시글 데이터.", required = true) CreateSellPostDto dto) {
        SellPost post = sellPostService.createSellPost(dto);
        return new ResponseEntity(post, HttpStatus.CREATED);
    }

    @ApiOperation(value = "렌트 물품 게시글 수정.", notes = "데이터베이스에 물품 렌트 글을 확인하여, 수정 완료한 게시글 데이터를 응답한다.")
    @PutMapping
    public ResponseEntity updateSellPost(@RequestBody @ApiParam(name = "CreateSellPostDto", value = "입력한 게시글 데이터.", required = true) CreateSellPostDto dto,
                                         @RequestParam @ApiParam(name = "postId", value = "게시글 식별 번호.", required = true) Integer postId) {
        SellPost post = sellPostService.updateSellPost(postId, dto);
        return new ResponseEntity(post, HttpStatus.CREATED);
    }

    @ApiOperation(value = "렌트 물품 게시글 삭제.", notes = "데이터베이스에 물품 렌트 글을 확인하여, 게시글 데이터를 삭제하고, 성공 여부를 응답.")
    @DeleteMapping
    public ResponseEntity updateSellPost(@RequestParam @ApiParam(name = "postId", value = "게시글 식별 번호.", required = true) Integer postId) {
        boolean result = sellPostService.deleteSellPost(postId);
        return new ResponseEntity(result, HttpStatus.CREATED);
    }

    @ApiOperation(value = "렌트 물품 게시글 조회.", notes = "데이터베이스에 물품 렌트 글을 확인하여, 게시글 정보를 응답.")
    @GetMapping
    public ResponseEntity getSellPost(@RequestParam @ApiParam(name = "postId", value = "게시글 식별 번호.", required = true) Integer postId) {
        SellPost post = sellPostService.getSellPost(postId);
        return new ResponseEntity(post, HttpStatus.OK);
    }
}