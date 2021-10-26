import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Paper} from '@mui/material';
import {useHistory} from 'react-router-dom'


export default function CartItemBookCard({book}) {

    const routerHistory = useHistory()


    const goToDetailView = (bookId) => {
        const ANIMATION_DELAY = 500;
        setTimeout(() => {
            routerHistory.push(`/book/${bookId}`)
        }, ANIMATION_DELAY)

    }



    return (

        <Paper elevation={0} square>
            <Grid container>

                <Grid item md={3} style={{alignItems: 'center'}}>
                    <br/>
                    <img src={book.imageURL} style={{maxHeight: '200px', width: '100%', objectFit: 'contain'}}/>
                </Grid>
                <Grid item md={6}>
                    <br/>
                    <Typography gutterBottom variant="h5" component="div" style={{
                        maxHeight: '100',
                        maxWidth: '100%',
                        color: '#220f48',
                        textOverflow: "ellipsis"
                    }}>
                        {book.title}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                        by {book.author}
                    </Typography>
                <br/>
                    <Typography variant="body2" color="primary">
                        In Stock ✅
                    </Typography>
                    <Typography variant="body2" color="primary">
                         Type: {book.type}
                    </Typography>
                    <Typography variant="body2" color="primary">
                        Quantity: 1
                    </Typography>
                </Grid>

                    <Grid item md={3}>
                        <br/>

                    <Typography variant={"h6"} color="primary">
                        ${(book.price + ".00").substr(0, 5)}
                    </Typography>
                    </Grid>


            </Grid>
            <br/>
        </Paper>


    );
}

