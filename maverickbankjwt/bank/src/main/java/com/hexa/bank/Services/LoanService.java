package com.hexa.bank.Services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.bank.DTO.LoanRequest;
import com.hexa.bank.Dao.LoanRepository;
import com.hexa.bank.Dao.UserRepository;
import com.hexa.bank.Entities.Loan;
import com.hexa.bank.Entities.User;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private UserRepository userRepository;

    public Loan createLoan(LoanRequest loanRequest) {
        Optional<User> userOpt = userRepository.findById(loanRequest.getId());
        if (userOpt.isPresent()) {
            Loan loan = new Loan();
            loan.setUser(userOpt.get()); 
            loan.setAmount(loanRequest.getAmount());
            loan.setInterestRate(loanRequest.getInterestRate());
            loan.setApplicationDate(LocalDate.now()); 
            loan.setStatus("PENDING");

            return loanRepository.save(loan); 
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public Loan approveLoan(Long loanId) {
        Optional<Loan> loanOpt = loanRepository.findById(loanId);
        if (loanOpt.isPresent()) {
            Loan loan = loanOpt.get();
            User user = loan.getUser(); 
            Double loanAmount = loan.getAmount().doubleValue();
            Double currentBalance = user.getBalance(); 
            Double newBalance = currentBalance + loanAmount; 
            user.setBalance(newBalance); 
            loan.setStatus("APPROVED");
            loanRepository.save(loan);
            userRepository.save(user); 
            return loan; 
        } else {
            throw new RuntimeException("Loan not found");
        }
    }
    

    public Loan rejectLoan(Long loanId) {
        Optional<Loan> loanOpt = loanRepository.findById(loanId);
        if (loanOpt.isPresent()) {
            Loan loan = loanOpt.get();
            loan.setStatus("REJECTED");
            return loanRepository.save(loan);
        } else {
            throw new RuntimeException("Loan not found");
        }
    }

    public List<Loan> getLoansByUserId(Long userId) {
        return loanRepository.findByUserId(userId);
    }
}



