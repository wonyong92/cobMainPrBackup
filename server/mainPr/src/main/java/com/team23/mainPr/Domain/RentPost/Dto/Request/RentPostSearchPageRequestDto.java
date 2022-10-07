package com.team23.mainPr.Domain.RentPost.Dto.Request;

import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Data
public class RentPostSearchPageRequestDto {

    Integer page = 0;
    Integer size = 20;
    String sort = "writeDate";


    public PageRequest getPageRequest() {
        if(this.sort.equals("writeDate"))
            this.sort = "WRITE_DATE";
        else if(this.sort.equals("viewCount"))
            this.sort = "VIEW_COUNT";
        return PageRequest.of(this.page, this.size, Sort.Direction.DESC, this.sort);
    }
}
