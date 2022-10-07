package com.team23.mainPr.Domain.Login.Repository;

import com.team23.mainPr.Domain.Login.Entity.Login;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface LoginRepository extends JpaRepository<Login, Integer> {

    Optional<Login> findByToken(String token);

    Optional<Login> findByLoginId(String loginId);

    Optional<Login> findByMemberId(Integer memberId);

    @Modifying
    @Transactional
    @Query(
        value = "truncate table LOGIN",
        nativeQuery = true
    )
    void truncate();
}
