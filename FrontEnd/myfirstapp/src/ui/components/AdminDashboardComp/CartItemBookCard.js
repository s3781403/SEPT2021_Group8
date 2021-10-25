import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Grid, Paper} from '@mui/material';
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

        /* <Card sx={{width: '100%',height:'100%'}}>
             <CardActionArea style={{paddingTop: '20px'}} onClick={() => {
                 goToDetailView(book.id)
             }}>
                 <CardMedia
                     component="img"
                     height="250px"
                     width={'100%'}
                     style={{maxHeight: '250px', maxWidth: '100%', objectFit: 'contain', aspectRatio: 'auto'}}
                     image={book.imageURL}
                     alt="book cover"
                 />
                 <CardContent>
                     <Typography gutterBottom variant="h5" component="div" style={{maxHeight: '100', maxWidth: '100%',color:'#220f48',textOverflow:"ellipsis"}} >
                         {book.title}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                         {book.author}
                     </Typography>
                     <Typography variant={"h6"} color="text.primary">
                         ${(book.price + ".00").substr(0, 5)}
                     </Typography>
                 </CardContent>
             </CardActionArea>
         </Card> */

        <Paper elevation={0} square>
            <Grid container>

                <Grid item lg={3} style={{alignItems: 'center'}}>
                    <br/>
                    <img src={book.imageURL} style={{maxHeight: '200px', width: '100%', objectFit: 'contain'}}/>
                </Grid>
                <Grid item lg={6}>
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

                    <Grid item lg={3}>
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

