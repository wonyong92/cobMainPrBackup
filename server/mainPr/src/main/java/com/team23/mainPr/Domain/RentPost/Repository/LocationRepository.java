package com.team23.mainPr.Domain.RentPost.Repository;

import com.team23.mainPr.Domain.RentPost.Entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location,Integer> {
}
