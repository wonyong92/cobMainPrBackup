package com.team23.mainPr.Domain.Comment.Controller;

import com.team23.mainPr.Domain.Comment.Dto.Response.*;
import com.team23.mainPr.Domain.Comment.Dto.Request.*;
import com.team23.mainPr.Domain.Comment.Service.CommentService;
import com.team23.mainPr.Global.Dto.ChildCommonDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.*;

@Controller
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @Operation
    @PostMapping("/post")
    public ResponseEntity<ChildCommonDto<CommentEntityResponseDto>> postComment(@RequestBody CreateCommentEntityDto createCommentEntityDto){

        ChildCommonDto<CommentEntityResponseDto> response = commentService.createCommentEntity(createCommentEntityDto);

        if(response.getMsg().equals(TRUE.getMsg()) || response.getMsg().equals(SUCCESS.getMsg()) || response.getMsg().equals(CREATED.getMsg()))
            return new ResponseEntity<>(response, HttpStatus.OK);
        else if(response.getMsg().equals(FAIL.getMsg()) || response.getMsg().equals(FALSE.getMsg()))
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Operation
    @GetMapping("/{commentId}")
    public ResponseEntity<ChildCommonDto<CommentEntityResponseDto>> getComment(@PathVariable Integer commentId){

        ChildCommonDto<CommentEntityResponseDto> response = commentService.getComment(commentId);

        if(response.getMsg().equals(TRUE.getMsg()) || response.getMsg().equals(SUCCESS.getMsg()) || response.getMsg().equals(CREATED.getMsg()))
            return new ResponseEntity<>(response, HttpStatus.OK);
        else if(response.getMsg().equals(FAIL.getMsg()) || response.getMsg().equals(FALSE.getMsg()))
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Operation
    @PostMapping("/update")
    public ResponseEntity<ChildCommonDto<CommentEntityResponseDto>> updateComment(@RequestBody UpdateCommentEntityDto updateCommentEntityDto){

        ChildCommonDto<CommentEntityResponseDto> response = commentService.updateCommentEntity(updateCommentEntityDto);

        if(response.getMsg().equals(TRUE.getMsg()) || response.getMsg().equals(SUCCESS.getMsg()) || response.getMsg().equals(CREATED.getMsg()))
            return new ResponseEntity<>(response, HttpStatus.OK);
        else if(response.getMsg().equals(FAIL.getMsg()) || response.getMsg().equals(FALSE.getMsg()))
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Operation
    @PostMapping("/delete")
    public ResponseEntity<ChildCommonDto<CommentEntityResponseDto>> deleteCommentEntity(@RequestParam Integer commentId){

        ChildCommonDto<CommentEntityResponseDto> response = commentService.deleteCommentEntity(commentId);

        if(response.getMsg().equals(TRUE.getMsg()) || response.getMsg().equals(SUCCESS.getMsg()) || response.getMsg().equals(CREATED.getMsg()))
            return new ResponseEntity<>(response, HttpStatus.OK);
        else if(response.getMsg().equals(FAIL.getMsg()) || response.getMsg().equals(FALSE.getMsg()))
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
