package com.hexa.bank.Dao;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.bank.Entities.Customer;

public interface RepBank extends JpaRepository<Customer,Long> {
    Customer findByUsername(String username);
    Customer findByEmail(String email);
    
}
