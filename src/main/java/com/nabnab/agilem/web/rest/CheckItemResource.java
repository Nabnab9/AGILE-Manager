package com.nabnab.agilem.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.nabnab.agilem.domain.CheckItem;

import com.nabnab.agilem.repository.CheckItemRepository;
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
 * REST controller for managing CheckItem.
 */
@RestController
@RequestMapping("/api")
public class CheckItemResource {

    private final Logger log = LoggerFactory.getLogger(CheckItemResource.class);

    private static final String ENTITY_NAME = "checkItem";

    private final CheckItemRepository checkItemRepository;

    public CheckItemResource(CheckItemRepository checkItemRepository) {
        this.checkItemRepository = checkItemRepository;
    }

    /**
     * POST  /check-items : Create a new checkItem.
     *
     * @param checkItem the checkItem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new checkItem, or with status 400 (Bad Request) if the checkItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/check-items")
    @Timed
    public ResponseEntity<CheckItem> createCheckItem(@Valid @RequestBody CheckItem checkItem) throws URISyntaxException {
        log.debug("REST request to save CheckItem : {}", checkItem);
        if (checkItem.getId() != null) {
            throw new BadRequestAlertException("A new checkItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CheckItem result = checkItemRepository.save(checkItem);
        return ResponseEntity.created(new URI("/api/check-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /check-items : Updates an existing checkItem.
     *
     * @param checkItem the checkItem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated checkItem,
     * or with status 400 (Bad Request) if the checkItem is not valid,
     * or with status 500 (Internal Server Error) if the checkItem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/check-items")
    @Timed
    public ResponseEntity<CheckItem> updateCheckItem(@Valid @RequestBody CheckItem checkItem) throws URISyntaxException {
        log.debug("REST request to update CheckItem : {}", checkItem);
        if (checkItem.getId() == null) {
            return createCheckItem(checkItem);
        }
        CheckItem result = checkItemRepository.save(checkItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, checkItem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /check-items : get all the checkItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of checkItems in body
     */
    @GetMapping("/check-items")
    @Timed
    public List<CheckItem> getAllCheckItems() {
        log.debug("REST request to get all CheckItems");
        return checkItemRepository.findAll();
        }

    /**
     * GET  /check-items/:id : get the "id" checkItem.
     *
     * @param id the id of the checkItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the checkItem, or with status 404 (Not Found)
     */
    @GetMapping("/check-items/{id}")
    @Timed
    public ResponseEntity<CheckItem> getCheckItem(@PathVariable Long id) {
        log.debug("REST request to get CheckItem : {}", id);
        CheckItem checkItem = checkItemRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(checkItem));
    }

    /**
     * DELETE  /check-items/:id : delete the "id" checkItem.
     *
     * @param id the id of the checkItem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/check-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteCheckItem(@PathVariable Long id) {
        log.debug("REST request to delete CheckItem : {}", id);
        checkItemRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
