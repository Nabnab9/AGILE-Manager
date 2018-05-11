package com.nabnab.agilem.repository;

import com.nabnab.agilem.domain.CheckItem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CheckItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CheckItemRepository extends JpaRepository<CheckItem, Long> {

}
