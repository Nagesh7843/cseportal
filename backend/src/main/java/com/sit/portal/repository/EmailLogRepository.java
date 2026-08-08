package com.sit.portal.repository;

import com.sit.portal.entity.EmailLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmailLogRepository extends JpaRepository<EmailLogEntity, Long> {
    List<EmailLogEntity> findByOrderBySentAtDesc();
}
