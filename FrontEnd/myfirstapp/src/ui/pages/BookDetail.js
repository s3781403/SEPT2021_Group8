import {useParams} from 'react-router-dom'
import {Grid, Link, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {getBookByID} from "../../api/books";
import Button from "@mui/material/Button";
import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function BookDetail() {

    const {bookid: bookId} = useParams()
    const [bookData, setBookData] = useState()


    const {setLoading,cartItem, addCartItem} = useContext(AppContext)

    useEffect(async () => {
        setLoading(true)
        const freshBookData = await getBookByID(bookId)
        setBookData(freshBookData)
        setLoading(false)
    }, [])

    if (!bookData) return null


    return (<div>
        <Grid container>


            <Grid item lg={4} xs={12}>
                <CardMedia
                    component="img"
                    height="450px"
                    width={'100%'}
                    style={{maxHeight: '450px', maxWidth: '100%', objectFit: 'contain', aspectRatio: 'auto',margin:'2%',padding:'2%'}}
                    image={bookData.imageURL}
                    alt="book cover"
                />

                <br/>
                <Grid lg={10} >
                    <TextField style={{color:"#f50057"}} label={"Write a review"} style={{margin:'1%',padding:'2%',width:'90%'}}></TextField>
                    <Button style={{padding:'2%',margin:'1%'}} variant="contained"> Submit review</Button>
                </Grid>

            </Grid>


            <Grid item lg={4} xs={12}>


                <h1>{bookData.title}</h1>
                <h3 style={{color:'#f50057'}}>{bookData.author}</h3>
                <p>{bookData?.description || 'No Description Available'}</p>

                <br/><br/><br/>
                <Link style={{color:'#f50057'}} href="https://sept-group-8-images.s3-ap-southeast-2.amazonaws.com/1634819921323-Untitled_document_(2).pdf">Download Table Of Content</Link>
            </Grid>


            <Grid item lg={4} xs={12}>
                <Card  style={{padding:'2%',margin:'2%',height:'450px',width:'80%'}} >
                <h1 style={{color:'#f50057'}}>  RRP ${(bookData.price + ".00").substr(0, 5)}</h1>
                <h3>Condition: New ✨</h3>
                    <h3>Stock: In Stock ✅</h3>
                <Button variant="contained" color="secondary" endIcon={<ShoppingCartIcon/>} style={{width:'80%',height:'20',margin:'5%',padding:'4%'}} onClick={() => {
                    addCartItem(bookData)

                }}>Add to cart</Button>
                </Card>
            </Grid>
        </Grid>
    </div>
    )
}

export default BookDetail