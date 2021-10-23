package com.rmit.sept.ordersmicroservice.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class LineItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Foreign key
    private long bookID;
    private long quantity;
    private Date update_At;
    private Date create_At;

    public Date getCreate_At() {return create_At;}

    public void setCreate_At(Date create_At) {this.create_At = create_At;}

    public Date getUpdate_At() {return update_At;}

    public void setUpdate_At(Date update_At) {this.update_At = update_At;}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {this.id = id;}

    public long getBookID() {
        return bookID;
    }

    public void setBookID(long bookID) {
        this.bookID = bookID;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
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
