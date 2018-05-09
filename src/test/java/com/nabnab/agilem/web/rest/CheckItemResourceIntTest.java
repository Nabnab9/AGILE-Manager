package com.nabnab.agilem.web.rest;

import com.nabnab.agilem.AgileManagerApp;

import com.nabnab.agilem.domain.CheckItem;
import com.nabnab.agilem.repository.CheckItemRepository;
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
 * Test class for the CheckItemResource REST controller.
 *
 * @see CheckItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AgileManagerApp.class)
public class CheckItemResourceIntTest {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CHECKED = false;
    private static final Boolean UPDATED_CHECKED = true;

    @Autowired
    private CheckItemRepository checkItemRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCheckItemMockMvc;

    private CheckItem checkItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CheckItemResource checkItemResource = new CheckItemResource(checkItemRepository);
        this.restCheckItemMockMvc = MockMvcBuilders.standaloneSetup(checkItemResource)
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
    public static CheckItem createEntity(EntityManager em) {
        CheckItem checkItem = new CheckItem()
            .label(DEFAULT_LABEL)
            .checked(DEFAULT_CHECKED);
        return checkItem;
    }

    @Before
    public void initTest() {
        checkItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createCheckItem() throws Exception {
        int databaseSizeBeforeCreate = checkItemRepository.findAll().size();

        // Create the CheckItem
        restCheckItemMockMvc.perform(post("/api/check-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkItem)))
            .andExpect(status().isCreated());

        // Validate the CheckItem in the database
        List<CheckItem> checkItemList = checkItemRepository.findAll();
        assertThat(checkItemList).hasSize(databaseSizeBeforeCreate + 1);
        CheckItem testCheckItem = checkItemList.get(checkItemList.size() - 1);
        assertThat(testCheckItem.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testCheckItem.isChecked()).isEqualTo(DEFAULT_CHECKED);
    }

    @Test
    @Transactional
    public void createCheckItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = checkItemRepository.findAll().size();

        // Create the CheckItem with an existing ID
        checkItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCheckItemMockMvc.perform(post("/api/check-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkItem)))
            .andExpect(status().isBadRequest());

        // Validate the CheckItem in the database
        List<CheckItem> checkItemList = checkItemRepository.findAll();
        assertThat(checkItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = checkItemRepository.findAll().size();
        // set the field null
        checkItem.setLabel(null);

        // Create the CheckItem, which fails.

        restCheckItemMockMvc.perform(post("/api/check-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkItem)))
            .andExpect(status().isBadRequest());

        List<CheckItem> checkItemList = checkItemRepository.findAll();
        assertThat(checkItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCheckedIsRequired() throws Exception {
        int databaseSizeBeforeTest = checkItemRepository.findAll().size();
        // set the field null
        checkItem.setChecked(null);

        // Create the CheckItem, which fails.

        restCheckItemMockMvc.perform(post("/api/check-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkItem)))
            .andExpect(status().isBadRequest());

        List<CheckItem> checkItemList = checkItemRepository.findAll();
        assertThat(checkItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCheckItems() throws Exception {
        // Initialize the database
        checkItemRepository.saveAndFlush(checkItem);

        // Get all the checkItemList
        restCheckItemMockMvc.perform(get("/api/check-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(checkItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())))
            .andExpect(jsonPath("$.[*].checked").value(hasItem(DEFAULT_CHECKED.booleanValue())));
    }

    @Test
    @Transactional
    public void getCheckItem() throws Exception {
        // Initialize the database
        checkItemRepository.saveAndFlush(checkItem);

        // Get the checkItem
        restCheckItemMockMvc.perform(get("/api/check-items/{id}", checkItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(checkItem.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()))
            .andExpect(jsonPath("$.checked").value(DEFAULT_CHECKED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCheckItem() throws Exception {
        // Get the checkItem
        restCheckItemMockMvc.perform(get("/api/check-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCheckItem() throws Exception {
        // Initialize the database
        checkItemRepository.saveAndFlush(checkItem);
        int databaseSizeBeforeUpdate = checkItemRepository.findAll().size();

        // Update the checkItem
        CheckItem updatedCheckItem = checkItemRepository.findOne(checkItem.getId());
        // Disconnect from session so that the updates on updatedCheckItem are not directly saved in db
        em.detach(updatedCheckItem);
        updatedCheckItem
            .label(UPDATED_LABEL)
            .checked(UPDATED_CHECKED);

        restCheckItemMockMvc.perform(put("/api/check-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCheckItem)))
            .andExpect(status().isOk());

        // Validate the CheckItem in the database
        List<CheckItem> checkItemList = checkItemRepository.findAll();
        assertThat(checkItemList).hasSize(databaseSizeBeforeUpdate);
        CheckItem testCheckItem = checkItemList.get(checkItemList.size() - 1);
        assertThat(testCheckItem.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testCheckItem.isChecked()).isEqualTo(UPDATED_CHECKED);
    }

    @Test
    @Transactional
    public void updateNonExistingCheckItem() throws Exception {
        int databaseSizeBeforeUpdate = checkItemRepository.findAll().size();

        // Create the CheckItem

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCheckItemMockMvc.perform(put("/api/check-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkItem)))
            .andExpect(status().isCreated());

        // Validate the CheckItem in the database
        List<CheckItem> checkItemList = checkItemRepository.findAll();
        assertThat(checkItemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCheckItem() throws Exception {
        // Initialize the database
        checkItemRepository.saveAndFlush(checkItem);
        int databaseSizeBeforeDelete = checkItemRepository.findAll().size();

        // Get the checkItem
        restCheckItemMockMvc.perform(delete("/api/check-items/{id}", checkItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CheckItem> checkItemList = checkItemRepository.findAll();
        assertThat(checkItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CheckItem.class);
        CheckItem checkItem1 = new CheckItem();
        checkItem1.setId(1L);
        CheckItem checkItem2 = new CheckItem();
        checkItem2.setId(checkItem1.getId());
        assertThat(checkItem1).isEqualTo(checkItem2);
        checkItem2.setId(2L);
        assertThat(checkItem1).isNotEqualTo(checkItem2);
        checkItem1.setId(null);
        assertThat(checkItem1).isNotEqualTo(checkItem2);
    }
}
