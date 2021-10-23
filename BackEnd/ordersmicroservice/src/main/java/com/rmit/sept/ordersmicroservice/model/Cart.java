package com.rmit.sept.ordersmicroservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name="CART")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"cart"})
    private Set<LineItem> lineItems;

    @OneToOne(mappedBy = "cart")
    private Invoice invoice;

    @NotNull(message = "Cart must have a UserID")
    @Column(unique = true)
    private Long userID;

    private Date create_At;
    private Date update_At;


    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public Set<LineItem> getLineItems() {return lineItems;}

    public void setLineItems(Set<LineItem> lineItems) {this.lineItems = lineItems;}

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
