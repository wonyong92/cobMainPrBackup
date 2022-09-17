package com.team23.mainPr.Repository;

import com.team23.mainPr.Login.Entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, Integer> {
}
