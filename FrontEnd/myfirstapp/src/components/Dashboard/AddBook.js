import React from "react";
import axios from "axios";
import {Button, Grid, TextField} from "@material-ui/core";

function AddBook()
{
    const paperStyle={
        padding:50,
        width:400,
        margin:"30px"
    };


    const createBook=async () => {

        console.log("create button clicked")

        const isbn = document.getElementById("textISBN").value;
        const title = document.getElementById("textTitle").value;
        const category = document.getElementById("textCategory").value;
        const author = document.getElementById("textAuthor").value;
        const publisher = document.getElementById("textPublisher").value;
        const price = document.getElementById("textPrice").value;
        const type = document.getElementById("textType").value;
        const condition = document.getElementById("textQuality").value;
        const stock = document.getElementById("textStock").value;
        const sellerID = document.getElementById("textSellerId").value;


console.log(stock,condition,price,isbn,(typeof stock))


        return await axios.post("http://localhost:8080/api/books/create", {
                "isbn": parseInt(isbn),
                "author": author,
                "category": category,
                "price": parseFloat(price),
                "publisher": publisher,
                "sellerID": sellerID,
                "title": title,
                "type": type,
                "condition": parseInt(condition),
                "stock": parseInt(stock)
            },
            {
                headers: {
                    "Accept": "*/*",
                    "Access-Control-Allow-Origin": "*"
                }
            });

    }


    return(
    <form style={paperStyle}>
      <Grid container style={{marginLeft:5,marginRight:50}}>
          <Grid  item xs={10}>
              <h1 align={"center"}  >Add Book</h1>


              <TextField required id="textISBN" label="ISBN" />
              <TextField required id="textTitle" label="Title"  />
              <TextField required id="textCategory" label="Category"  />
              <TextField required id="textAuthor" label="Author"  />
              <TextField required id="textPublisher" label="Publisher"  />
              <TextField required id="textPrice" label="Price"  />
              <TextField required id="textType" label="Type"  />
              <TextField required id="textQuality" label="Quality"  />
              <TextField required id="textStock" label="Stock"  />
              <TextField required id="textSellerId" label="sellerID"  />

<Button onClick={()=>{
    createBook().then(r => console.log(r)).catch(error=>console.log(error.r));
}}>Create Book</Button>


          </Grid>
      </Grid>

  </form>


    );
}
export default AddBook;