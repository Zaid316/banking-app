package com.hexa.bank.Services;

import com.hexa.bank.Entities.Transaction;
import com.hexa.bank.Entities.User;
import com.hexa.bank.Dao.TransactionRepository;
import com.hexa.bank.Dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    public Transaction deposit(Long userId, Double amount) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setBalance(user.getBalance() + amount); // Update user's balance

            Transaction transaction = new Transaction();
            transaction.setTransactionType("DEPOSIT");
            transaction.setAmount(amount);
            transaction.setSourceAccount(user);
            transaction.setStatus("SUCCESS");
            transactionRepository.save(transaction);
            userRepository.save(user);
            return transaction;
        }
        return null; // Handle user not found case
    }

    public Transaction withdraw(Long userId, Double amount) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getBalance() >= amount) { // Check sufficient balance
                user.setBalance(user.getBalance() - amount); // Update user's balance

                Transaction transaction = new Transaction();
                transaction.setTransactionType("WITHDRAW");
                transaction.setAmount(amount);
                transaction.setSourceAccount(user);
                transaction.setStatus("SUCCESS");
                transactionRepository.save(transaction);
                userRepository.save(user);
                return transaction;
            }
            // Handle insufficient balance case
        }
        return null; // Handle user not found case
    }

    public Transaction transfer(Long sourceUserId, Long targetUserId, Double amount) {
        Optional<User> sourceUserOpt = userRepository.findById(sourceUserId);
        Optional<User> targetUserOpt = userRepository.findById(targetUserId);
        
        if (sourceUserOpt.isPresent() && targetUserOpt.isPresent()) {
            User sourceUser = sourceUserOpt.get();
            User targetUser = targetUserOpt.get();
            
            if (sourceUser.getBalance() >= amount) { // Check sufficient balance
                sourceUser.setBalance(sourceUser.getBalance() - amount); // Deduct from source
                targetUser.setBalance(targetUser.getBalance() + amount); // Add to target

                Transaction transaction = new Transaction();
                transaction.setTransactionType("TRANSFER");
                transaction.setAmount(amount);
                transaction.setSourceAccount(sourceUser);
                transaction.setTargetAccount(targetUser);
                transaction.setStatus("SUCCESS");
                
                transactionRepository.save(transaction);
                userRepository.save(sourceUser);
                userRepository.save(targetUser);
                return transaction;
            }
            // Handle insufficient balance case
        }
        return null; // Handle user not found case
    }

    public List<Transaction> getTransactionsByUserId(Long userId) {
        return transactionRepository.findBySourceAccount_Id(userId);
    }
}

