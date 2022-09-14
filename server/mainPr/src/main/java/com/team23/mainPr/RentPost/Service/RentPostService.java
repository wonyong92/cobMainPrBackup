package com.team23.mainPr.RentPost.Service;

import com.team23.mainPr.Dto.CommonDto;
import com.team23.mainPr.RentPost.Dto.CreateRentPostDto;
import com.team23.mainPr.RentPost.Entity.RentPost;
import com.team23.mainPr.RentPost.Mapper.RentPostMapper;
import com.team23.mainPr.RentPost.Repository.RentPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * refactor : 어떤 작성자 정보를 넣을까.
 * refactor : 외래키 연관 관계 생성을 통해 데이터 무결성을 지킬것인가? 아니면 분리하여 서비스의 분리도를 높일 것인가?
 */

@Service
@RequiredArgsConstructor
public class RentPostService {

    private final RentPostRepository RentPostRepository;
    private final RentPostMapper rentPostMapper;

    public CommonDto createRentPost(CreateRentPostDto dto) {

        CommonDto response = null;

        try {
            RentPost post = new RentPost();
            post.setContents(dto.getContents());
            post.setName(dto.getName());
            RentPostRepository.save(post);

            RentPost result = RentPostRepository.findById(post.getId()).get();

            if(result != null)
            {
                response = new CommonDto("true",rentPostMapper.RentPostToRentPostResponse(result));
            }
            else
                response = new CommonDto("false",rentPostMapper.RentPostToRentPostResponse(result));

            if(response == null)
                throw new Exception();

            return response;
        } catch (Exception e) {

            response = new CommonDto("Error",null);

            return response;
        }
    }

    public CommonDto updateRentPost(Integer postId, CreateRentPostDto dto) {

        CommonDto response = null;

        try {
            RentPost post = RentPostRepository.findById(postId).orElseThrow();
            post.setContents(dto.getContents());
            post.setName(dto.getName());

            RentPostRepository.flush();

            RentPost result = RentPostRepository.findById(postId).get();

            if(result != null)
            {
                if(result.getContents().equals(dto.getContents()))
                {
                    response = new CommonDto("true",rentPostMapper.RentPostToRentPostResponse(result));

                    return response;
                }
            }

            response = new CommonDto("false",rentPostMapper.RentPostToRentPostResponse(result));

            return response;
        } catch (Exception e) {

            response = new CommonDto("Error",null);

            return response;
        }
    }

    public CommonDto deleteRentPost(Integer postId) {

        CommonDto response = null;

        try {
            RentPost post = RentPostRepository.findById(postId).orElseThrow();
            RentPostRepository.delete(post);

            RentPost result = RentPostRepository.findById(post.getId()).get();
            if(result == null)
                response = new CommonDto("true",rentPostMapper.RentPostToRentPostResponse(result));
            else
                response = new CommonDto("false",rentPostMapper.RentPostToRentPostResponse(result));

            return response;
        } catch (Exception e) {

            response = new CommonDto("Error",null);

            return response;
        }
    }

    public CommonDto getRentPost(Integer postId) {

        CommonDto response = null;

        try {
            RentPost result = RentPostRepository.findById(postId).orElseThrow();

            if(result.getId() == postId)
            {
                response = new CommonDto("true",rentPostMapper.RentPostToRentPostResponse(result));
            }
            else
                response = new CommonDto("false",rentPostMapper.RentPostToRentPostResponse(result));


            return response;
        } catch (Exception e) {

            response = new CommonDto("Error",null);

            return response;
        }
    }
}
