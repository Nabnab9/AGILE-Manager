package com.nabnab.agilem.web.rest;

import com.nabnab.agilem.AgileManagerApp;

import com.nabnab.agilem.domain.TaskList;
import com.nabnab.agilem.repository.TaskListRepository;
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
 * Test class for the TaskListResource REST controller.
 *
 * @see TaskListResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AgileManagerApp.class)
public class TaskListResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_ORDER = 1;
    private static final Integer UPDATED_ORDER = 2;

    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTaskListMockMvc;

    private TaskList taskList;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TaskListResource taskListResource = new TaskListResource(taskListRepository);
        this.restTaskListMockMvc = MockMvcBuilders.standaloneSetup(taskListResource)
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
    public static TaskList createEntity(EntityManager em) {
        TaskList taskList = new TaskList()
            .name(DEFAULT_NAME)
            .order(DEFAULT_ORDER);
        return taskList;
    }

    @Before
    public void initTest() {
        taskList = createEntity(em);
    }

    @Test
    @Transactional
    public void createTaskList() throws Exception {
        int databaseSizeBeforeCreate = taskListRepository.findAll().size();

        // Create the TaskList
        restTaskListMockMvc.perform(post("/api/task-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskList)))
            .andExpect(status().isCreated());

        // Validate the TaskList in the database
        List<TaskList> taskListList = taskListRepository.findAll();
        assertThat(taskListList).hasSize(databaseSizeBeforeCreate + 1);
        TaskList testTaskList = taskListList.get(taskListList.size() - 1);
        assertThat(testTaskList.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTaskList.getOrder()).isEqualTo(DEFAULT_ORDER);
    }

    @Test
    @Transactional
    public void createTaskListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taskListRepository.findAll().size();

        // Create the TaskList with an existing ID
        taskList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskListMockMvc.perform(post("/api/task-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskList)))
            .andExpect(status().isBadRequest());

        // Validate the TaskList in the database
        List<TaskList> taskListList = taskListRepository.findAll();
        assertThat(taskListList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskListRepository.findAll().size();
        // set the field null
        taskList.setName(null);

        // Create the TaskList, which fails.

        restTaskListMockMvc.perform(post("/api/task-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskList)))
            .andExpect(status().isBadRequest());

        List<TaskList> taskListList = taskListRepository.findAll();
        assertThat(taskListList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOrderIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskListRepository.findAll().size();
        // set the field null
        taskList.setOrder(null);

        // Create the TaskList, which fails.

        restTaskListMockMvc.perform(post("/api/task-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskList)))
            .andExpect(status().isBadRequest());

        List<TaskList> taskListList = taskListRepository.findAll();
        assertThat(taskListList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTaskLists() throws Exception {
        // Initialize the database
        taskListRepository.saveAndFlush(taskList);

        // Get all the taskListList
        restTaskListMockMvc.perform(get("/api/task-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskList.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].order").value(hasItem(DEFAULT_ORDER)));
    }

    @Test
    @Transactional
    public void getTaskList() throws Exception {
        // Initialize the database
        taskListRepository.saveAndFlush(taskList);

        // Get the taskList
        restTaskListMockMvc.perform(get("/api/task-lists/{id}", taskList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(taskList.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.order").value(DEFAULT_ORDER));
    }

    @Test
    @Transactional
    public void getNonExistingTaskList() throws Exception {
        // Get the taskList
        restTaskListMockMvc.perform(get("/api/task-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTaskList() throws Exception {
        // Initialize the database
        taskListRepository.saveAndFlush(taskList);
        int databaseSizeBeforeUpdate = taskListRepository.findAll().size();

        // Update the taskList
        TaskList updatedTaskList = taskListRepository.findOne(taskList.getId());
        // Disconnect from session so that the updates on updatedTaskList are not directly saved in db
        em.detach(updatedTaskList);
        updatedTaskList
            .name(UPDATED_NAME)
            .order(UPDATED_ORDER);

        restTaskListMockMvc.perform(put("/api/task-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTaskList)))
            .andExpect(status().isOk());

        // Validate the TaskList in the database
        List<TaskList> taskListList = taskListRepository.findAll();
        assertThat(taskListList).hasSize(databaseSizeBeforeUpdate);
        TaskList testTaskList = taskListList.get(taskListList.size() - 1);
        assertThat(testTaskList.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTaskList.getOrder()).isEqualTo(UPDATED_ORDER);
    }

    @Test
    @Transactional
    public void updateNonExistingTaskList() throws Exception {
        int databaseSizeBeforeUpdate = taskListRepository.findAll().size();

        // Create the TaskList

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTaskListMockMvc.perform(put("/api/task-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskList)))
            .andExpect(status().isCreated());

        // Validate the TaskList in the database
        List<TaskList> taskListList = taskListRepository.findAll();
        assertThat(taskListList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTaskList() throws Exception {
        // Initialize the database
        taskListRepository.saveAndFlush(taskList);
        int databaseSizeBeforeDelete = taskListRepository.findAll().size();

        // Get the taskList
        restTaskListMockMvc.perform(delete("/api/task-lists/{id}", taskList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TaskList> taskListList = taskListRepository.findAll();
        assertThat(taskListList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaskList.class);
        TaskList taskList1 = new TaskList();
        taskList1.setId(1L);
        TaskList taskList2 = new TaskList();
        taskList2.setId(taskList1.getId());
        assertThat(taskList1).isEqualTo(taskList2);
        taskList2.setId(2L);
        assertThat(taskList1).isNotEqualTo(taskList2);
        taskList1.setId(null);
        assertThat(taskList1).isNotEqualTo(taskList2);
    }
}
