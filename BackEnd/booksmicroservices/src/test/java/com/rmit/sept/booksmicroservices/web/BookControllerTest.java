package com.rmit.sept.booksmicroservices.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.booksmicroservices.BooksmicroservicesApplicationTests;
import com.rmit.sept.booksmicroservices.Repositories.BookRepository;
import com.rmit.sept.booksmicroservices.model.Book;
import com.rmit.sept.booksmicroservices.model.MockBook;
import com.rmit.sept.booksmicroservices.services.BookService;
import com.rmit.sept.booksmicroservices.services.MapValidationErrorService;
import com.rmit.sept.booksmicroservices.validator.BookValidator;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BookController.class)
public class BookControllerTest {

    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
//    @MockBean
//    BookRepository bookRepository;
//    @MockBean
//    BookService bookService;
//    @MockBean
//    MapValidationErrorService mapValidationErrorService;
//    @MockBean
//    BookValidator bookValidator;

    @Autowired
    WebApplicationContext webApplicationContext;


    private Book book_1;
    private Book book_2;
    private Book book_3;

    @BeforeEach
    public void setup() {
//        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        MockBook mockBook = new MockBook();
        book_1 = mockBook.createMockBook(1L,123456789112L, "Test Book #1", "Fantesty",
                "Rex Testingham", "Penguin Tests", 10.50, "physical", 0,
                1, 123155, "aws.testimageurl.com/1234-153-1235_source.jpg" );

        book_2 = mockBook.createMockBook(2L,234567891112L, "Test Book #2", "Horror",
                "Sir Tests", "Random House Tests", 20.30, "ebook", 2,
                4, 234567, "aws.testimageurl.com/1236-143-1135_source.jpg" );

        book_3 = mockBook.createMockBook(3L,314467823112L, "Test Book #3", "Mystesty",
                "Mr Tests", "Amazon Tests", 40.50, "physical", 3,
                1, 5618120, "aws.testimageurl.com/4123-123-151235a.jpg" );
    }


    //Tests that the get all method works
//    @Test
//    @DisplayName("Tests that the getAll method returns OK (successful)")
//    public void whenGetAllBooks_thenReturnOk() throws Exception {
//        List<Book> books = new ArrayList<>(Arrays.asList(book_1, book_2, book_3));
//        Mockito.when(bookRepository.findAll()).thenReturn(books);
//
//        //TODO *Unfinished
//
//    }

    @Test
    public void whenCreateBook_thenReturnCreated() throws Exception {
        mockMvc.perform(postJson("/api/books/create", book_1))
                .andExpect(status().isCreated());
    }

    //Helper method for posts
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
