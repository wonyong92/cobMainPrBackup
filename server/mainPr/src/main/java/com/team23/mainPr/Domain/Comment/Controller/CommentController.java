package com.team23.mainPr.Domain.Comment.Controller;

import com.team23.mainPr.Domain.Comment.Dto.Request.CreateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Request.UpdateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDtos;
import com.team23.mainPr.Domain.Comment.Service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post")
    public CommentEntityResponseDto postComment(@RequestBody @Valid CreateCommentEntityDto dto) {
        return commentService.createCommentEntity(dto);
    }

    @GetMapping("/{commentId}")
    public CommentEntityResponseDto getComment(@PathVariable @Min(value = 1, message = "commentId must be above 1") Integer commentId) {
        return commentService.getComment(commentId);
    }

    @PostMapping("/update")
    public CommentEntityResponseDto updateComment(@RequestBody @Valid UpdateCommentEntityDto dto) {
        return commentService.updateCommentEntity(dto);
    }

    @PostMapping("/delete")
    public String deleteCommentEntity(@RequestParam @Min(value = 1, message = "commentId must be above 1") Integer commentId) {
        return commentService.deleteCommentEntity(commentId);
    }

    @GetMapping("/getComments/{postId}")
    public CommentEntityResponseDtos getComments(@PathVariable @Valid @Min(value = 1, message = "postId must be above 1") Integer postId) {
        return commentService.getComments(postId);
    }
}
