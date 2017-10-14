package com.yusufsoysal.kasa.web.rest;

import com.yusufsoysal.kasa.KasaApp;

import com.yusufsoysal.kasa.domain.RecurringIncome;
import com.yusufsoysal.kasa.repository.RecurringIncomeRepository;
import com.yusufsoysal.kasa.web.rest.errors.ExceptionTranslator;

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
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RecurringIncomeResource REST controller.
 *
 * @see RecurringIncomeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KasaApp.class)
public class RecurringIncomeResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_INCOME_DAY = 1;
    private static final Integer UPDATED_INCOME_DAY = 2;

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(0);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(1);

    @Autowired
    private RecurringIncomeRepository recurringIncomeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRecurringIncomeMockMvc;

    private RecurringIncome recurringIncome;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecurringIncomeResource recurringIncomeResource = new RecurringIncomeResource(recurringIncomeRepository);
        this.restRecurringIncomeMockMvc = MockMvcBuilders.standaloneSetup(recurringIncomeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RecurringIncome createEntity(EntityManager em) {
        RecurringIncome recurringIncome = new RecurringIncome()
            .description(DEFAULT_DESCRIPTION)
            .incomeDay(DEFAULT_INCOME_DAY)
            .amount(DEFAULT_AMOUNT);
        return recurringIncome;
    }

    @Before
    public void initTest() {
        recurringIncome = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecurringIncome() throws Exception {
        int databaseSizeBeforeCreate = recurringIncomeRepository.findAll().size();

        // Create the RecurringIncome
        restRecurringIncomeMockMvc.perform(post("/api/recurring-incomes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recurringIncome)))
            .andExpect(status().isCreated());

        // Validate the RecurringIncome in the database
        List<RecurringIncome> recurringIncomeList = recurringIncomeRepository.findAll();
        assertThat(recurringIncomeList).hasSize(databaseSizeBeforeCreate + 1);
        RecurringIncome testRecurringIncome = recurringIncomeList.get(recurringIncomeList.size() - 1);
        assertThat(testRecurringIncome.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRecurringIncome.getIncomeDay()).isEqualTo(DEFAULT_INCOME_DAY);
        assertThat(testRecurringIncome.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createRecurringIncomeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recurringIncomeRepository.findAll().size();

        // Create the RecurringIncome with an existing ID
        recurringIncome.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecurringIncomeMockMvc.perform(post("/api/recurring-incomes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recurringIncome)))
            .andExpect(status().isBadRequest());

        // Validate the RecurringIncome in the database
        List<RecurringIncome> recurringIncomeList = recurringIncomeRepository.findAll();
        assertThat(recurringIncomeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIncomeDayIsRequired() throws Exception {
        int databaseSizeBeforeTest = recurringIncomeRepository.findAll().size();
        // set the field null
        recurringIncome.setIncomeDay(null);

        // Create the RecurringIncome, which fails.

        restRecurringIncomeMockMvc.perform(post("/api/recurring-incomes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recurringIncome)))
            .andExpect(status().isBadRequest());

        List<RecurringIncome> recurringIncomeList = recurringIncomeRepository.findAll();
        assertThat(recurringIncomeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = recurringIncomeRepository.findAll().size();
        // set the field null
        recurringIncome.setAmount(null);

        // Create the RecurringIncome, which fails.

        restRecurringIncomeMockMvc.perform(post("/api/recurring-incomes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recurringIncome)))
            .andExpect(status().isBadRequest());

        List<RecurringIncome> recurringIncomeList = recurringIncomeRepository.findAll();
        assertThat(recurringIncomeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRecurringIncomes() throws Exception {
        // Initialize the database
        recurringIncomeRepository.saveAndFlush(recurringIncome);

        // Get all the recurringIncomeList
        restRecurringIncomeMockMvc.perform(get("/api/recurring-incomes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recurringIncome.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].incomeDay").value(hasItem(DEFAULT_INCOME_DAY)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())));
    }

    @Test
    @Transactional
    public void getRecurringIncome() throws Exception {
        // Initialize the database
        recurringIncomeRepository.saveAndFlush(recurringIncome);

        // Get the recurringIncome
        restRecurringIncomeMockMvc.perform(get("/api/recurring-incomes/{id}", recurringIncome.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recurringIncome.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.incomeDay").value(DEFAULT_INCOME_DAY))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRecurringIncome() throws Exception {
        // Get the recurringIncome
        restRecurringIncomeMockMvc.perform(get("/api/recurring-incomes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecurringIncome() throws Exception {
        // Initialize the database
        recurringIncomeRepository.saveAndFlush(recurringIncome);
        int databaseSizeBeforeUpdate = recurringIncomeRepository.findAll().size();

        // Update the recurringIncome
        RecurringIncome updatedRecurringIncome = recurringIncomeRepository.findOne(recurringIncome.getId());
        updatedRecurringIncome
            .description(UPDATED_DESCRIPTION)
            .incomeDay(UPDATED_INCOME_DAY)
            .amount(UPDATED_AMOUNT);

        restRecurringIncomeMockMvc.perform(put("/api/recurring-incomes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecurringIncome)))
            .andExpect(status().isOk());

        // Validate the RecurringIncome in the database
        List<RecurringIncome> recurringIncomeList = recurringIncomeRepository.findAll();
        assertThat(recurringIncomeList).hasSize(databaseSizeBeforeUpdate);
        RecurringIncome testRecurringIncome = recurringIncomeList.get(recurringIncomeList.size() - 1);
        assertThat(testRecurringIncome.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRecurringIncome.getIncomeDay()).isEqualTo(UPDATED_INCOME_DAY);
        assertThat(testRecurringIncome.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingRecurringIncome() throws Exception {
        int databaseSizeBeforeUpdate = recurringIncomeRepository.findAll().size();

        // Create the RecurringIncome

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRecurringIncomeMockMvc.perform(put("/api/recurring-incomes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recurringIncome)))
            .andExpect(status().isCreated());

        // Validate the RecurringIncome in the database
        List<RecurringIncome> recurringIncomeList = recurringIncomeRepository.findAll();
        assertThat(recurringIncomeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRecurringIncome() throws Exception {
        // Initialize the database
        recurringIncomeRepository.saveAndFlush(recurringIncome);
        int databaseSizeBeforeDelete = recurringIncomeRepository.findAll().size();

        // Get the recurringIncome
        restRecurringIncomeMockMvc.perform(delete("/api/recurring-incomes/{id}", recurringIncome.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RecurringIncome> recurringIncomeList = recurringIncomeRepository.findAll();
        assertThat(recurringIncomeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecurringIncome.class);
        RecurringIncome recurringIncome1 = new RecurringIncome();
        recurringIncome1.setId(1L);
        RecurringIncome recurringIncome2 = new RecurringIncome();
        recurringIncome2.setId(recurringIncome1.getId());
        assertThat(recurringIncome1).isEqualTo(recurringIncome2);
        recurringIncome2.setId(2L);
        assertThat(recurringIncome1).isNotEqualTo(recurringIncome2);
        recurringIncome1.setId(null);
        assertThat(recurringIncome1).isNotEqualTo(recurringIncome2);
    }
}
