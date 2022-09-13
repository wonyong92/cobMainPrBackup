package com.team23.mainPr.SellPost.Service;

import com.team23.mainPr.SellPost.Dto.CreateSellPostDto;
import com.team23.mainPr.SellPost.Entity.SellPost;
import com.team23.mainPr.SellPost.Repository.SellPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * refactor : 어떤 작성자 정보를 넣을까.
 * refactor : 외래키 연관 관계 생성을 통해 데이터 무결성을 지킬것인가? 아니면 분리하여 서비스의 분리도를 높일 것인가?
 */

@Service
@RequiredArgsConstructor
public class SellPostService {

    private final SellPostRepository sellPostRepository;

    public SellPost createSellPost(CreateSellPostDto dto) {

        try {
            SellPost post = new SellPost();
            post.setContents(dto.getContents());
            post.setName(dto.getName());
            sellPostRepository.save(post);

            return post;
        } catch (Exception e) {
            return null;
        }
    }

    public SellPost updateSellPost(Integer postId, CreateSellPostDto dto) {

        try {
            SellPost post = sellPostRepository.findById(postId).orElseThrow();
            post.setContents(dto.getContents());
            post.setName(dto.getName());

            sellPostRepository.flush();

            return post;
        } catch (Exception e) {
            return null;
        }
    }

    public boolean deleteSellPost(Integer postId) {

        try {
            SellPost post = sellPostRepository.findById(postId).orElseThrow();
            sellPostRepository.delete(post);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public SellPost getSellPost(Integer postId) {

        try {
            SellPost post = sellPostRepository.findById(postId).orElseThrow();

            return post;
        } catch (Exception e) {
            return null;
        }
    }
}