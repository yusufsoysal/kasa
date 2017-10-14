package com.yusufsoysal.kasa.repository;

import com.yusufsoysal.kasa.domain.RecurringIncome;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RecurringIncome entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecurringIncomeRepository extends JpaRepository<RecurringIncome, Long> {

}
