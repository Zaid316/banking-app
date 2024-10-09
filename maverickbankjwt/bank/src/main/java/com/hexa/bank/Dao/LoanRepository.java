package com.hexa.bank.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.hexa.bank.Entities.Loan;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByUserId(Long userId); 
    List<Loan> findByStatus(String status);
   
}
