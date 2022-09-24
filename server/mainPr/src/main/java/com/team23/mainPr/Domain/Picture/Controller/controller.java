package com.team23.mainPr.Domain.Picture.Controller;

import com.team23.mainPr.Domain.Picture.Service.PictureService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class controller {

    private final PictureService pictureService;

    @Operation(description = "디폴트 프로필 이미지 등록 - 사용자용 api 아님")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void download() {
        pictureService.setDefaultImage();
    }
}
