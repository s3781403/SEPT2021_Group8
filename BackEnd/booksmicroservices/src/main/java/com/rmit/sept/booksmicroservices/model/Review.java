package com.rmit.sept.booksmicroservices.model;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "BookID is Required")
    private long bookID;

    @NotBlank(message = "UserID is required")
    private long userID;

    @NotBlank(message = "Review requires some content")
    private String content;

    private Date create_At;
    private Date update_At;


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public long getBookID() {return bookID;}
    public void setBookID(long bookID) {this.bookID = bookID;}

    public long getUserID() {return userID;}
    public void setUserID(long userID) {this.userID = userID;}

    public String getContent() {return content;}
    public void setContent(String content) {this.content = content;}

    public Date getCreate_At() {
        return create_At;
    }
    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {
        return update_At;
    }
    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }

    @PrePersist
    protected void onCreate() {
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }

}