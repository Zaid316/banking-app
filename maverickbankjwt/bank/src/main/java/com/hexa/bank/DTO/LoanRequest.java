package com.hexa.bank.DTO;

import java.math.BigDecimal;

public class LoanRequest{
    private Long Id;
    private BigDecimal amount;
    private BigDecimal interestRate;

    // Getters and setters
    public Long getId() {
        return Id;
    }

    public void setCustomerId(Long Id) {
        this.Id = Id;
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
}
