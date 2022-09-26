package com.team23.mainPr.Domain.RentPost.Service;

import com.team23.mainPr.Domain.Login.Repository.LoginRepository;
import com.team23.mainPr.Domain.Picture.Entity.Picture;
import com.team23.mainPr.Domain.Picture.Repository.PictureRepository;
import com.team23.mainPr.Domain.RentPost.Dto.Request.CreateRentPostEntityDto;
import com.team23.mainPr.Domain.RentPost.Dto.Request.RentPostPageRequestDto;
import com.team23.mainPr.Domain.RentPost.Dto.Request.UpdateRentPostDto;
import com.team23.mainPr.Domain.RentPost.Dto.Response.PagedRentPostResponseDtos;
import com.team23.mainPr.Domain.RentPost.Dto.Response.RentPostResponseDto;
import com.team23.mainPr.Domain.RentPost.Entity.RentPost;
import com.team23.mainPr.Domain.RentPost.Mapper.RentPostMapper;
import com.team23.mainPr.Domain.RentPost.Repository.RentPostRepository;
import com.team23.mainPr.Global.CommonMethod.MemberIdExtractorFromJwt;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.CustomException.ErrorData;
import com.team23.mainPr.Global.DefaultTimeZone;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * <pre>
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
    private final DefaultTimeZone defaultTimeZone;
    private final PictureRepository pictureRepository;
    private final MemberIdExtractorFromJwt memberIdExtractorFromJwt;
    private final LoginRepository loginRepository;

    @Value("${multipart.upload.path}")
    String uploadPath;

    public RentPostResponseDto createRentPost(CreateRentPostEntityDto dto, String token) {
        //        if (!memberIdExtractorFromJwt.getMemberId(token).equals(dto.getWriterId())) {
        //            throw new CustomException(ErrorData.NOT_ALLOWED_ACCESS_RESOURCE);
        //        }
        RentPost result = rentPostRepository.save(
            rentPostMapper.CreateRentPostEntityDtoToRentPost(dto));

        return rentPostMapper.RentPostToRentPostResponseDto(result);
    }

    public RentPostResponseDto updateRentPost(@Valid UpdateRentPostDto dto, String token) {

        RentPost post = rentPostRepository.getReferenceById(dto.getPostId());

        //        if (!memberIdExtractorFromJwt.getMemberId(token).equals(post.getWriterId())) {
        //            throw new CustomException(ErrorData.NOT_ALLOWED_ACCESS_RESOURCE);
        //        }

        RentPost updatedPost = dto.updateData(post, dto);

        rentPostRepository.flush();

        return rentPostMapper.RentPostToRentPostResponseDto(updatedPost);
    }

    /**
     * <p>
     * getReferenceById는 프록시를 이용하므로 엔티티로 바로 받아오면 에러 검출이 안된다. 실제로 필드를 불러오면 예외를 확인 가능하다.
     * </p>
     */
    public void deleteRentPost(Integer postId, String token) {
        //        if (!memberIdExtractorFromJwt.getMemberId(token).equals(rentPostRepository.getReferenceById(postId).getWriterId())) {
        //            throw new CustomException(ErrorData.NOT_ALLOWED_ACCESS_RESOURCE);
        //        }
        for (Picture picture : pictureRepository.findByPostId(postId)) {
            if (new File(
                System.getProperty("user.home") + uploadPath + picture.getFileName()).delete()) {
                throw new CustomException(ErrorData.INTERNAL_SERVER_ERROR);
            }

            pictureRepository.delete(picture);
        }
        rentPostRepository.deleteById(rentPostRepository.getReferenceById(postId).getRentPostId());
    }

    public RentPostResponseDto getRentPost(Integer postId) {

        RentPost result = rentPostRepository.getReferenceById(postId);

        result.setViewCount(result.getViewCount() + 1);
        rentPostRepository.flush();

        return rentPostMapper.RentPostToRentPostResponseDto(result);
    }

    public void postImages(List<MultipartFile> files, Integer postId, String token) throws IOException {
        //        if (!memberIdExtractorFromJwt.getMemberId(token).equals(rentPostRepository.getReferenceById(postId).getWriterId())) {
        //            throw new CustomException(ErrorData.NOT_ALLOWED_ACCESS_RESOURCE);
        //        }
        if (!files.isEmpty()) {
            for (MultipartFile file : files) {
                String uuid = UUID.randomUUID().toString();
                File newFileName = new File(System.getProperty(
                    "user.home") + uploadPath + uuid + "_" + file.getOriginalFilename());
                file.transferTo(newFileName);

                pictureRepository.save(
                    new Picture(uuid + "_" + file.getOriginalFilename(), postId)).getImageId();
            }
        }
    }

    public List<Integer> getPostImages(Integer postId) {
        return pictureRepository.findByPostId(postId).stream().map(
            picture -> picture.getImageId()).collect(Collectors.toList());
    }

    public Resource getImage(Integer imageId) throws IOException {
        Path path = Paths.get(
            System.getProperty("user.home") + uploadPath + pictureRepository.getReferenceById(
                imageId).getFileName());
        return new InputStreamResource(Files.newInputStream(path));
    }

    public PagedRentPostResponseDtos getRentPosts(RentPostPageRequestDto dto, Boolean rentStatus, String category) {
        Page<RentPost> result = rentPostRepository.findAllByRentStatusAndCategoryContaining(
            dto.getPageRequest(), rentStatus, category);
        List<RentPostResponseDto> mappedResult = new ArrayList<>();
        result.stream().forEach(
            rentPost -> mappedResult.add(rentPostMapper.RentPostToRentPostResponseDto(rentPost)));
        return rentPostMapper.PagedRentPostToRentPostPagedResponseDto(mappedResult,
            result.getPageable());
    }

    public List<RentPostResponseDto> searchAll(String phrase, String category, RentPostPageRequestDto dto, Boolean rentStatus) {
        return rentPostRepository.search(phrase, category, dto.getPageRequest(),
            rentStatus).stream().map(rentPostId -> rentPostMapper.RentPostToRentPostResponseDto(
            rentPostRepository.getReferenceById(rentPostId))).collect(Collectors.toList());
    }

    public List<RentPostResponseDto> ftSearchAll(String phrase) {
        return rentPostRepository.ftSearch(phrase).stream().map(
            rentPostMapper::RentPostToRentPostResponseDto).collect(Collectors.toList());
    }
}
