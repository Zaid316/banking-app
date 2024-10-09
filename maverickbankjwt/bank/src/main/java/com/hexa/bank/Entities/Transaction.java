package com.hexa.bank.Entities;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String transactionType;  // e.g. "DEPOSIT", "WITHDRAW", "TRANSFER"
    private Double amount;  // Changed to Double

    @ManyToOne
    @JoinColumn(name = "source_user_id", nullable = false)  // Linking to User entity
    private User sourceAccount;  // Reference to the user who initiates the transaction

    @ManyToOne
    @JoinColumn(name = "target_user_id")  // Nullable for non-transfer transactions
    private User targetAccount;  // Reference to the target user for transfers (nullable for deposits/withdrawals)

    @Column(nullable = false)
    private String status;  // e.g. "SUCCESS", "FAILED"

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Transaction() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public User getSourceAccount() {
        return sourceAccount;
    }

    public void setSourceAccount(User sourceAccount) {
        this.sourceAccount = sourceAccount;
    }

    public User getTargetAccount() {
        return targetAccount;
    }

    public void setTargetAccount(User targetAccount) {
        this.targetAccount = targetAccount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}



