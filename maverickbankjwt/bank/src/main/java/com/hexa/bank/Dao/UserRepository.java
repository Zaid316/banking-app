package com.hexa.bank.Dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.bank.Entities.User;



public interface UserRepository extends JpaRepository<User, Long> {
	 Optional<User> findFirstByEmail(String email);

}