package com.team23.mainPr.RentPost.Entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.ZonedDateTime;

import static com.team23.mainPr.MainPrApplication.DEFAULT_TIME_ZONE;

/**<pre>
 * \@GeneratedValue(strategy = GenerationType.IDENTITY)는 적절하지 않다. - 불필요한 DB 엑세스 발생, 이후 해시값 사용 등 정말 유니크한 값을 만드는 방식을 취해야 한다.
 * </pre>
 * */

@Entity
@Data
public class RentPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String contents;
    private String name;
    private ZonedDateTime writeDate = ZonedDateTime.now(DEFAULT_TIME_ZONE);
    private ZonedDateTime updateDate = ZonedDateTime.now(DEFAULT_TIME_ZONE);
}
