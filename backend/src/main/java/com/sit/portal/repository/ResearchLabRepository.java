package com.sit.portal.repository;

import com.sit.portal.entity.ResearchLab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResearchLabRepository extends JpaRepository<ResearchLab, Long> {
}
