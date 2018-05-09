package com.nabnab.agilem.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.nabnab.agilem.domain.CheckList;

import com.nabnab.agilem.repository.CheckListRepository;
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
 * REST controller for managing CheckList.
 */
@RestController
@RequestMapping("/api")
public class CheckListResource {

    private final Logger log = LoggerFactory.getLogger(CheckListResource.class);

    private static final String ENTITY_NAME = "checkList";

    private final CheckListRepository checkListRepository;

    public CheckListResource(CheckListRepository checkListRepository) {
        this.checkListRepository = checkListRepository;
    }

    /**
     * POST  /check-lists : Create a new checkList.
     *
     * @param checkList the checkList to create
     * @return the ResponseEntity with status 201 (Created) and with body the new checkList, or with status 400 (Bad Request) if the checkList has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/check-lists")
    @Timed
    public ResponseEntity<CheckList> createCheckList(@Valid @RequestBody CheckList checkList) throws URISyntaxException {
        log.debug("REST request to save CheckList : {}", checkList);
        if (checkList.getId() != null) {
            throw new BadRequestAlertException("A new checkList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CheckList result = checkListRepository.save(checkList);
        return ResponseEntity.created(new URI("/api/check-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /check-lists : Updates an existing checkList.
     *
     * @param checkList the checkList to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated checkList,
     * or with status 400 (Bad Request) if the checkList is not valid,
     * or with status 500 (Internal Server Error) if the checkList couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/check-lists")
    @Timed
    public ResponseEntity<CheckList> updateCheckList(@Valid @RequestBody CheckList checkList) throws URISyntaxException {
        log.debug("REST request to update CheckList : {}", checkList);
        if (checkList.getId() == null) {
            return createCheckList(checkList);
        }
        CheckList result = checkListRepository.save(checkList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, checkList.getId().toString()))
            .body(result);
    }

    /**
     * GET  /check-lists : get all the checkLists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of checkLists in body
     */
    @GetMapping("/check-lists")
    @Timed
    public List<CheckList> getAllCheckLists() {
        log.debug("REST request to get all CheckLists");
        return checkListRepository.findAll();
        }

    /**
     * GET  /check-lists/:id : get the "id" checkList.
     *
     * @param id the id of the checkList to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the checkList, or with status 404 (Not Found)
     */
    @GetMapping("/check-lists/{id}")
    @Timed
    public ResponseEntity<CheckList> getCheckList(@PathVariable Long id) {
        log.debug("REST request to get CheckList : {}", id);
        CheckList checkList = checkListRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(checkList));
    }

    /**
     * DELETE  /check-lists/:id : delete the "id" checkList.
     *
     * @param id the id of the checkList to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/check-lists/{id}")
    @Timed
    public ResponseEntity<Void> deleteCheckList(@PathVariable Long id) {
        log.debug("REST request to delete CheckList : {}", id);
        checkListRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
