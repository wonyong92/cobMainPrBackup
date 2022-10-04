package com.team23.mainPr.Domain.Comment.Controller;

import com.team23.mainPr.Domain.Comment.Dto.Request.CreateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Request.UpdateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDtos;
import com.team23.mainPr.Domain.Comment.Service.CommentService;
import com.team23.mainPr.Global.Interceptor.Login;
import io.swagger.v3.oas.annotations.Operation;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @Operation(description = "댓글 생성, 토큰으로 작성자와 요청값의 작성자 확인")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post")
    @Login
    public CommentEntityResponseDto postComment(
        @RequestBody
        @Valid CreateCommentEntityDto dto,
        @RequestHeader(value = "Authorization", required = false) String token) {
        return commentService.createCommentEntity(dto, token);
    }

    @Operation(description = "단일 댓글 내용 조회")
    @GetMapping
    public CommentEntityResponseDto getComment(
        @RequestParam
        @Min(value = 1, message = "commentId must be above 1") Integer commentId) {
        return commentService.getComment(commentId);
    }

    @Operation(description = "댓글 수정, 토큰으로 작성자와 요청값의 작성자 확인")
    @PostMapping("/update")
    @Login
    public CommentEntityResponseDto updateComment(
        @RequestBody
        @Valid UpdateCommentEntityDto dto,
        @RequestHeader(value = "Authorization", required = false) String token) {
        return commentService.updateCommentEntity(dto, token);
    }

    @Operation(description = "댓글 삭제, 토큰으로 작성자와 요청값의 작성자 확인")
    @PostMapping("/delete")
    @Login
    public String deleteCommentEntity(
        @RequestParam
        @Min(value = 1, message = "commentId must be above 1") Integer commentId,
        @RequestHeader(value = "Authorization", required = false) String token) {
        return commentService.deleteCommentEntity(commentId, token);
    }

    @Operation(description = "게시글에 달린 전체 댓글 조회 - 작성 시간 오름차순 정렬")
    @GetMapping("/getComments")
    public CommentEntityResponseDtos getComments(
        @RequestParam
        @Valid @Min(value = 1, message = "postId must be above 1") Integer postId) {
        return commentService.getComments(postId);
    }
}
