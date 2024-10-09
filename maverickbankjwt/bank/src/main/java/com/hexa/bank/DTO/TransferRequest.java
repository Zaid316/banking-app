package com.hexa.bank.DTO;

public class TransferRequest {
    private Long targetUserId;
    private Double amount;

    // Getters and Setters
    public Long getTargetUserId() {
        return targetUserId;
    }

    public void setTargetUserId(Long targetUserId) {
        this.targetUserId = targetUserId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}

