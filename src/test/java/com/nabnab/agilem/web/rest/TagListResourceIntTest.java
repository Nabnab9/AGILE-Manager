package com.nabnab.agilem.web.rest;

import com.nabnab.agilem.AgileManagerApp;

import com.nabnab.agilem.domain.TagList;
import com.nabnab.agilem.repository.TagListRepository;
import com.nabnab.agilem.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.nabnab.agilem.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TagListResource REST controller.
 *
 * @see TagListResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AgileManagerApp.class)
public class TagListResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    @Autowired
    private TagListRepository tagListRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTagListMockMvc;

    private TagList tagList;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TagListResource tagListResource = new TagListResource(tagListRepository);
        this.restTagListMockMvc = MockMvcBuilders.standaloneSetup(tagListResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TagList createEntity(EntityManager em) {
        TagList tagList = new TagList()
            .title(DEFAULT_TITLE);
        return tagList;
    }

    @Before
    public void initTest() {
        tagList = createEntity(em);
    }

    @Test
    @Transactional
    public void createTagList() throws Exception {
        int databaseSizeBeforeCreate = tagListRepository.findAll().size();

        // Create the TagList
        restTagListMockMvc.perform(post("/api/tag-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tagList)))
            .andExpect(status().isCreated());

        // Validate the TagList in the database
        List<TagList> tagListList = tagListRepository.findAll();
        assertThat(tagListList).hasSize(databaseSizeBeforeCreate + 1);
        TagList testTagList = tagListList.get(tagListList.size() - 1);
        assertThat(testTagList.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    public void createTagListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tagListRepository.findAll().size();

        // Create the TagList with an existing ID
        tagList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTagListMockMvc.perform(post("/api/tag-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tagList)))
            .andExpect(status().isBadRequest());

        // Validate the TagList in the database
        List<TagList> tagListList = tagListRepository.findAll();
        assertThat(tagListList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = tagListRepository.findAll().size();
        // set the field null
        tagList.setTitle(null);

        // Create the TagList, which fails.

        restTagListMockMvc.perform(post("/api/tag-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tagList)))
            .andExpect(status().isBadRequest());

        List<TagList> tagListList = tagListRepository.findAll();
        assertThat(tagListList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTagLists() throws Exception {
        // Initialize the database
        tagListRepository.saveAndFlush(tagList);

        // Get all the tagListList
        restTagListMockMvc.perform(get("/api/tag-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tagList.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())));
    }

    @Test
    @Transactional
    public void getTagList() throws Exception {
        // Initialize the database
        tagListRepository.saveAndFlush(tagList);

        // Get the tagList
        restTagListMockMvc.perform(get("/api/tag-lists/{id}", tagList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tagList.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTagList() throws Exception {
        // Get the tagList
        restTagListMockMvc.perform(get("/api/tag-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTagList() throws Exception {
        // Initialize the database
        tagListRepository.saveAndFlush(tagList);
        int databaseSizeBeforeUpdate = tagListRepository.findAll().size();

        // Update the tagList
        TagList updatedTagList = tagListRepository.findOne(tagList.getId());
        // Disconnect from session so that the updates on updatedTagList are not directly saved in db
        em.detach(updatedTagList);
        updatedTagList
            .title(UPDATED_TITLE);

        restTagListMockMvc.perform(put("/api/tag-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTagList)))
            .andExpect(status().isOk());

        // Validate the TagList in the database
        List<TagList> tagListList = tagListRepository.findAll();
        assertThat(tagListList).hasSize(databaseSizeBeforeUpdate);
        TagList testTagList = tagListList.get(tagListList.size() - 1);
        assertThat(testTagList.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingTagList() throws Exception {
        int databaseSizeBeforeUpdate = tagListRepository.findAll().size();

        // Create the TagList

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTagListMockMvc.perform(put("/api/tag-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tagList)))
            .andExpect(status().isCreated());

        // Validate the TagList in the database
        List<TagList> tagListList = tagListRepository.findAll();
        assertThat(tagListList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTagList() throws Exception {
        // Initialize the database
        tagListRepository.saveAndFlush(tagList);
        int databaseSizeBeforeDelete = tagListRepository.findAll().size();

        // Get the tagList
        restTagListMockMvc.perform(delete("/api/tag-lists/{id}", tagList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TagList> tagListList = tagListRepository.findAll();
        assertThat(tagListList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TagList.class);
        TagList tagList1 = new TagList();
        tagList1.setId(1L);
        TagList tagList2 = new TagList();
        tagList2.setId(tagList1.getId());
        assertThat(tagList1).isEqualTo(tagList2);
        tagList2.setId(2L);
        assertThat(tagList1).isNotEqualTo(tagList2);
        tagList1.setId(null);
        assertThat(tagList1).isNotEqualTo(tagList2);
    }
}
