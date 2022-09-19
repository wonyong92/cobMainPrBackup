package com.team23.mainPr.Domain.Picture.Controller;


import com.team23.mainPr.Domain.Picture.Service.PictureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class controller {

    private final PictureService pictureService;

    @GetMapping
    public ResponseEntity download(@RequestParam Integer memberId) throws IOException {

        pictureService.setDefaultImage();

        return new ResponseEntity("added",HttpStatus.OK);
    }
}
