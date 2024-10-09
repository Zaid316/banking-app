package com.hexa.bank.Controllers;

import com.hexa.bank.DTO.LoanResponse;
import com.hexa.bank.Entities.Loan;
import com.hexa.bank.Entities.Transaction;
import com.hexa.bank.Entities.User;
import com.hexa.bank.Services.LoanService;
import com.hexa.bank.Services.TransactionService;
import com.hexa.bank.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private LoanService loanService;

    @Autowired
    private TransactionService transactionService;

    // Get user by ID
    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user); // Return user details
    }

    // Delete customer
    @DeleteMapping("/customers/{userId}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("Customer deleted successfully."); // Confirmation message
    }


    @PutMapping("/loans/approve/{loanId}")
    public ResponseEntity<LoanResponse> approveLoan(@PathVariable Long loanId) {
        Loan loan = loanService.approveLoan(loanId);
        
        LoanResponse loanResponse = new LoanResponse(
            loan.getId(),
            loan.getAmount(),
            loan.getInterestRate(),
            loan.getApplicationDate(),
            loan.getStatus()
        );

        return ResponseEntity.ok(loanResponse);
    }


    @PutMapping("/loans/reject/{loanId}")
    public ResponseEntity<LoanResponse> rejectLoan(@PathVariable Long loanId) {
        Loan loan = loanService.rejectLoan(loanId);
        
        LoanResponse loanResponse = new LoanResponse(
            loan.getId(),
            loan.getAmount(),
            loan.getInterestRate(),
            loan.getApplicationDate(),
            loan.getStatus()
        );

        return ResponseEntity.ok(loanResponse);
    }

    @GetMapping("/users/{userId}/transactions")
    public ResponseEntity<List<Transaction>> getUserTransactions(@PathVariable Long userId) {
        List<Transaction> transactions = transactionService.getTransactionsByUserId(userId);
        return ResponseEntity.ok(transactions); 
    }

    @GetMapping("/users/{userId}/loans")
    public ResponseEntity<List<Loan>> getUserLoans(@PathVariable Long userId) {
        List<Loan> loans = loanService.getLoansByUserId(userId);
        return ResponseEntity.ok(loans); 
    }
}

