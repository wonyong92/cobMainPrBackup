package com.team23.mainPr.RentPost.Service;

import com.team23.mainPr.Dto.CommonDto;
import com.team23.mainPr.RentPost.Dto.CreateRentPostDto;
import com.team23.mainPr.RentPost.Entity.RentPost;
import com.team23.mainPr.RentPost.Mapper.RentPostMapper;
import com.team23.mainPr.RentPost.Repository.RentPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;

/*
 * refactor : 어떤 작성자 정보를 넣을까.
 * refactor : 외래키 연관 관계 생성을 통해 데이터 무결성을 지킬것인가? 아니면 분리하여 서비스의 분리도를 높일 것인가?
 * ETC : save가 작동하지 않으면 백퍼센트 pk에 널이 들어갔거나 , 생성 시퀀스에 문제가 있는것
 */

@Service
@RequiredArgsConstructor
public class RentPostService {

    private final RentPostRepository rentPostRepository;
    private final RentPostMapper rentPostMapper;

    public CommonDto createRentPost(CreateRentPostDto dto) {
        CommonDto response = null;

        try {
            RentPost post = new RentPost();
            post.setContents(dto.getContents());
            post.setName(dto.getName());
            rentPostRepository.save(post);

            RentPost result = rentPostRepository.findById(post.getId()).get();

            if (result != null) {
                response = new CommonDto("true", rentPostMapper.RentPostToRentPostResponse(result));
            } else
                response = new CommonDto("false", rentPostMapper.RentPostToRentPostResponse(result));

            if (response == null)
                throw new Exception();

            return response;
        } catch (Exception e) {

            response = new CommonDto("Error", null);

            return response;
        }
    }

    public CommonDto updateRentPost(Integer postId, CreateRentPostDto dto) {

        CommonDto response = null;

        try {
            RentPost post = rentPostRepository.findById(postId).orElseThrow();
            post.setContents(dto.getContents());
            post.setName(dto.getName());
            post.setUpdateDate(ZonedDateTime.now(ZoneId.of("Asia/Seoul")));
            rentPostRepository.flush();

            RentPost result = rentPostRepository.findById(postId).get();

            if (result != null) {
                if (result.getContents().equals(dto.getContents())) {
                    response = new CommonDto("true", rentPostMapper.RentPostToRentPostResponse(result));

                    return response;
                }
            }

            response = new CommonDto("false", rentPostMapper.RentPostToRentPostResponse(result));

            return response;
        } catch (Exception e) {

            response = new CommonDto("Error", null);

            return response;
        }
    }

    public CommonDto deleteRentPost(Integer postId) {

        CommonDto response = null;

        try {
            RentPost post = rentPostRepository.findById(postId).orElseThrow();
            rentPostRepository.delete(post);

            RentPost result = rentPostRepository.findById(post.getId()).orElse(null);
            if (result == null)
                response = new CommonDto("true", rentPostMapper.RentPostToRentPostResponse(result));
            else
                response = new CommonDto("false", rentPostMapper.RentPostToRentPostResponse(result));

            return response;
        } catch (Exception e) {

            response = new CommonDto("Error", null);

            return response;
        }
    }

    public CommonDto getRentPost(Integer postId) {

        CommonDto response = null;

        try {
            RentPost result = rentPostRepository.findById(postId).orElseThrow();

            if (result.getId() == postId) {
                response = new CommonDto("true", rentPostMapper.RentPostToRentPostResponse(result));
            } else
                response = new CommonDto("false", rentPostMapper.RentPostToRentPostResponse(result));


            return response;
        } catch (Exception e) {

            response = new CommonDto("Error", null);

            return response;
        }
    }
}
