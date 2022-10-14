package com.team23.mainPr.Domain.RentPost.Service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.team23.mainPr.Domain.Comment.Entity.Comment;
import com.team23.mainPr.Domain.Comment.Repository.CommentRepository;
import com.team23.mainPr.Domain.Picture.Entity.Picture;
import com.team23.mainPr.Domain.Picture.Repository.PictureRepository;
import com.team23.mainPr.Domain.RentPost.Dto.Request.CreateRentPostEntityDto;
import com.team23.mainPr.Domain.RentPost.Dto.Request.RentPostPageRequestDto;
import com.team23.mainPr.Domain.RentPost.Dto.Request.RentPostSearchPageRequestDto;
import com.team23.mainPr.Domain.RentPost.Dto.Request.UpdateRentPostDto;
import com.team23.mainPr.Domain.RentPost.Dto.Response.CategoryLocationResponseDto;
import com.team23.mainPr.Domain.RentPost.Dto.Response.PagedRentPostResponseDtos;
import com.team23.mainPr.Domain.RentPost.Dto.Response.RentPostResponseDto;
import com.team23.mainPr.Domain.RentPost.Entity.RentPost;
import com.team23.mainPr.Domain.RentPost.Mapper.CategoryMapper;
import com.team23.mainPr.Domain.RentPost.Mapper.LocationMapper;
import com.team23.mainPr.Domain.RentPost.Mapper.RentPostMapper;
import com.team23.mainPr.Domain.RentPost.Repository.CategoryRepository;
import com.team23.mainPr.Domain.RentPost.Repository.LocationRepository;
import com.team23.mainPr.Domain.RentPost.Repository.RentPostRepository;
import com.team23.mainPr.Global.CommonMethod.MemberIdExtractorFromJwt;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.CustomException.ErrorData;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * <pre>
 * 어떤 작성자 정보를 넣을까.
 * 외래키 연관 관계 생성을 통해 데이터 무결성을 지킬것인가? 아니면 분리하여 서비스의 분리도를 높일 것인가?
 * save가 작동하지 않으면 백퍼센트 pk에 널이 들어갔거나 , 생성 시퀀스에 문제가 있는것
 * </pre>
 */
@Service
@Transactional
@RequiredArgsConstructor
public class RentPostService {

    private final RentPostRepository rentPostRepository;
    private final RentPostMapper rentPostMapper;
    private final PictureRepository pictureRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final LocationRepository locationRepository;
    private final LocationMapper locationMapper;
    private final MemberIdExtractorFromJwt memberIdExtractorFromJwt;
    private final CommentRepository commentRepository;
    private final AmazonS3 amazonS3;
    @Value("${multipart.upload.path}") String uploadPath;
    @Value("${cloud.aws.s3.bucket}") private String bucket;
    @Value("${cloud.aws.credentials.accessKey}") private String accesskey;
    @Value("${cloud.aws.credentials.secretKey}") private String secretkey;

    public RentPostResponseDto createRentPost(CreateRentPostEntityDto dto, String token) {
        if (!memberIdExtractorFromJwt.getMemberId(token).equals(dto.getWriterId())) {
            throw new CustomException(ErrorData.NOT_ALLOWED_ACCESS_RESOURCE);
        }
        RentPost result = rentPostRepository.save(rentPostMapper.CreateRentPostEntityDtoToRentPost(dto));

        return rentPostMapper.RentPostToRentPostResponseDto(result);
    }

    public com.amazonaws.services.s3.AmazonS3 getAmazonS3() {
        return AmazonS3ClientBuilder.standard().withCredentials(new AWSCredentialsProvider() {
            @Override
            public AWSCredentials getCredentials() {
                return new BasicAWSCredentials(accesskey, secretkey);
            }

            @Override
            public void refresh() {

            }
        }).withRegion("ap-northeast-2").build();
    }

    public RentPostResponseDto updateRentPost(@Valid UpdateRentPostDto dto, String token) {
        RentPost post = rentPostRepository.getReferenceById(dto.getPostId());

        if (!memberIdExtractorFromJwt.getMemberId(token).equals(post.getWriterId())) {
            throw new CustomException(ErrorData.NOT_ALLOWED_ACCESS_RESOURCE);
        }
        AmazonS3 s3client = this.getAmazonS3();
        for (Integer pictureId : dto.getDeleteImages()) {
            if (this.getPostImages(dto.getPostId()).contains(pictureId)) {
                Picture picture = pictureRepository.getReferenceById(pictureId);
                s3client.deleteObject(new DeleteObjectRequest(bucket, picture.getFileName()));
                pictureRepository.delete(picture);
            }
        }

        RentPost updatedPost = dto.updateData(post, dto);

        rentPostRepository.flush();
        RentPostResponseDto result = rentPostMapper.RentPostToRentPostResponseDto(updatedPost);
        result.setRentPostImages(pictureRepository.findByRentPostId(updatedPost.getRentPostId()).stream().map(picture -> picture.getPictureId()).collect(Collectors.toList()));
        return result;
    }

    /**
     * <p>
     * getReferenceById는 프록시를 이용하므로 엔티티로 바로 받아오면 에러 검출이 안된다. 실제로 필드를 불러오면 예외를 확인 가능하다.
     * </p>
     */
    public void deleteRentPost(Integer postId, String token) {
        for (Picture picture : pictureRepository.findByRentPostId(postId)) {
            File file = new File(System.getProperty("user.home") + "/" + uploadPath + pictureRepository.getReferenceById(picture.getPictureId()).getFileName());
            if (!file.exists()) {
                throw new CustomException(ErrorData.FILE_NOT_FOUND);
            }
            if (!file.delete()) {
                throw new CustomException(ErrorData.FILE_DELETE_ERROR);
            }
            pictureRepository.delete(picture);
        }

        for (Comment comment : commentRepository.findAllByTargetPostId(postId)) {
            commentRepository.delete(comment);
        }

        rentPostRepository.deleteById(rentPostRepository.getReferenceById(postId).getRentPostId());
    }

    public RentPostResponseDto getRentPost(Integer postId) {

        RentPost result = rentPostRepository.getReferenceById(postId);

        result.setViewCount(result.getViewCount() + 1);

        rentPostRepository.flush();
        RentPostResponseDto response = rentPostMapper.RentPostToRentPostResponseDto(result);
        response.setRentPostImages(pictureRepository.findByRentPostId(postId).stream().map(picture -> picture.getPictureId()).collect(Collectors.toList()));

        return response;
    }

    public void postImages(List<MultipartFile> files, Integer postId, String token) throws IOException {
        if (!files.isEmpty()) {
            ObjectMetadata objMeta = new ObjectMetadata();
            for (MultipartFile file : files) {
                String s3FileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
                objMeta.setContentType(file.getContentType());
                objMeta.setContentLength(file.getInputStream().available());
                amazonS3.putObject(bucket, s3FileName, file.getInputStream(), objMeta);

                pictureRepository.save(new Picture(s3FileName, postId)).getPictureId();
            }
        }
    }

    public List<Integer> getPostImages(Integer postId) {
        return pictureRepository.findByRentPostId(postId).stream().map(picture -> picture.getPictureId()).collect(Collectors.toList());
    }

    public Resource getImage(Integer imageId) throws IOException {
        Path path = Paths.get(System.getProperty("user.home") + uploadPath + pictureRepository.getReferenceById(imageId).getFileName());
        return new InputStreamResource(Files.newInputStream(path));
    }

    public Resource getS3Image(Integer imageId) {
        AmazonS3 s3client = this.getAmazonS3();
        S3Object s3object = s3client.getObject(bucket, pictureRepository.getReferenceById(imageId).getFileName());
        S3ObjectInputStream inputStream = s3object.getObjectContent();

        return new InputStreamResource(inputStream);
    }

    public void deleteS3RentPost(Integer postId, String token) {
        AmazonS3 s3client = this.getAmazonS3();
        for (Picture picture : pictureRepository.findByRentPostId(postId)) {
            s3client.deleteObject(new DeleteObjectRequest(bucket, picture.getFileName()));
            pictureRepository.delete(picture);
        }

        for (Comment comment : commentRepository.findAllByTargetPostId(postId)) {
            commentRepository.delete(comment);
        }

        rentPostRepository.deleteById(rentPostRepository.getReferenceById(postId).getRentPostId());
    }

    public PagedRentPostResponseDtos getRentPosts(RentPostPageRequestDto dto, Boolean rentStatus, String category, String location) {
        Page<RentPost> result = rentPostRepository.findAllByRentStatusAndCategoryContainingAndLocationContaining(dto.getPageRequest(), rentStatus, category, location);

        return rentPostMapper.PagedRentPostToRentPostPagedResponseDto(result.stream().map(rentPost -> rentPostMapper.RentPostToRentPostResponseDto(rentPost)).collect(Collectors.toList()), result.getPageable(), result.getTotalPages(), result.getTotalElements());
    }

    public PagedRentPostResponseDtos searchAll(String phrase, String category, RentPostSearchPageRequestDto dto, Boolean rentStatus) {
        Page<RentPost> result = rentPostRepository.search(phrase, category, dto.getPageRequest(), rentStatus);
        return rentPostMapper.PagedRentPostToRentPostPagedResponseDto(result.stream().map(rentPost -> rentPostMapper.RentPostToRentPostResponseDto(rentPost)).collect(Collectors.toList()), result.getPageable(), result.getTotalPages(), result.getTotalElements());
    }

    public List<RentPostResponseDto> ftSearchAll(String phrase) {
        return rentPostRepository.ftSearch(phrase).stream().map(rentPostMapper::RentPostToRentPostResponseDto).collect(Collectors.toList());
    }

    public CategoryLocationResponseDto getCategories() {
        return new CategoryLocationResponseDto(categoryRepository.findAll().stream().map(category -> categoryMapper.CategoryToCategoryResponseDto(category)).collect(Collectors.toList()), locationRepository.findAll().stream().map(location -> locationMapper.LocationToLocationResponseDto(location)).collect(Collectors.toList()));
    }
}
