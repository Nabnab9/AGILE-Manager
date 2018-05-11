package com.nabnab.agilem.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.nabnab.agilem.domain.TagList;

import com.nabnab.agilem.repository.TagListRepository;
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
 * REST controller for managing TagList.
 */
@RestController
@RequestMapping("/api")
public class TagListResource {

    private final Logger log = LoggerFactory.getLogger(TagListResource.class);

    private static final String ENTITY_NAME = "tagList";

    private final TagListRepository tagListRepository;

    public TagListResource(TagListRepository tagListRepository) {
        this.tagListRepository = tagListRepository;
    }

    /**
     * POST  /tag-lists : Create a new tagList.
     *
     * @param tagList the tagList to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tagList, or with status 400 (Bad Request) if the tagList has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tag-lists")
    @Timed
    public ResponseEntity<TagList> createTagList(@Valid @RequestBody TagList tagList) throws URISyntaxException {
        log.debug("REST request to save TagList : {}", tagList);
        if (tagList.getId() != null) {
            throw new BadRequestAlertException("A new tagList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TagList result = tagListRepository.save(tagList);
        return ResponseEntity.created(new URI("/api/tag-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tag-lists : Updates an existing tagList.
     *
     * @param tagList the tagList to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tagList,
     * or with status 400 (Bad Request) if the tagList is not valid,
     * or with status 500 (Internal Server Error) if the tagList couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tag-lists")
    @Timed
    public ResponseEntity<TagList> updateTagList(@Valid @RequestBody TagList tagList) throws URISyntaxException {
        log.debug("REST request to update TagList : {}", tagList);
        if (tagList.getId() == null) {
            return createTagList(tagList);
        }
        TagList result = tagListRepository.save(tagList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tagList.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tag-lists : get all the tagLists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tagLists in body
     */
    @GetMapping("/tag-lists")
    @Timed
    public List<TagList> getAllTagLists() {
        log.debug("REST request to get all TagLists");
        return tagListRepository.findAll();
        }

    /**
     * GET  /tag-lists/:id : get the "id" tagList.
     *
     * @param id the id of the tagList to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tagList, or with status 404 (Not Found)
     */
    @GetMapping("/tag-lists/{id}")
    @Timed
    public ResponseEntity<TagList> getTagList(@PathVariable Long id) {
        log.debug("REST request to get TagList : {}", id);
        TagList tagList = tagListRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tagList));
    }

    /**
     * DELETE  /tag-lists/:id : delete the "id" tagList.
     *
     * @param id the id of the tagList to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tag-lists/{id}")
    @Timed
    public ResponseEntity<Void> deleteTagList(@PathVariable Long id) {
        log.debug("REST request to delete TagList : {}", id);
        tagListRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
