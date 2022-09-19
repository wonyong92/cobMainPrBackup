package com.team23.mainPr.Domain.Comment.Controller;

import com.team23.mainPr.Domain.Comment.Dto.Request.CreateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Request.UpdateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDtos;
import com.team23.mainPr.Domain.Comment.Service.CommentService;
import com.team23.mainPr.Global.Dto.ChildCommonDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;

import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.*;

@Controller
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;


    @PostMapping("/post")
    public ResponseEntity<CommentEntityResponseDto> postComment(@RequestBody @Valid CreateCommentEntityDto dto) {

        CommentEntityResponseDto response = commentService.createCommentEntity(dto);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/{commentId}")
    public ResponseEntity<CommentEntityResponseDto> getComment(@PathVariable @Min(value = 1, message = "commentId must be above 1") Integer commentId) {

        CommentEntityResponseDto response = commentService.getComment(commentId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PostMapping("/update")
    public ResponseEntity<CommentEntityResponseDto> updateComment(@RequestBody @Valid UpdateCommentEntityDto dto) {

        CommentEntityResponseDto response = commentService.updateCommentEntity(dto);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PostMapping("/delete")
    public ResponseEntity<String> deleteCommentEntity(@RequestParam @Min(value = 1, message = "commentId must be above 1") Integer commentId) {

        String response = commentService.deleteCommentEntity(commentId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/getComments/{postId}")
    public ResponseEntity<CommentEntityResponseDtos> getComments(@PathVariable @Valid @Min(value = 1, message = "postId must be above 1") Integer postId) {

        CommentEntityResponseDtos response = commentService.getComments(postId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
