package com.yusufsoysal.kasa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.yusufsoysal.kasa.domain.RecurringIncome;

import com.yusufsoysal.kasa.repository.RecurringIncomeRepository;
import com.yusufsoysal.kasa.web.rest.util.HeaderUtil;
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
 * REST controller for managing RecurringIncome.
 */
@RestController
@RequestMapping("/api")
public class RecurringIncomeResource {

    private final Logger log = LoggerFactory.getLogger(RecurringIncomeResource.class);

    private static final String ENTITY_NAME = "recurringIncome";

    private final RecurringIncomeRepository recurringIncomeRepository;

    public RecurringIncomeResource(RecurringIncomeRepository recurringIncomeRepository) {
        this.recurringIncomeRepository = recurringIncomeRepository;
    }

    /**
     * POST  /recurring-incomes : Create a new recurringIncome.
     *
     * @param recurringIncome the recurringIncome to create
     * @return the ResponseEntity with status 201 (Created) and with body the new recurringIncome, or with status 400 (Bad Request) if the recurringIncome has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recurring-incomes")
    @Timed
    public ResponseEntity<RecurringIncome> createRecurringIncome(@Valid @RequestBody RecurringIncome recurringIncome) throws URISyntaxException {
        log.debug("REST request to save RecurringIncome : {}", recurringIncome);
        if (recurringIncome.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new recurringIncome cannot already have an ID")).body(null);
        }
        RecurringIncome result = recurringIncomeRepository.save(recurringIncome);
        return ResponseEntity.created(new URI("/api/recurring-incomes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recurring-incomes : Updates an existing recurringIncome.
     *
     * @param recurringIncome the recurringIncome to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recurringIncome,
     * or with status 400 (Bad Request) if the recurringIncome is not valid,
     * or with status 500 (Internal Server Error) if the recurringIncome couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recurring-incomes")
    @Timed
    public ResponseEntity<RecurringIncome> updateRecurringIncome(@Valid @RequestBody RecurringIncome recurringIncome) throws URISyntaxException {
        log.debug("REST request to update RecurringIncome : {}", recurringIncome);
        if (recurringIncome.getId() == null) {
            return createRecurringIncome(recurringIncome);
        }
        RecurringIncome result = recurringIncomeRepository.save(recurringIncome);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, recurringIncome.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recurring-incomes : get all the recurringIncomes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of recurringIncomes in body
     */
    @GetMapping("/recurring-incomes")
    @Timed
    public List<RecurringIncome> getAllRecurringIncomes() {
        log.debug("REST request to get all RecurringIncomes");
        return recurringIncomeRepository.findAll();
        }

    /**
     * GET  /recurring-incomes/:id : get the "id" recurringIncome.
     *
     * @param id the id of the recurringIncome to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the recurringIncome, or with status 404 (Not Found)
     */
    @GetMapping("/recurring-incomes/{id}")
    @Timed
    public ResponseEntity<RecurringIncome> getRecurringIncome(@PathVariable Long id) {
        log.debug("REST request to get RecurringIncome : {}", id);
        RecurringIncome recurringIncome = recurringIncomeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(recurringIncome));
    }

    /**
     * DELETE  /recurring-incomes/:id : delete the "id" recurringIncome.
     *
     * @param id the id of the recurringIncome to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recurring-incomes/{id}")
    @Timed
    public ResponseEntity<Void> deleteRecurringIncome(@PathVariable Long id) {
        log.debug("REST request to delete RecurringIncome : {}", id);
        recurringIncomeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
