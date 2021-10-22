import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Grid} from '@mui/material';
import {useHistory} from 'react-router-dom'


export default function BookCardMaterial({book}) {

    const routerHistory = useHistory()

    const goToDetailView = (bookId) => {
        const ANIMATION_DELAY = 500;
        setTimeout(() => {
            routerHistory.push(`/book/${bookId}`)
        }, ANIMATION_DELAY)

    }

    return (

            <Card sx={{width: '100%',height:'100%'}}>
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
            </Card>

    );
}

