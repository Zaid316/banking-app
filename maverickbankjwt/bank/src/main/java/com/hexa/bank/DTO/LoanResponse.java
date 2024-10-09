package com.hexa.bank.DTO;

import java.math.BigDecimal;
import java.time.LocalDate;

public class LoanResponse {

    private Long id;
    private BigDecimal amount;
    private BigDecimal interestRate;
    private LocalDate applicationDate;
    private String status;

    public LoanResponse(Long id, BigDecimal amount, BigDecimal interestRate, LocalDate applicationDate, String status) {
        this.id = id;
        this.amount = amount;
        this.interestRate = interestRate;
        this.applicationDate = applicationDate;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }

    public LocalDate getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
