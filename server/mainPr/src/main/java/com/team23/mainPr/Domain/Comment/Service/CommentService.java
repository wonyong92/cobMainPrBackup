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
import com.team23.mainPr.Domain.RentPost.Repository.RentPostRepository;
import com.team23.mainPr.Global.CommonMethod.MemberIdExtractorFromJwt;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.CustomException.ErrorData;
import com.team23.mainPr.Global.DefaultTimeZone;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentMapper commentMapper;
    private final DefaultTimeZone defaultTimeZone;
    private final CommentRepository commentRepository;
    private final MemberIdExtractorFromJwt memberIdExtractorFromJwt;
    private final LoginRepository loginRepository;
    private final RentPostRepository rentPostRepository;

    public CommentEntityResponseDto createCommentEntity(CreateCommentEntityDto dto, String token) {
        if(!rentPostRepository.findById(dto.getTargetPostId()).isPresent()){
            throw new CustomException(ErrorData.NOT_EXIST_RENT_POST);
        }
        if (!memberIdExtractorFromJwt.getMemberId(token).equals(dto.getWriterId())) {
            throw new CustomException(ErrorData.NOT_ALLOWED_ACCESS_RESOURCE);
        }
        Comment newComment = commentMapper.CreateCommentEntityToCommentEntity(dto);
        newComment.setWriterId(memberIdExtractorFromJwt.getMemberId(token));
        Comment result = commentRepository.getReferenceById(commentRepository.save(newComment).getCommentId());
        return commentMapper.CommentEntityToCommentResponsDto(result);
    }

    public CommentEntityResponseDto getComment(Integer commentId) {
        Comment findComment = commentRepository.getReferenceById(commentId);
        return commentMapper.CommentEntityToCommentResponsDto(findComment);
    }

    public CommentEntityResponseDto updateCommentEntity(UpdateCommentEntityDto dto, String token) {
                if (!memberIdExtractorFromJwt.getMemberId(token).equals(dto.getWriterId())) {
                    throw new CustomException(ErrorData.NOT_ALLOWED_ACCESS_RESOURCE);
                }
        Comment findComment = commentRepository.getReferenceById(dto.getCommentId());
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
        comments.forEach(comment -> commentResponses.add(commentMapper.CommentEntityToCommentResponsDto(comment)));
        CommentEntityResponseDtos result = new CommentEntityResponseDtos();
        result.setComments(commentResponses);
        return result;
    }
}
