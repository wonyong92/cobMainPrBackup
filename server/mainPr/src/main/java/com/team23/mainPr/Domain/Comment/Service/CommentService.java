package com.team23.mainPr.Domain.Comment.Service;

import com.team23.mainPr.Domain.Comment.Dto.Request.CreateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Request.UpdateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDtos;
import com.team23.mainPr.Domain.Comment.Entity.Comment;
import com.team23.mainPr.Domain.Comment.Mapper.CommentMapper;
import com.team23.mainPr.Domain.Comment.Repository.CommentRepository;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.CustomException.ErrorData;
import com.team23.mainPr.Global.DefaultTimeZone;
import com.team23.mainPr.Global.Dto.ChildCommonDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.FAIL;
import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.SUCCESS;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentMapper commentMapper;
    private final DefaultTimeZone defaultTimeZone;
    private final CommentRepository commentRepository;

    public CommentEntityResponseDto createCommentEntity(CreateCommentEntityDto createCommentEntityDto) {
        //Bean Validation 적용으로 CreateCommentEntityDto 에 누락된 값이 있는지 확인하는 로직 삭제
        Comment newComment = commentMapper.CreateCommentEntityToCommentEntity(createCommentEntityDto);
        newComment.setWriteDate(defaultTimeZone.getNow());
        newComment.setUpdateDate(defaultTimeZone.getNow());

        Comment result = commentRepository.getReferenceById(commentRepository.save(newComment).getCommentId());
        //Bean Validation 적용+ControllerExceptionHandler(컨트롤러 예외 핸들러) 사용으로 발생 가능한 에러상황을 서비스에서 처리하지 않도록 변경
        return commentMapper.CommentEntityToCommentResponsDto(result);
    }

    public CommentEntityResponseDto getComment(Integer commentId) {
        //Bean Validation 적용+ControllerExceptionHandler(컨트롤러 예외 핸들러) 사용으로 발생 가능한 에러상황을 서비스에서 처리하지 않도록 변경
        Comment findComment = commentRepository.getReferenceById(commentId);

        return commentMapper.CommentEntityToCommentResponsDto(findComment);
    }

    public CommentEntityResponseDto updateCommentEntity(UpdateCommentEntityDto updateCommentEntityDto) {
        //Bean Validation 적용으로 UpdateCommentEntityDto 에 누락된 값이 있는지 확인하는 로직 삭제
        Comment findComment = commentRepository.getReferenceById(updateCommentEntityDto.getCommentId());
        findComment.setCommentContents(updateCommentEntityDto.getCommentContents());
        commentRepository.flush();

        return commentMapper.CommentEntityToCommentResponsDto(findComment);
    }

    public String deleteCommentEntity(Integer commentId) {

        Comment findComment = commentRepository.getReferenceById(commentId);

        commentRepository.delete(findComment);
        //Bean Validation 적용+ControllerExceptionHandler(컨트롤러 예외 핸들러) 사용으로 발생 가능한 에러상황을 서비스에서 처리하지 않도록 변경
        //단순하게 성공했음을 알리는 메세지만 응답하면 된다.
        return SUCCESS.getMsg();
    }

    public CommentEntityResponseDtos getComments(Integer targetPostId) {
        List<Comment> comments = commentRepository.findAllByTargetPostId(targetPostId);

        List<CommentEntityResponseDto> commentResponses = new ArrayList<>();
        comments.stream().forEach(comment -> commentResponses.add(commentMapper.CommentEntityToCommentResponsDto(comment)));

        CommentEntityResponseDtos result = new CommentEntityResponseDtos();
        result.setComments(commentResponses);
        //Bean Validation 적용+ControllerExceptionHandler(컨트롤러 예외 핸들러) 사용으로 발생 가능한 에러상황을 서비스에서 처리하지 않도록 변경
        //다시 생각해보니 검색 결과가 0라면 정상적인 응답이므로 그대로 비어있는 리스트를 응답하면 되는 것이었다. - 불필요한 에러 핸들링 하려고 하지 않기
        return result;
    }
}
