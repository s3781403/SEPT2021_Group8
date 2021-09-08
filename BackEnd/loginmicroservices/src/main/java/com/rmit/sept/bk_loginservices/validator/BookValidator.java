package com.rmit.sept.bk_loginservices.validator;

import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


@Component
public class BookValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return Book.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Book book = (Book) object;

        //!=10 is to give legacy support for ISBNs created before 1 january 2007
        //Since january 1 2007 all ISBNs are 13 characters in length
        if (Integer.toString(book.getISBN()).length() != 10 || Integer.toString(book.getISBN()).length() != 13) {
            errors.rejectValue("ISBN", "Length", "ISBN must be 10 or 13 characters long");
        }

        if (!book.getType().equals("physical") || !book.getType().equals("ebook")) {
            errors.rejectValue("type", "Mismatch", "Book type must be ebook or physical");
        }

        if (book.getAuthor().matches(".*\\d+.*")) {
            errors.rejectValue("author","NoNumbers", "Author cannot contain digits (numbers)");
        }


        /* Checks that need extra work to be implemented.
        // Check whether the selected category actually exists in pre-approved list of categories
        for (String category : something.getCategories()) {
            if (book.getCategory().equals(category)) {
                break;
            } else {
                errors.rejectValue("category", "Mismatch", "Category not in list of categories");
            }
        }

        //Checks if the sellerID actually exists
        if (something.getSeller(book.getSellerByID()) == null) {
            errors.rejectValue("sellerID", "NotFound", "Seller was not found in list of approved sellers");
        }
        */

        //
    }
}
