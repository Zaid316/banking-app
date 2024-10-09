package com.hexa.bank.Services;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.hexa.bank.Entities.User;

public interface UserService extends UserDetailsService {
	UserDetailsService userDetailsService();
	User getCurrentUser();
	User getUserById(Long userId);
	void deleteUser(Long userId);
}