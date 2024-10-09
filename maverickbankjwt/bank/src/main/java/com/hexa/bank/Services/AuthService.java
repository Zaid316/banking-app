package com.hexa.bank.Services;

import com.hexa.bank.Entities.SignupRequest;
import com.hexa.bank.Entities.User;

public interface AuthService {
	User createUser(SignupRequest signupRequest);

	boolean hasCustomerWithEmail(String email);

	
}
