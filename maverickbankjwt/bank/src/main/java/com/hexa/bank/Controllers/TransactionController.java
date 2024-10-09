package com.hexa.bank.Controllers;

import com.hexa.bank.DTO.TransactionRequest;
import com.hexa.bank.DTO.TransferRequest;
import com.hexa.bank.Entities.Transaction;
import com.hexa.bank.Services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/deposit/{userId}")
    public ResponseEntity<Transaction> deposit(@PathVariable Long userId, @RequestBody TransactionRequest request) {
        Transaction transaction = transactionService.deposit(userId, request.getAmount());
        if (transaction != null) {
            return ResponseEntity.ok(transaction);
        }
        return ResponseEntity.badRequest().build(); // User not found or insufficient balance
    }

    @PostMapping("/withdraw/{userId}")
    public ResponseEntity<Transaction> withdraw(@PathVariable Long userId, @RequestBody TransactionRequest request) {
        Transaction transaction = transactionService.withdraw(userId, request.getAmount());
        if (transaction != null) {
            return ResponseEntity.ok(transaction);
        }
        return ResponseEntity.badRequest().build(); // User not found or insufficient balance
    }

    @PostMapping("/transfer/{sourceUserId}")
    public ResponseEntity<Transaction> transfer(@PathVariable Long sourceUserId, @RequestBody TransferRequest request) {
        Transaction transaction = transactionService.transfer(sourceUserId, request.getTargetUserId(), request.getAmount());
        if (transaction != null) {
            return ResponseEntity.ok(transaction);
        }
        return ResponseEntity.badRequest().build(); // User not found or insufficient balance
    }

    @GetMapping("/users/{userId}/transactions")
    public ResponseEntity<List<Transaction>> getUserTransactions(@PathVariable Long userId) {
        List<Transaction> transactions = transactionService.getTransactionsByUserId(userId);
        return ResponseEntity.ok(transactions); 
    }
}



