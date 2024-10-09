package com.hexa.bank.Dao;

import com.hexa.bank.Entities.Transaction;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySourceAccount_Id(Long sourceUserId);
}

