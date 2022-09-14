package com.team23.mainPr.RentPost.Service;

import com.team23.mainPr.RentPost.Dto.CreateRentPostDto;
import com.team23.mainPr.RentPost.Entity.RentPost;
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

    public RentPost createRentPost(CreateRentPostDto dto) {

        try {
            RentPost post = new RentPost();
            post.setContents(dto.getContents());
            post.setName(dto.getName());
            RentPostRepository.save(post);

            return post;
        } catch (Exception e) {
            return null;
        }
    }

    public RentPost updateRentPost(Integer postId, CreateRentPostDto dto) {

        try {
            RentPost post = RentPostRepository.findById(postId).orElseThrow();
            post.setContents(dto.getContents());
            post.setName(dto.getName());

            RentPostRepository.flush();

            return post;
        } catch (Exception e) {
            return null;
        }
    }

    public boolean deleteRentPost(Integer postId) {

        try {
            RentPost post = RentPostRepository.findById(postId).orElseThrow();
            RentPostRepository.delete(post);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public RentPost getRentPost(Integer postId) {

        try {
            RentPost post = RentPostRepository.findById(postId).orElseThrow();

            return post;
        } catch (Exception e) {
            return null;
        }
    }
}
