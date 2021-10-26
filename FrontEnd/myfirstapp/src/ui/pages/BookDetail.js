import {useParams} from 'react-router-dom'
import {Grid, Link, TextField, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {addReview, getAllReviews, getBookByID, getReviewsById} from "../../api/books";
import Button from "@mui/material/Button";
import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {addItem, createCart, getCartByUserID} from "../../api/Orders";
import ReviewsList from "../components/ReviewsList";

function BookDetail() {

    const {bookid: bookId} = useParams()
    const [bookData, setBookData] = useState()
    const [reviews, setReviews] = useState([])
    const {user, setLoading, addCartItem} = useContext(AppContext)

    const addReviews = async () => {
        setLoading(true)
        const reviewData = document.getElementById("textReview").value
        console.log(user)

        await addReview(reviewData, bookData.id, user.userInfo.id)
        await reFetchReviews()
        setLoading(false)
    }

    async function reFetchReviews() {
        const allReviews = await getReviewsById(bookId)
        console.log("...///", allReviews)
        setReviews(allReviews)
    }

    useEffect(async () => {
        setLoading(true)
        const freshBookData = await getBookByID(bookId)
        setBookData(freshBookData)
        await reFetchReviews();
        setLoading(false)
    }, [])

    if (!bookData) return null

    const addItemToCart = (bookData) => {

        addCartItem(bookData)
    }

    return (<div>
            <Grid container>


                <Grid item lg={4} xs={12}>
                    <CardMedia
                        component="img"
                        height="450px"
                        width={'100%'}
                        style={{
                            maxHeight: '450px',
                            maxWidth: '100%',
                            objectFit: 'contain',
                            aspectRatio: 'auto',
                            margin: '2%',
                            padding: '2%'
                        }}
                        image={bookData.imageURL}
                        alt="book cover"
                    />

                    <br/>


                </Grid>


                <Grid item lg={4} xs={12}>


                    <h1>{bookData.title}</h1>
                    <h3 style={{color: '#f50057'}}>{bookData.author}</h3>
                    <Typography>
                    <p>{bookData?.description || 'No Description Available'}</p>
                    </Typography>

                    <br/><br/><br/>
                    <Link style={{color: '#f50057'}}
                          href="https://sept-group-8-images.s3-ap-southeast-2.amazonaws.com/1634819921323-Untitled_document_(2).pdf">Download
                        Table Of Content</Link>
                </Grid>


                <Grid item lg={4} xs={12}>
                    <Card style={{padding: '2%', margin: '2%', height: '450px', width: '80%'}}>
                        <h1 style={{color: '#f50057'}}> RRP ${(bookData.price + ".00").substr(0, 5)}</h1>
                        <h3 style={{marginTop: '8vh'}}>Condition: New ✨</h3>
                        <h3 style={{marginTop: '8vh'}}>Stock: In Stock ✅</h3>


                        <Button variant="contained" color="secondary" endIcon={<ShoppingCartIcon/>} style={{
                            width: '50%',
                            height: '20',
                            padding: '4%',
                            margin: '0 auto',
                            display: "flex",
                            marginTop: '12vh'
                        }} onClick={() => {
                            addItemToCart(bookData)

                        }}>Add to cart</Button>

                    </Card>
                </Grid>

                <Grid item lg={10}>
                    <TextField id="textReview" style={{color: "#f50057"}} label={"  Write a review  "}
                               style={{padding: '1%', width: '50%', height: 'auto'}}></TextField>
                    <Button style={{margin: '1%', padding: '1%', height: 'auto'}} variant="contained" onClick={() => {
                        addReviews()
                    }}> Submit review</Button>
                    <div>
                        <Typography variant="h5" style={{padding:'1%'}}> Reviews</Typography>
                        {reviews.map(review => <ReviewsList review={review}/>)}

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default BookDetail;