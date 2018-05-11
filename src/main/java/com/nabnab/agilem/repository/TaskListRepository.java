package com.nabnab.agilem.repository;

import com.nabnab.agilem.domain.TaskList;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TaskList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskListRepository extends JpaRepository<TaskList, Long> {

}
