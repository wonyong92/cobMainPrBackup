package com.team23.mainPr.RentPost.Entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

/*
 * refactor : @GeneratedValue(strategy = GenerationType.IDENTITY)는 적절하지 않다. - 불필요한 DB 엑세스 발생, 이후 해시값 사용 등 정말 유니크한 값을 만드는 방식을 취해야 한다.
 * */

@Entity
@Data
public class RentPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;
    public String contents;
    public String name;
    public ZonedDateTime writeDate = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
    public ZonedDateTime updateDate = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
}
