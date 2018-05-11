package com.nabnab.agilem.web.rest;

import com.nabnab.agilem.AgileManagerApp;

import com.nabnab.agilem.domain.CheckList;
import com.nabnab.agilem.repository.CheckListRepository;
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
 * Test class for the CheckListResource REST controller.
 *
 * @see CheckListResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AgileManagerApp.class)
public class CheckListResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    @Autowired
    private CheckListRepository checkListRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCheckListMockMvc;

    private CheckList checkList;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CheckListResource checkListResource = new CheckListResource(checkListRepository);
        this.restCheckListMockMvc = MockMvcBuilders.standaloneSetup(checkListResource)
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
    public static CheckList createEntity(EntityManager em) {
        CheckList checkList = new CheckList()
            .title(DEFAULT_TITLE);
        return checkList;
    }

    @Before
    public void initTest() {
        checkList = createEntity(em);
    }

    @Test
    @Transactional
    public void createCheckList() throws Exception {
        int databaseSizeBeforeCreate = checkListRepository.findAll().size();

        // Create the CheckList
        restCheckListMockMvc.perform(post("/api/check-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkList)))
            .andExpect(status().isCreated());

        // Validate the CheckList in the database
        List<CheckList> checkListList = checkListRepository.findAll();
        assertThat(checkListList).hasSize(databaseSizeBeforeCreate + 1);
        CheckList testCheckList = checkListList.get(checkListList.size() - 1);
        assertThat(testCheckList.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    public void createCheckListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = checkListRepository.findAll().size();

        // Create the CheckList with an existing ID
        checkList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCheckListMockMvc.perform(post("/api/check-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkList)))
            .andExpect(status().isBadRequest());

        // Validate the CheckList in the database
        List<CheckList> checkListList = checkListRepository.findAll();
        assertThat(checkListList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = checkListRepository.findAll().size();
        // set the field null
        checkList.setTitle(null);

        // Create the CheckList, which fails.

        restCheckListMockMvc.perform(post("/api/check-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkList)))
            .andExpect(status().isBadRequest());

        List<CheckList> checkListList = checkListRepository.findAll();
        assertThat(checkListList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCheckLists() throws Exception {
        // Initialize the database
        checkListRepository.saveAndFlush(checkList);

        // Get all the checkListList
        restCheckListMockMvc.perform(get("/api/check-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(checkList.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())));
    }

    @Test
    @Transactional
    public void getCheckList() throws Exception {
        // Initialize the database
        checkListRepository.saveAndFlush(checkList);

        // Get the checkList
        restCheckListMockMvc.perform(get("/api/check-lists/{id}", checkList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(checkList.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCheckList() throws Exception {
        // Get the checkList
        restCheckListMockMvc.perform(get("/api/check-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCheckList() throws Exception {
        // Initialize the database
        checkListRepository.saveAndFlush(checkList);
        int databaseSizeBeforeUpdate = checkListRepository.findAll().size();

        // Update the checkList
        CheckList updatedCheckList = checkListRepository.findOne(checkList.getId());
        // Disconnect from session so that the updates on updatedCheckList are not directly saved in db
        em.detach(updatedCheckList);
        updatedCheckList
            .title(UPDATED_TITLE);

        restCheckListMockMvc.perform(put("/api/check-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCheckList)))
            .andExpect(status().isOk());

        // Validate the CheckList in the database
        List<CheckList> checkListList = checkListRepository.findAll();
        assertThat(checkListList).hasSize(databaseSizeBeforeUpdate);
        CheckList testCheckList = checkListList.get(checkListList.size() - 1);
        assertThat(testCheckList.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingCheckList() throws Exception {
        int databaseSizeBeforeUpdate = checkListRepository.findAll().size();

        // Create the CheckList

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCheckListMockMvc.perform(put("/api/check-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkList)))
            .andExpect(status().isCreated());

        // Validate the CheckList in the database
        List<CheckList> checkListList = checkListRepository.findAll();
        assertThat(checkListList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCheckList() throws Exception {
        // Initialize the database
        checkListRepository.saveAndFlush(checkList);
        int databaseSizeBeforeDelete = checkListRepository.findAll().size();

        // Get the checkList
        restCheckListMockMvc.perform(delete("/api/check-lists/{id}", checkList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CheckList> checkListList = checkListRepository.findAll();
        assertThat(checkListList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CheckList.class);
        CheckList checkList1 = new CheckList();
        checkList1.setId(1L);
        CheckList checkList2 = new CheckList();
        checkList2.setId(checkList1.getId());
        assertThat(checkList1).isEqualTo(checkList2);
        checkList2.setId(2L);
        assertThat(checkList1).isNotEqualTo(checkList2);
        checkList1.setId(null);
        assertThat(checkList1).isNotEqualTo(checkList2);
    }
}
