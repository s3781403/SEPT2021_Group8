package com.rmit.sept.bk_loginservices.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.bk_loginservices.model.userLogin;
import com.rmit.sept.bk_loginservices.model.userRegistration;
import com.rmit.sept.bk_loginservices.msloginTests;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserControllerTest extends msloginTests {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    //Setup mock MVC before running tests
    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    //Tests that a valid registration request will correctly add a user to the database
    @Test
    @Transactional
    public void should_CreateAccount_When_ValidRequest() throws Exception {
        userRegistration ur = new userRegistration("ajfis6@gmail.com", "Aaron Fisher", "Password1", "Password1", "Customer", "testNumber", "1234 Test Street");
        mockMvc.perform(postJson("/api/users/register", ur))
                .andExpect(status().isCreated());
    }

    //Tests that a registration request with a blank username is rejected and indicated as such
    @Test
    @Transactional
    public void shouldnt_CreateAccount_When_UsernameBlank() throws Exception {
        userRegistration ur = new userRegistration("", "Aaron Fisher", "Password1", "Password1", "Customer", "testNumber", "1234 Test Street");
        mockMvc.perform(postJson("/api/users/register", ur))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.username").value("username is required"));
    }

    //Tests that a registration request with a non-email username is rejected and indicated as such
    @Test
    @Transactional
    public void shouldnt_CreateAccount_When_UsernameNotEmail() throws Exception {
        userRegistration ur = new userRegistration("ajfis3gmail.com", "Aaron Fisher", "Password1", "Password1", "Customer", "testNumber", "1234 Test Street");
        mockMvc.perform(postJson("/api/users/register", ur))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.username").value("Username needs to be an email"));
    }

    //Tests that a registration request with a blank password is rejected and indicated as such
    @Test
    @Transactional
    public void shouldnt_CreateAccount_When_PasswordBlank() throws Exception {
        userRegistration ur = new userRegistration("ajfis3@gmail.com", "Aaron Fisher", "", "", "Customer", "testNumber", "1234 Test Street");
        mockMvc.perform(postJson("/api/users/register", ur))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password").value("Password must be at least 6 characters"));
    }

    //Tests that a registration request with a password less than 6 characters is rejected and indicated as such
    @Test
    @Transactional
    public void shouldnt_CreateAccount_When_Password_Less_Than_Six() throws Exception {
        userRegistration ur = new userRegistration("", "Aaron Fisher", "12345", "12345", "Customer", "testNumber", "1234 Test Street");
        mockMvc.perform(postJson("/api/users/register", ur))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password").value("Password must be at least 6 characters"));
    }

    //Tests that a registration request with non-matching passwords is rejected and indicated as such
    @Test
    @Transactional
    public void shouldnt_CreateAccount_When_Passwords_Dont_Match() throws Exception {
        userRegistration ur = new userRegistration("", "Aaron Fisher", "1234567", "12345678", "Customer", "testNumber", "1234 Test Street");
        mockMvc.perform(postJson("/api/users/register", ur))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.confirmPassword").value("Passwords must match"));
    }

    //Tests that valid login info is accepted
    @Test
    @Transactional
    public void should_login_When_Valid() throws Exception {
        userLogin ul = new userLogin("ajfis4@gmail.com", "Password1");
        mockMvc.perform(postJson("/api/users/login", ul))
                .andExpect(status().isOk());
    }

    //Tests that a login with an unrecognized username is rejected
    @Test
    @Transactional
    public void shouldnt_login_When_username_Invalid() throws Exception {
        userLogin ul = new userLogin("ajfis1@gmail.com", "Password1");
        mockMvc.perform(postJson("/api/users/login", ul))
                .andExpect(status().isBadRequest());
    }

    //Tests that a login with an unrecognized password is rejected
    @Test
    @Transactional
    public void shouldnt_login_When_password_Invalid() throws Exception {
        userLogin ul = new userLogin("ajfis4@gmail.com", "Password2");
        mockMvc.perform(postJson("/api/users/login", ul))
                .andExpect(status().isBadRequest());
    }

    //Helper method
    private static MockHttpServletRequestBuilder postJson(String uri, Object body) {
        try {
            String json = new ObjectMapper().writeValueAsString(body);
            return post(uri)
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .content(json);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }


}
