 /*
package com.hexa.bank.Services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hexa.bank.Dao.AdministratorRepository;
import com.hexa.bank.Entities.Administrator;

@Service
public class AdminService implements UserDetailsService {

    @Autowired
    private AdministratorRepository administratorRepository;

    public Administrator findByUsername(String username) {
        return administratorRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Administrator administrator = findByUsername(username);
        if (administrator == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(administrator.getUsername(), administrator.getPassword(), new ArrayList<>());
    }
}
*/