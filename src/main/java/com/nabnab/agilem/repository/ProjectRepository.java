package com.nabnab.agilem.repository;

import com.nabnab.agilem.domain.Project;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Project entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("select distinct project from Project project left join fetch project.userExtras")
    List<Project> findAllWithEagerRelationships();

    @Query("select project from Project project left join fetch project.userExtras where project.id =:id")
    Project findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select distinct project from Project project inner join project.userExtras as uxs inner join uxs.user as user where user.login =:login")
    List<Project> findAllByUserLogin(@Param("login") String login);

}
