package com.team23.mainPr.Domain.RentPost.Entity;

import java.time.ZonedDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * <pre>
 * \@GeneratedValue(strategy = GenerationType.IDENTITY)는 적절하지 않다. - 불필요한 DB 엑세스 발생, 이후 해시값 사용 등 정말 유니크한 값을 만드는 방식을 취해야 한다.
 * </pre>
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RentPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer rentPostId;

    private String rentPostContents;
    private String rentPostName;
    @CreationTimestamp
    private ZonedDateTime writeDate;
    @UpdateTimestamp
    private ZonedDateTime updateDate;
    private Integer writerId;
    private Integer viewCount = 0;
    private Boolean rentStatus = false;
    private String category;
    private Integer rentPrice;
}
