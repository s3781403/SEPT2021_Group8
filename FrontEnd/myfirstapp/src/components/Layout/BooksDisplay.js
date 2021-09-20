import React, {useContext, useEffect, useState} from "react";
import {Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom'
import axios from 'axios';
import {AppContext} from "../../AppContext";



function Book() {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            height:'40',
            color: theme.palette.text.secondary,
        },
    }));

    const classes = useStyles();

    const [books,setBooks]=useState()
    //const {user, cartItemCount} = useContext(AppContext)

    const getBooks= async()=>{
        const response= await axios.get('http://localhost:8080/api/books/getAll?column=all')

        console.log(response.data);

        return response.data
    }

    useEffect(async ()=>{
        const books=await getBooks()
        setBooks(books)
    },[])

    if(!books) return <p>loading</p>

    return(



        <Grid container spacing={5}>

            {
                books.map((book, i) => {

                    return (
                        <Grid key={i} item xs={10} md={4} lg={2}>
                            <Link to={"/bookDetails/" + i}>
                                <Paper className={classes.paper}>
                                    <div>

                                        <img style={{border: "solid 1px red", width: 'auto', height: "auto",margin:"10 10"}}
                                             src={book.imageURL}/>
                                        <h4>{book.title}</h4>
                                        <p>${book.price}</p>

                                    </div>
                                </Paper>
                            </Link>
                        </Grid>
                    )
                })
            }
        </Grid>


    )
};
export default Book;