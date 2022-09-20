package com.team23.mainPr.Domain.RentHistory.Repository;

import com.team23.mainPr.Domain.RentHistory.Entity.RentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RentHistoryRepository extends JpaRepository<RentHistory, Integer> {

    Optional<List<RentHistory>> findByRequesterIdAndRentDataTypeFalse(Integer memberId);

    Optional<List<RentHistory>> findByTargetMemberIdAndRentDataTypeTrue(Integer memberId);
}
