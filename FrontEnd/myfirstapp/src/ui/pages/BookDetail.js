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


    const {setLoading,cartItem, setCartItem} = useContext(AppContext)

    useEffect(async () => {
        setLoading(true)
        const freshBookData = await getBookByID(bookId)
        setBookData(freshBookData)
        setLoading(false)
    }, [])

    if (!bookData) return null


    return (<div>
        <Grid container>


            <Grid item xs={4}>
                <CardMedia
                    component="img"
                    height="450px"
                    width={'100%'}
                    style={{maxHeight: '450px', maxWidth: '100%', objectFit: 'contain', aspectRatio: 'auto',margin:'2%',padding:'2%'}}
                    image={bookData.imageURL}
                    alt="book cover"
                />

                <br/>
                <Grid xs={10} >
                    <TextField style={{color:"#f50057"}} label={"Write a review"} style={{margin:'1%',padding:'2%',width:'90%'}}></TextField>
                    <Button style={{padding:'2%',margin:'1%'}} variant="contained"> Submit review</Button>
                </Grid>

            </Grid>


            <Grid item xs={4}>


                <h1>{bookData.title}</h1>
                <h3 style={{color:'#f50057'}}>{bookData.author}</h3>
                Based on an original new story by J.K. Rowling, Jack Thorne and John Tiffany, a new play by Jack Thorne, Harry Potter and the Cursed Child is the eighth story in the Harry Potter series and the first official Harry Potter story to be presented on stage. The play will receive its world premiere in London’s West End on July 30, 2016.

                It was always difficult being Harry Potter and it isn’t much easier now that he is an overworked employee of the Ministry of Magic, a husband and father of three school-age children.

                While Harry grapples with a past that refuses to stay where it belongs, his youngest son Albus must struggle with the weight of a family legacy he never wanted. As past and present fuse ominously, both father and son learn the uncomfortable truth: sometimes, darkness comes from unexpected places.


                <br/><br/><br/>
                <Link style={{color:'#f50057'}} href="https://sept-group-8-images.s3-ap-southeast-2.amazonaws.com/1634819921323-Untitled_document_(2).pdf">Download Table Of Content</Link>
            </Grid>


            <Grid item xs={4} >
                <Card  style={{padding:'2%',margin:'2%',height:'450px',width:'80%'}} >
                <h1 style={{color:'#f50057'}}>  RRP ${(bookData.price + ".00").substr(0, 5)}</h1>
                <h3>Condition: New 😄</h3>
                    <h3>Stock: In Stock ✅</h3>
                <Button variant="contained" color="secondary" endIcon={<ShoppingCartIcon/>} style={{width:'80%',height:'20',margin:'5%',padding:'4%'}} onClick={() => {

                    let newArrayWithAddedBook = [...cartItem,bookData];
                    setCartItem(newArrayWithAddedBook)
                    console.log("🛍")
                    console.log(cartItem)

                }}>Add to cart</Button>
                </Card>
            </Grid>
        </Grid>
    </div>
    )
}

export default BookDetail