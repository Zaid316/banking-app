package com.hexa.bank.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexa.bank.Dao.UserRepository;
import com.hexa.bank.Entities.SignupRequest;
import com.hexa.bank.Entities.User;
import com.hexa.bank.Enums.UserRole;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(SignupRequest signupRequest) {
        User user = new User();
        user.setName(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setGender(signupRequest.getGender());
        user.setContactNumber(signupRequest.getContactNumber());
        user.setAddress(signupRequest.getAddress());
        user.setDateOfBirth(signupRequest.getDateOfBirth());
        user.setAadharNumber(signupRequest.getAadharNumber());
        user.setPanNumber(signupRequest.getPanNumber());

        // Set a default role if none is provided
        if (signupRequest.getUserRole() == null) {
            user.setUserRole(UserRole.USER); // Default role to USER
        } else {
            user.setUserRole(signupRequest.getUserRole());
        }

        return userRepository.save(user);
    }

    @Override
    public boolean hasCustomerWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }
}
