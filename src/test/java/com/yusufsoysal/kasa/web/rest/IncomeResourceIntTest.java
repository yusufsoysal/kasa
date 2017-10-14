package com.yusufsoysal.kasa.web.rest;

import com.yusufsoysal.kasa.KasaApp;

import com.yusufsoysal.kasa.domain.Income;
import com.yusufsoysal.kasa.repository.IncomeRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.yusufsoysal.kasa.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the IncomeResource REST controller.
 *
 * @see IncomeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KasaApp.class)
public class IncomeResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_INCOME_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_INCOME_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(0);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(1);

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIncomeMockMvc;

    private Income income;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IncomeResource incomeResource = new IncomeResource(incomeRepository);
        this.restIncomeMockMvc = MockMvcBuilders.standaloneSetup(incomeResource)
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
    public static Income createEntity(EntityManager em) {
        Income income = new Income()
            .description(DEFAULT_DESCRIPTION)
            .incomeDate(DEFAULT_INCOME_DATE)
            .amount(DEFAULT_AMOUNT);
        return income;
    }

    @Before
    public void initTest() {
        income = createEntity(em);
    }

    @Test
    @Transactional
    public void createIncome() throws Exception {
        int databaseSizeBeforeCreate = incomeRepository.findAll().size();

        // Create the Income
        restIncomeMockMvc.perform(post("/api/incomes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(income)))
            .andExpect(status().isCreated());

        // Validate the Income in the database
        List<Income> incomeList = incomeRepository.findAll();
        assertThat(incomeList).hasSize(databaseSizeBeforeCreate + 1);
        Income testIncome = incomeList.get(incomeList.size() - 1);
        assertThat(testIncome.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testIncome.getIncomeDate()).isEqualTo(DEFAULT_INCOME_DATE);
        assertThat(testIncome.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createIncomeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = incomeRepository.findAll().size();

        // Create the Income with an existing ID
        income.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIncomeMockMvc.perform(post("/api/incomes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(income)))
            .andExpect(status().isBadRequest());

        // Validate the Income in the database
        List<Income> incomeList = incomeRepository.findAll();
        assertThat(incomeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIncomeDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = incomeRepository.findAll().size();
        // set the field null
        income.setIncomeDate(null);

        // Create the Income, which fails.

        restIncomeMockMvc.perform(post("/api/incomes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(income)))
            .andExpect(status().isBadRequest());

        List<Income> incomeList = incomeRepository.findAll();
        assertThat(incomeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = incomeRepository.findAll().size();
        // set the field null
        income.setAmount(null);

        // Create the Income, which fails.

        restIncomeMockMvc.perform(post("/api/incomes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(income)))
            .andExpect(status().isBadRequest());

        List<Income> incomeList = incomeRepository.findAll();
        assertThat(incomeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIncomes() throws Exception {
        // Initialize the database
        incomeRepository.saveAndFlush(income);

        // Get all the incomeList
        restIncomeMockMvc.perform(get("/api/incomes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(income.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].incomeDate").value(hasItem(sameInstant(DEFAULT_INCOME_DATE))))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())));
    }

    @Test
    @Transactional
    public void getIncome() throws Exception {
        // Initialize the database
        incomeRepository.saveAndFlush(income);

        // Get the income
        restIncomeMockMvc.perform(get("/api/incomes/{id}", income.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(income.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.incomeDate").value(sameInstant(DEFAULT_INCOME_DATE)))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingIncome() throws Exception {
        // Get the income
        restIncomeMockMvc.perform(get("/api/incomes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIncome() throws Exception {
        // Initialize the database
        incomeRepository.saveAndFlush(income);
        int databaseSizeBeforeUpdate = incomeRepository.findAll().size();

        // Update the income
        Income updatedIncome = incomeRepository.findOne(income.getId());
        updatedIncome
            .description(UPDATED_DESCRIPTION)
            .incomeDate(UPDATED_INCOME_DATE)
            .amount(UPDATED_AMOUNT);

        restIncomeMockMvc.perform(put("/api/incomes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIncome)))
            .andExpect(status().isOk());

        // Validate the Income in the database
        List<Income> incomeList = incomeRepository.findAll();
        assertThat(incomeList).hasSize(databaseSizeBeforeUpdate);
        Income testIncome = incomeList.get(incomeList.size() - 1);
        assertThat(testIncome.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testIncome.getIncomeDate()).isEqualTo(UPDATED_INCOME_DATE);
        assertThat(testIncome.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingIncome() throws Exception {
        int databaseSizeBeforeUpdate = incomeRepository.findAll().size();

        // Create the Income

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIncomeMockMvc.perform(put("/api/incomes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(income)))
            .andExpect(status().isCreated());

        // Validate the Income in the database
        List<Income> incomeList = incomeRepository.findAll();
        assertThat(incomeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIncome() throws Exception {
        // Initialize the database
        incomeRepository.saveAndFlush(income);
        int databaseSizeBeforeDelete = incomeRepository.findAll().size();

        // Get the income
        restIncomeMockMvc.perform(delete("/api/incomes/{id}", income.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Income> incomeList = incomeRepository.findAll();
        assertThat(incomeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Income.class);
        Income income1 = new Income();
        income1.setId(1L);
        Income income2 = new Income();
        income2.setId(income1.getId());
        assertThat(income1).isEqualTo(income2);
        income2.setId(2L);
        assertThat(income1).isNotEqualTo(income2);
        income1.setId(null);
        assertThat(income1).isNotEqualTo(income2);
    }
}
