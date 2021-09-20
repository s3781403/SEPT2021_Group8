import React, { useState, useEffect } from 'react';
import {Button, Link} from "@material-ui/core";
import "./ProductDisplay.css";
import ProductFooter from "./ProductFooter";

function BookDetails()
{



    return(
        <div className="product">

        <div className="left_side">
        <div className="image">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1c30aYoFMNapscvNsb2gpnY7S9lYErRi8qg&usqp=CAU"/>
           <div className={"preview"}>
            <Link href="#" >
                Book preview
            </Link>
           </div>
        </div>

        </div>


    <div className="right_side">
        <p className={"details_bookname"}>Software Engineering At Google</p>

        <p className={"details_author"}>Titus Winters, Tom Manshrek, & Hyrum Wright</p>
        <div className="right-info">
            <p>Price: $500</p>
            <p>Stock: In Stock</p>
            <p>Condition: New</p>
            <Button> Add to cart</Button>


        </div>

    </div>



        </div>



    );

}
export default BookDetails;