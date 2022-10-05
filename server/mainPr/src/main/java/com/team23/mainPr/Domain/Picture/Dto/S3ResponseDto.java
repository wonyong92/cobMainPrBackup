package com.team23.mainPr.Domain.Picture.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class S3ResponseDto {
    Integer imageId;
    String fileName;
}
