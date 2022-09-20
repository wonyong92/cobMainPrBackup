package com.team23.mainPr.Domain.Login.Repository;

import com.team23.mainPr.Domain.Login.Entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginRepository extends JpaRepository<Login, Integer> {

    Optional<Login> findByToken(String token);

    Optional<Login> findByLoginId(String loginId);

    Optional<Login> findByMemberId(Integer memberId);
}
