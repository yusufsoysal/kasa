package com.yusufsoysal.kasa.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A RecurringIncome.
 */
@Entity
@Table(name = "recurring_income")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RecurringIncome implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @NotNull
    @Min(value = 1)
    @Max(value = 31)
    @Column(name = "income_day", nullable = false)
    private Integer incomeDay;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "amount", precision=10, scale=2, nullable = false)
    private BigDecimal amount;

    @OneToOne
    @JoinColumn(unique = true)
    private Circle circle;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public RecurringIncome description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getIncomeDay() {
        return incomeDay;
    }

    public RecurringIncome incomeDay(Integer incomeDay) {
        this.incomeDay = incomeDay;
        return this;
    }

    public void setIncomeDay(Integer incomeDay) {
        this.incomeDay = incomeDay;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public RecurringIncome amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Circle getCircle() {
        return circle;
    }

    public RecurringIncome circle(Circle circle) {
        this.circle = circle;
        return this;
    }

    public void setCircle(Circle circle) {
        this.circle = circle;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        RecurringIncome recurringIncome = (RecurringIncome) o;
        if (recurringIncome.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recurringIncome.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RecurringIncome{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", incomeDay='" + getIncomeDay() + "'" +
            ", amount='" + getAmount() + "'" +
            "}";
    }
}
