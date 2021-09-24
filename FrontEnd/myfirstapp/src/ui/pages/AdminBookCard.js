import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions, Dialog, Grid} from '@mui/material';
import {useHistory} from 'react-router-dom'
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {deleteBook} from "../../api/books";

const sampleImages = [
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1594616847",
    "https://assets.teenvogue.com/photos/5cd4384fac4d9e712fe2ebb0/2:3/w_1852,h_2778,c_limit/The%20Gravity%20of%20Us_.jpg",
    "https://miblart.com/wp-content/uploads/2020/01/crime-and-mystery-cover-scaled-1.jpeg"
]

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default function AdminBookCard({book}) {

    const history = useHistory();
    //const loginPageOpen = () => {history.push('/login')};
    const routerHistory = useHistory()

    const goToEditPage = (bookId) => {
        routerHistory.push(`/admin/book/edit/${bookId}`)
    }
    const goToDetailView = (bookId) => {
        const ANIMATION_DELAY = 500;
        setTimeout(() => {
            routerHistory.push(`/book/${bookId}`)
        }, ANIMATION_DELAY)

    }




    shuffleArray(sampleImages)

    return (

            <Card sx={{width: '100%'}}>
                <CardActionArea style={{paddingTop: '20px'}} onClick={() => {
                    goToDetailView(book.id)
                }}>
                    <CardMedia
                        component="img"
                        height="auto"
                        width={'auto'}
                        style={{maxHeight: '450px', maxWidth: '100%', objectFit: 'contain', aspectRatio: 'auto'}}
                        image={sampleImages[0]}
                        alt="book cover"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {book.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {book.author}
                        </Typography>
                        <Typography variant={"h6"} color="text.primary">
                            ${(book.price + "0000").substr(0, 5)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                    <CardActions disableSpacing>
                        <IconButton onClick={() =>{goToEditPage(book.id)}}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={async () => {
                            (await deleteBook(book.id))
                            alert(book.id + "has been deleted")
                        }} >
                            <DeleteForeverIcon />
                        </IconButton>
                    </CardActions>

            </Card>
    );
}

