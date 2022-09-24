package com.team23.mainPr.Domain.Comment.Service;

import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.SUCCESS;

import com.team23.mainPr.Domain.Comment.Dto.Request.CreateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Request.UpdateCommentEntityDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDto;
import com.team23.mainPr.Domain.Comment.Dto.Response.CommentEntityResponseDtos;
import com.team23.mainPr.Domain.Comment.Entity.Comment;
import com.team23.mainPr.Domain.Comment.Mapper.CommentMapper;
import com.team23.mainPr.Domain.Comment.Repository.CommentRepository;
import com.team23.mainPr.Domain.Login.Repository.LoginRepository;
import com.team23.mainPr.Global.CommonMethod.MemberIdExtractorFromJwt;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.CustomException.ErrorData;
import com.team23.mainPr.Global.DefaultTimeZone;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentMapper commentMapper;
    private final DefaultTimeZone defaultTimeZone;
    private final CommentRepository commentRepository;
    private final MemberIdExtractorFromJwt memberIdExtractorFromJwt;
    private final LoginRepository loginRepository;

    public CommentEntityResponseDto createCommentEntity(
        CreateCommentEntityDto dto, String token) {
        if (!memberIdExtractorFromJwt.getMemberId(token)
            .equals(dto.getWriterId())) {
            throw new CustomException(ErrorData.NOT_ALLOWED_ACCESS_RESOURCE);
        }

        Comment newComment = commentMapper.CreateCommentEntityToCommentEntity(
            dto);
        newComment.setWriterId(memberIdExtractorFromJwt.getMemberId(token));

        Comment result = commentRepository.getReferenceById(
            commentRepository.save(newComment).getCommentId());

        return commentMapper.CommentEntityToCommentResponsDto(result);
    }

    public CommentEntityResponseDto getComment(Integer commentId) {

        Comment findComment = commentRepository.getReferenceById(commentId);

        return commentMapper.CommentEntityToCommentResponsDto(findComment);
    }

    public CommentEntityResponseDto updateCommentEntity(
        UpdateCommentEntityDto dto, String token) {
        
        if (!memberIdExtractorFromJwt.getMemberId(token)
            .equals(dto.getWriterId())) {
            throw new CustomException(ErrorData.NOT_ALLOWED_ACCESS_RESOURCE);
        }


        Comment findComment = commentRepository.getReferenceById(
            dto.getCommentId());

        if (!findComment.getWriterId().equals(memberIdExtractorFromJwt.getMemberId(token))) {
            throw new CustomException(ErrorData.NOT_ALLOWED_ACCESS_RESOURCE);
        }

        findComment.setCommentContents(dto.getCommentContents());
        commentRepository.flush();

        return commentMapper.CommentEntityToCommentResponsDto(findComment);
    }

    public String deleteCommentEntity(Integer commentId, String token) {

        Comment findComment = commentRepository.getReferenceById(commentId);

        if (!findComment.getWriterId().equals(memberIdExtractorFromJwt.getMemberId(token))) {
            throw new CustomException(ErrorData.NOT_ALLOWED_ACCESS_RESOURCE);
        }

        commentRepository.delete(findComment);

        return SUCCESS.getMsg();
    }

    public CommentEntityResponseDtos getComments(Integer targetPostId) {

        List<Comment> comments = commentRepository.findAllByTargetPostId(targetPostId);

        List<CommentEntityResponseDto> commentResponses = new ArrayList<>();
        comments.stream().forEach(comment -> commentResponses.add(
            commentMapper.CommentEntityToCommentResponsDto(comment)));

        CommentEntityResponseDtos result = new CommentEntityResponseDtos();
        result.setComments(commentResponses);
        // 이전 코드 : 응답하는 리스트의 크키가 0인지 if 문으로 확인해서 , 에러메세지 만들어서 응답 ==> 수정 코드 : 리스트 사이즈가 0이어도 그냥 보낸다. 실제로
        // 데이터가 0개인 거고 정상 동작이므로 200 OK가 맞음. 나머지는 프론트에서 처리해야함.
        return result;
    }
}
