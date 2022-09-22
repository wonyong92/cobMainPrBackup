package com.team23.mainPr.Domain.Login.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team23.mainPr.Domain.Login.Entity.Login;

public interface LoginRepository extends JpaRepository<Login, Integer> {

	Optional<Login> findByToken(String token);

	Optional<Login> findByLoginId(String loginId);

	Optional<Login> findByMemberId(Integer memberId);
}
