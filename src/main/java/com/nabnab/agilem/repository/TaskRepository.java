package com.nabnab.agilem.repository;

import com.nabnab.agilem.domain.Task;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Task entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("select distinct task from Task task left join fetch task.userExtras")
    List<Task> findAllWithEagerRelationships();

    @Query("select task from Task task left join fetch task.userExtras where task.id =:id")
    Task findOneWithEagerRelationships(@Param("id") Long id);

}
