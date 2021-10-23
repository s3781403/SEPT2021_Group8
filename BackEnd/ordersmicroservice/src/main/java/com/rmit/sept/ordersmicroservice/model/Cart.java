package com.rmit.sept.ordersmicroservice.model;

import javax.persistence.*;
import java.util.List;
import java.util.Date;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL,
            targetEntity = LineItem.class, mappedBy = "id")
    private List<LineItem> lineItems;
    private Date create_At;
    private Date update_At;
    private Long userID;

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public List<LineItem> getLineItems() {return lineItems;}

    public void setLineItems(List<LineItem> lineItems) {this.lineItems = lineItems;}

    public Date getCreate_At() {return create_At;}

    public void setCreate_At(Date create_At) {this.create_At = create_At;}

    public Date getUpdate_At() {return update_At;}

    public void setUpdate_At(Date update_At) {this.update_At = update_At;}

    public Long getUserID() {return userID;}

    public void setUserID(Long userID) {this.userID = userID;}

    @PrePersist
    protected void onCreate() {
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }
}
