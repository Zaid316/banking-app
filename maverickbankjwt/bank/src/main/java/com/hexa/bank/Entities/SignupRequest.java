package com.hexa.bank.Entities;

import com.hexa.bank.Enums.UserRole;

public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private String gender;
    private String contactNumber;
    private String address;
    private String dateOfBirth;
    private String aadharNumber;
    private String panNumber;
    private UserRole userRole;

    // Getters and Setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    @Override
    public String toString() {
        return "SignupRequest [name=" + username + ", email=" + email + ", password=" + password + 
               ", gender=" + gender + ", contactNumber=" + contactNumber + ", address=" + address + 
               ", dateOfBirth=" + dateOfBirth + ", aadharNumber=" + aadharNumber + 
               ", panNumber=" + panNumber + ", userRole=" + userRole + "]";
    }
}


