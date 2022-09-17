package com.team23.mainPr.mainPr.Profile.Repository;

import com.team23.mainPr.Profile.Entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {
}
