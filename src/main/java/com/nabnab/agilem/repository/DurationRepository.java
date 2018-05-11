package com.nabnab.agilem.repository;

import com.nabnab.agilem.domain.Duration;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Duration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DurationRepository extends JpaRepository<Duration, Long> {

}
