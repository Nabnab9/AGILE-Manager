package com.nabnab.agilem.repository;

import com.nabnab.agilem.domain.TagList;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TagList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TagListRepository extends JpaRepository<TagList, Long> {

}
