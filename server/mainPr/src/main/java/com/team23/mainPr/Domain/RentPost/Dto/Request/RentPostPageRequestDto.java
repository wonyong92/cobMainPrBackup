package com.team23.mainPr.Domain.RentPost.Dto.Request;

import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Data
public class RentPostPageRequestDto {

    Integer page = 0;
    Integer size = 20;
    String sort = "writeDate";

    public PageRequest getPageRequest() {
        return PageRequest.of(this.page, this.size, Sort.Direction.DESC, this.sort);
    }
}
