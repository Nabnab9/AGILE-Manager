package com.nabnab.agilem.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.nabnab.agilem.domain.TaskList;

import com.nabnab.agilem.repository.TaskListRepository;
import com.nabnab.agilem.web.rest.errors.BadRequestAlertException;
import com.nabnab.agilem.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TaskList.
 */
@RestController
@RequestMapping("/api")
public class TaskListResource {

    private final Logger log = LoggerFactory.getLogger(TaskListResource.class);

    private static final String ENTITY_NAME = "taskList";

    private final TaskListRepository taskListRepository;

    public TaskListResource(TaskListRepository taskListRepository) {
        this.taskListRepository = taskListRepository;
    }

    /**
     * POST  /task-lists : Create a new taskList.
     *
     * @param taskList the taskList to create
     * @return the ResponseEntity with status 201 (Created) and with body the new taskList, or with status 400 (Bad Request) if the taskList has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/task-lists")
    @Timed
    public ResponseEntity<TaskList> createTaskList(@Valid @RequestBody TaskList taskList) throws URISyntaxException {
        log.debug("REST request to save TaskList : {}", taskList);
        if (taskList.getId() != null) {
            throw new BadRequestAlertException("A new taskList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskList result = taskListRepository.save(taskList);
        return ResponseEntity.created(new URI("/api/task-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /task-lists : Updates an existing taskList.
     *
     * @param taskList the taskList to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated taskList,
     * or with status 400 (Bad Request) if the taskList is not valid,
     * or with status 500 (Internal Server Error) if the taskList couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/task-lists")
    @Timed
    public ResponseEntity<TaskList> updateTaskList(@Valid @RequestBody TaskList taskList) throws URISyntaxException {
        log.debug("REST request to update TaskList : {}", taskList);
        if (taskList.getId() == null) {
            return createTaskList(taskList);
        }
        TaskList result = taskListRepository.save(taskList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, taskList.getId().toString()))
            .body(result);
    }

    /**
     * GET  /task-lists : get all the taskLists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of taskLists in body
     */
    @GetMapping("/task-lists")
    @Timed
    public List<TaskList> getAllTaskLists() {
        log.debug("REST request to get all TaskLists");
        return taskListRepository.findAll();
        }

    /**
     * GET  /task-lists/:id : get the "id" taskList.
     *
     * @param id the id of the taskList to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the taskList, or with status 404 (Not Found)
     */
    @GetMapping("/task-lists/{id}")
    @Timed
    public ResponseEntity<TaskList> getTaskList(@PathVariable Long id) {
        log.debug("REST request to get TaskList : {}", id);
        TaskList taskList = taskListRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(taskList));
    }

    /**
     * DELETE  /task-lists/:id : delete the "id" taskList.
     *
     * @param id the id of the taskList to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/task-lists/{id}")
    @Timed
    public ResponseEntity<Void> deleteTaskList(@PathVariable Long id) {
        log.debug("REST request to delete TaskList : {}", id);
        taskListRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
