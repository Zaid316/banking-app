package com.hexa.bank.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.bank.DTO.LoanRequest;
import com.hexa.bank.DTO.LoanResponse;
import com.hexa.bank.Entities.Loan;
import com.hexa.bank.Services.LoanService;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @PostMapping("/request")
    public ResponseEntity<LoanResponse> requestLoan(@RequestBody LoanRequest loanRequest) {
        Loan loan = loanService.createLoan(loanRequest);

        LoanResponse loanResponse = new LoanResponse(
            loan.getId(),
            loan.getAmount(),
            loan.getInterestRate(),
            loan.getApplicationDate(),
            loan.getStatus()
        );

        return ResponseEntity.ok(loanResponse); // Return the LoanResponse
    }
    @GetMapping("/users/{userId}/loans")
     public ResponseEntity<List<LoanResponse>> getLoansByUserId(@PathVariable Long userId) {
        List<Loan> loans = loanService.getLoansByUserId(userId);

        // Convert List<Loan> to List<LoanResponse>
        List<LoanResponse> loanResponses = loans.stream()
            .map(loan -> new LoanResponse(
                loan.getId(),
                loan.getAmount(),
                loan.getInterestRate(),
                loan.getApplicationDate(),
                loan.getStatus()
            )).collect(Collectors.toList());

        return ResponseEntity.ok(loanResponses);
    }
}





