package com.team23.mainPr.Domain.Picture.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class download_dto {

    private String fileName; // 실제 파일 이름
    private String contentType;
}
