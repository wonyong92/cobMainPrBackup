package com.team23.mainPr.SellPost.Entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalTime;

@Entity
@Data
public class SellPost {

    @Id
    public Integer id;
    public String contents;
    public String name;
    @CreationTimestamp
    public LocalTime writeDate;
    @LastModifiedDate
    public LocalTime updateDate;
}
