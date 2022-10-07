package com.team23.mainPr.Domain.RentPost.Repository;

import com.team23.mainPr.Domain.RentPost.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Integer> {

}
