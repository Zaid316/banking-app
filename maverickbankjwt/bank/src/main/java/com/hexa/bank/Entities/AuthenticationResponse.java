package com.hexa.bank.Entities;



import com.hexa.bank.Enums.UserRole;

public class AuthenticationResponse {
	private String jwt;
    private UserRole userRole;
    private Long userId;
	public String getJwt() {
		return jwt;
	}
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
	public UserRole getUserRole() {
		return userRole;
	}
	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	@Override
	public String toString() {
		return "AuthenticationResponse [jwt=" + jwt + ", userRole=" + userRole + ", userId=" + userId + "]";
	}
}
