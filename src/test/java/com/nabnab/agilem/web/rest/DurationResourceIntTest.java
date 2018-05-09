package com.nabnab.agilem.web.rest;

import com.nabnab.agilem.AgileManagerApp;

import com.nabnab.agilem.domain.Duration;
import com.nabnab.agilem.repository.DurationRepository;
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
 * Test class for the DurationResource REST controller.
 *
 * @see DurationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AgileManagerApp.class)
public class DurationResourceIntTest {

    private static final Float DEFAULT_ESTIMATED = 1F;
    private static final Float UPDATED_ESTIMATED = 2F;

    private static final Float DEFAULT_SPENT = 1F;
    private static final Float UPDATED_SPENT = 2F;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private DurationRepository durationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDurationMockMvc;

    private Duration duration;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DurationResource durationResource = new DurationResource(durationRepository);
        this.restDurationMockMvc = MockMvcBuilders.standaloneSetup(durationResource)
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
    public static Duration createEntity(EntityManager em) {
        Duration duration = new Duration()
            .estimated(DEFAULT_ESTIMATED)
            .spent(DEFAULT_SPENT)
            .name(DEFAULT_NAME);
        return duration;
    }

    @Before
    public void initTest() {
        duration = createEntity(em);
    }

    @Test
    @Transactional
    public void createDuration() throws Exception {
        int databaseSizeBeforeCreate = durationRepository.findAll().size();

        // Create the Duration
        restDurationMockMvc.perform(post("/api/durations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(duration)))
            .andExpect(status().isCreated());

        // Validate the Duration in the database
        List<Duration> durationList = durationRepository.findAll();
        assertThat(durationList).hasSize(databaseSizeBeforeCreate + 1);
        Duration testDuration = durationList.get(durationList.size() - 1);
        assertThat(testDuration.getEstimated()).isEqualTo(DEFAULT_ESTIMATED);
        assertThat(testDuration.getSpent()).isEqualTo(DEFAULT_SPENT);
        assertThat(testDuration.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createDurationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = durationRepository.findAll().size();

        // Create the Duration with an existing ID
        duration.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDurationMockMvc.perform(post("/api/durations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(duration)))
            .andExpect(status().isBadRequest());

        // Validate the Duration in the database
        List<Duration> durationList = durationRepository.findAll();
        assertThat(durationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = durationRepository.findAll().size();
        // set the field null
        duration.setName(null);

        // Create the Duration, which fails.

        restDurationMockMvc.perform(post("/api/durations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(duration)))
            .andExpect(status().isBadRequest());

        List<Duration> durationList = durationRepository.findAll();
        assertThat(durationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDurations() throws Exception {
        // Initialize the database
        durationRepository.saveAndFlush(duration);

        // Get all the durationList
        restDurationMockMvc.perform(get("/api/durations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(duration.getId().intValue())))
            .andExpect(jsonPath("$.[*].estimated").value(hasItem(DEFAULT_ESTIMATED.doubleValue())))
            .andExpect(jsonPath("$.[*].spent").value(hasItem(DEFAULT_SPENT.doubleValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getDuration() throws Exception {
        // Initialize the database
        durationRepository.saveAndFlush(duration);

        // Get the duration
        restDurationMockMvc.perform(get("/api/durations/{id}", duration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(duration.getId().intValue()))
            .andExpect(jsonPath("$.estimated").value(DEFAULT_ESTIMATED.doubleValue()))
            .andExpect(jsonPath("$.spent").value(DEFAULT_SPENT.doubleValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDuration() throws Exception {
        // Get the duration
        restDurationMockMvc.perform(get("/api/durations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDuration() throws Exception {
        // Initialize the database
        durationRepository.saveAndFlush(duration);
        int databaseSizeBeforeUpdate = durationRepository.findAll().size();

        // Update the duration
        Duration updatedDuration = durationRepository.findOne(duration.getId());
        // Disconnect from session so that the updates on updatedDuration are not directly saved in db
        em.detach(updatedDuration);
        updatedDuration
            .estimated(UPDATED_ESTIMATED)
            .spent(UPDATED_SPENT)
            .name(UPDATED_NAME);

        restDurationMockMvc.perform(put("/api/durations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDuration)))
            .andExpect(status().isOk());

        // Validate the Duration in the database
        List<Duration> durationList = durationRepository.findAll();
        assertThat(durationList).hasSize(databaseSizeBeforeUpdate);
        Duration testDuration = durationList.get(durationList.size() - 1);
        assertThat(testDuration.getEstimated()).isEqualTo(UPDATED_ESTIMATED);
        assertThat(testDuration.getSpent()).isEqualTo(UPDATED_SPENT);
        assertThat(testDuration.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingDuration() throws Exception {
        int databaseSizeBeforeUpdate = durationRepository.findAll().size();

        // Create the Duration

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDurationMockMvc.perform(put("/api/durations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(duration)))
            .andExpect(status().isCreated());

        // Validate the Duration in the database
        List<Duration> durationList = durationRepository.findAll();
        assertThat(durationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDuration() throws Exception {
        // Initialize the database
        durationRepository.saveAndFlush(duration);
        int databaseSizeBeforeDelete = durationRepository.findAll().size();

        // Get the duration
        restDurationMockMvc.perform(delete("/api/durations/{id}", duration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Duration> durationList = durationRepository.findAll();
        assertThat(durationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Duration.class);
        Duration duration1 = new Duration();
        duration1.setId(1L);
        Duration duration2 = new Duration();
        duration2.setId(duration1.getId());
        assertThat(duration1).isEqualTo(duration2);
        duration2.setId(2L);
        assertThat(duration1).isNotEqualTo(duration2);
        duration1.setId(null);
        assertThat(duration1).isNotEqualTo(duration2);
    }
}
