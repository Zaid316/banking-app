package com.hexa.bank.Services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hexa.bank.Dao.UserRepository;
import com.hexa.bank.Entities.User;





@Service
public class UserServiceImpl implements UserService{
	@Autowired
    private UserRepository userRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findFirstByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user; // User entity should implement UserDetails
	}

	@Override
	public UserDetailsService userDetailsService() {
		// TODO Auto-generated method stub
				return this;
	}

	@Override
    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findFirstByEmail(email).orElse(null); // Fetch the user by email
    }

	@Override
	public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Method to delete user by ID
    @Override
    public void deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
