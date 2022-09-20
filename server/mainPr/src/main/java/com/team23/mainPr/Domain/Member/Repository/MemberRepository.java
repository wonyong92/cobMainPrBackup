package com.team23.mainPr.Domain.Member.Repository;

import com.team23.mainPr.Domain.Member.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    //optional 의 메소드를 활용하여 불필요한 if 문, 데이터 존재 확인에 대한 null 처리를 제거 할 수 있었다.
    Optional<Member> findByLoginId(String loginId);

    Optional<Member> findByEmail(String email);

}
