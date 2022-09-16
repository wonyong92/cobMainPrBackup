package com.team23.mainPr.RentPost.Service;

import com.team23.mainPr.DefaultTimeZone;
import com.team23.mainPr.Dto.ChildCommonDto;
import com.team23.mainPr.RentPost.Dto.CreateRentPostDto;
import com.team23.mainPr.RentPost.Entity.RentPost;
import com.team23.mainPr.RentPost.Mapper.RentPostMapper;
import com.team23.mainPr.RentPost.Repository.RentPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.time.ZonedDateTime;
import static com.team23.mainPr.Enum.ChildCommonDtoMsgList.*;

/**<pre>
 * 어떤 작성자 정보를 넣을까.
 * 외래키 연관 관계 생성을 통해 데이터 무결성을 지킬것인가? 아니면 분리하여 서비스의 분리도를 높일 것인가?
 * save가 작동하지 않으면 백퍼센트 pk에 널이 들어갔거나 , 생성 시퀀스에 문제가 있는것
 * </pre>
 */

@Service
@RequiredArgsConstructor
public class RentPostService {

    private final RentPostRepository rentPostRepository;
    private final RentPostMapper rentPostMapper;

    public ChildCommonDto createRentPost(CreateRentPostDto dto) {


        try {
            RentPost post = new RentPost();
            post.setContents(dto.getContents());
            post.setName(dto.getName());
            post.setUpdateDate(new DefaultTimeZone().getNow());
            post.setWriteDate(new DefaultTimeZone().getNow());

            rentPostRepository.save(post);

            RentPost result = rentPostRepository.findById(post.getId()).orElse(null);

            if (result != null) {
                return new ChildCommonDto(TRUE.getMsg(), HttpStatus.OK, rentPostMapper.RentPostToRentPostResponse(result));
            } else
                return new ChildCommonDto(FALSE.getMsg(), HttpStatus.BAD_REQUEST, rentPostMapper.RentPostToRentPostResponse(result));

        } catch (Exception e) {
            System.out.println("---------"+e.getMessage());
            return new ChildCommonDto(ERROR.getMsg(), HttpStatus.INTERNAL_SERVER_ERROR, null);

        }
    }

    public ChildCommonDto updateRentPost(Integer postId, CreateRentPostDto dto) {


        try {
            RentPost post = rentPostRepository.findById(postId).orElseThrow();
            post.setContents(dto.getContents());
            post.setName(dto.getName());
            post.setUpdateDate(ZonedDateTime.now(new DefaultTimeZone().getZoneId()));
            rentPostRepository.flush();

            RentPost result = rentPostRepository.findById(postId).orElse(null);

            if (result != null) {
                if (result.getContents().equals(dto.getContents())) {

                    return new ChildCommonDto(TRUE.getMsg(), HttpStatus.OK, rentPostMapper.RentPostToRentPostResponse(result));
                }
            }

            return new ChildCommonDto(FALSE.getMsg(), HttpStatus.BAD_REQUEST, rentPostMapper.RentPostToRentPostResponse(result));

        } catch (Exception e) {

            return new ChildCommonDto(ERROR.getMsg(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    public ChildCommonDto deleteRentPost(Integer postId) {

        try {
            RentPost post = rentPostRepository.findById(postId).orElseThrow();
            rentPostRepository.delete(post);

            RentPost result = rentPostRepository.findById(post.getId()).orElse(null);
            if (result == null)
                return new ChildCommonDto(TRUE.getMsg(), HttpStatus.OK, rentPostMapper.RentPostToRentPostResponse(result));
            else
                return new ChildCommonDto(FALSE.getMsg(), HttpStatus.BAD_REQUEST, rentPostMapper.RentPostToRentPostResponse(result));

        } catch (Exception e) {

            return new ChildCommonDto(ERROR.getMsg(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    public ChildCommonDto getRentPost(Integer postId) {

        try {
            RentPost result = rentPostRepository.findById(postId).orElseThrow();

            if (result.getId().equals(postId)) {
                return new ChildCommonDto(TRUE.getMsg(), HttpStatus.OK, rentPostMapper.RentPostToRentPostResponse(result));
            } else
                return new ChildCommonDto(FALSE.getMsg(), HttpStatus.BAD_REQUEST, rentPostMapper.RentPostToRentPostResponse(result));

        } catch (Exception e) {

            return new ChildCommonDto(ERROR.getMsg(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
}
