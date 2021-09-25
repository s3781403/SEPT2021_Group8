package com.rmit.sept.booksmicroservices.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.booksmicroservices.BooksmicroservicesApplicationTests;
import com.rmit.sept.booksmicroservices.model.MockBook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


//TODO
// *The update, delete, create methods need to use mockito instead of directly querying the database
// and rolling back.

public class BookControllerTest extends BooksmicroservicesApplicationTests {

    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    WebApplicationContext webApplicationContext;


    private MockBook book_1;
    private MockBook book_2;
    private MockBook book_3;
    private MockBook book_4;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        book_1 = new MockBook(1234567891123L, "Test Book #1", "Fantesty",
                "Rex Testingham", "Penguin Tests", 10.50, "physical", 0,
                1, 123155, "aws.testimageurl.com/1234-153-1235_source.jpg" );

        book_2 = new MockBook(2345678911123L, "Test Book #2", "Horror",
                "Sir Tests", "Random House Tests", 20.30, "ebook", 2,
                4, 234567, "aws.testimageurl.com/1236-143-1135_source.jpg" );

        book_3 = new MockBook(3144678231123L, "Test Book #3", "Mystesty",
                "Mr Tests", "Amazon Tests", 40.50, "physical", 3,
                1, 5618120, "aws.testimageurl.com/4123-123-151235a.jpg" );

        book_4 = new MockBook(3145327678231123L, "Test Book #3", "Mystesty",
                "Mr Tests", "Amazon Tests", 40.50, "physical", 3,
                1, 5618120, "aws.testimageurl.com/4123-123-151235a.jpg" );
    }

//Create
    @Test
    @Transactional
    public void whenCreateBook_thenReturnCreated() throws Exception {
        mockMvc.perform(postJson("/api/books/create", book_1))
                .andExpect(status().isCreated());
    }

    @Test
    @Transactional
    public void whenCreateBook_thenReturnFailed() throws Exception {
        mockMvc.perform(postJson("/api/books/create", book_4))
                .andExpect(status().isBadRequest());
    }

//Read
    @Test
    public void whenGetBook_thenReturnBook() throws Exception {
//        Mockito.when(bookService.findAll()).thenReturn(books);
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/books/book/34")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void whenGetBook_thenNotReturnBook() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/books/book/-3")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

//Update

    //This should be run using mockito and not actually query the database
    @Test
    @Transactional
    public void whenUpdateBook_thenBookIsUpdated() throws Exception {

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.put("/api/books/update/35")
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)
                .content(this.objectMapper.writeValueAsString(book_2));

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk());
    }


    //Should be updated to use mockito instead
    @Test
    @Transactional
    public void whenUpdateBook_thenBookIsNotUpdated() throws Exception {

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.put("/api/books/update/34")
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)
                .content(this.objectMapper.writeValueAsString(book_4));

        mockMvc.perform(mockRequest)
                .andExpect(status().isBadRequest());
    }

//Delete
    @Test
    @Transactional
    public void whenDeleteBook_bookIsDeleted() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/books/delete/34")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    public void whenDeleteBook_noBookIsDeleted() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/books/delete/0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    //Helper method for post requests
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
