package com.hexa.bank.Services;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexa.bank.Dao.RepBank;
import com.hexa.bank.Entities.Customer;

@Service
public class CustomerService {

    @Autowired
    private RepBank customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; ;

    public Customer registerCustomer(Customer customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
 
        if (customer.getDateOfBirth() != null) {
            customer.setAge(calculateAge(customer.getDateOfBirth()));
        }

        return customerRepository.save(customer);
    }

    private int calculateAge(Date dob) {
        LocalDate birthDate = dob.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return Period.between(birthDate, LocalDate.now()).getYears();
    }

    public Customer findByUsername(String username) {
        return customerRepository.findByUsername(username);
    }

    public Customer findByEmail(String email) {
        return customerRepository.findByEmail(email);
        
    }

    public Optional<Customer> findById(Long id) {
        return customerRepository.findById(id);
    }

    public List<Customer> findAllCustomers() {
        return customerRepository.findAll();
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}