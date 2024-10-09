package com.hexa.bank.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.bank.Entities.User;
import com.hexa.bank.Services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/current")
    public ResponseEntity<User> getCurrentUser() {
        User user = userService.getCurrentUser();
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }
}
