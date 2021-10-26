package com.rmit.sept.ordersmicroservice.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.ordersmicroservice.OrdersmicroserviceApplicationTests;
import com.rmit.sept.ordersmicroservice.model.orderCreation;
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

public class OrderControllerTest extends OrdersmicroserviceApplicationTests {

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
    public void should_CreateOrder_When_OrderValid() throws Exception {
        orderCreation oc = new orderCreation(1,"Order Received",24);
        mockMvc.perform(postJson("/api/carts/cart/37/createOrder", oc))
                .andExpect(status().isCreated());
    }

    //Tests that a valid order request will correctly reject an order with an unrecognized status from entering the database
    @Test
    @Transactional
    public void shouldnt_CreateOrder_When_StatusInvalid() throws Exception {
        orderCreation oc = new orderCreation(1,"Order skipped",24);
        mockMvc.perform(postJson("/api/carts/cart/37/createOrder", oc))
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
