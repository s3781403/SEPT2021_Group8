package com.rmit.sept.ordersmicroservice.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.ordersmicroservice.OrdersmicroserviceApplicationTests;
import com.rmit.sept.ordersmicroservice.model.cartCreation;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CartControllerTest extends OrdersmicroserviceApplicationTests {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    //Setup mock MVC before running tests
    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    //Tests that a valid order request will correctly add an order to the database
    @Test
    @Transactional
    public void should_CreateCart_When_OrderValid() throws Exception {
        cartCreation cc = new cartCreation(1);
        mockMvc.perform(postJson("/api/carts/create", cc))
                .andExpect(status().isCreated());
    }

    //Tests that a valid order request will correctly add an order to the database
    @Test
    @Transactional
    public void shouldnt_CreateCart_When_OrderInValid() throws Exception {
        cartCreation cc = new cartCreation(1);
        mockMvc.perform(postJson("/api/carts/create", cc))
                .andExpect(status().isCreated());
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
