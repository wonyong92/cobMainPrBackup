package com.team23.mainPr.Domain.Picture.Controller;

import com.team23.mainPr.Domain.Picture.Dto.S3ResponseDto;
import com.team23.mainPr.Domain.Picture.Service.PictureService;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class controller {

    private final PictureService pictureService;

    @Operation(description = "디폴트 프로필 이미지 등록 - 사용자용 api 아님")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void download() throws Exception {
        pictureService.setDefaultImage();
    }

    @PostMapping("s3")
    @ResponseStatus(HttpStatus.CREATED)
    public List<S3ResponseDto> s3upload(@RequestParam List<MultipartFile> multipartFile) throws Exception {
        return pictureService.upload(multipartFile);
    }
}
