package com.rmit.sept.bk_loginservices.model;

public class userRegistration {

    public String username;
    public String fullName;
    public String password;
    public String confirmPassword;
    public String role;
    public String phoneNumber;
    public String address;

    public userRegistration(String username,String fullName, String password, String confirmPassword, String role, String phoneNumber, String address){
        this.username = username;
        this.fullName = fullName;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}
