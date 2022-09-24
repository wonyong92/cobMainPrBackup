package com.team23.mainPr.Domain.RentPost.Repository;

import com.team23.mainPr.Domain.RentPost.Entity.RentPost;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface RentPostRepository extends JpaRepository<RentPost, Integer> {

    Page<RentPost> findAllByRentStatusFalse(Pageable pageable);

    Page<RentPost> findAllByRentStatusTrue(Pageable pageable);

    Page<RentPost> findAllByCategory(Pageable pageable, String category);

    Page<RentPost> findAllByRentStatusAndCategory(Pageable pageable, Boolean rentstatus, String category);

    Page<RentPost> findAllByRentStatusAndCategoryContaining(Pageable pageable, Boolean rentStatus, String category);

    @Query(value = " SELECT p.RENT_POST_ID FROM RENT_POST as p WHERE p.RENT_POST_NAME REGEXP ?1 and p.CATEGORY REGEXP ?2 and p.RENT_STATUS = ?3 ", nativeQuery = true)
        // native query only use order parameter
    List<Integer> search(String phrase, String category, Pageable p, Boolean rentStatus);

    @Query(value = " SELECT T.* FROM FT_SEARCH_DATA( ?1 , 0, 0) FT, RENT_POST T where T.RENT_POST_ID=FT.KEYS[1] ", nativeQuery = true)
    List<RentPost> ftSearch(String phrase);

    List<RentPost> findByWriterId(Integer memberId);

    List<RentPost> findByWriterIdOrderByRentPostIdDesc(Integer memberId);

    @Modifying
    @Transactional
    @Query(value = " CREATE ALIAS IF NOT EXISTS FT_INIT FOR \"org.h2.fulltext.FullText.init\";" + "CALL FT_INIT();\n" + "CALL FT_DROP_INDEX('PUBLIC', 'RENT_POST');\n" + "CALL FT_CREATE_INDEX('PUBLIC', 'RENT_POST', 'RENT_POST_NAME'); ", nativeQuery = true)
    void ftInit(String... strings);
}
