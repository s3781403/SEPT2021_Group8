import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions} from '@mui/material';
import {useHistory} from 'react-router-dom'
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {deleteBook} from "../../api/books";


export default function AdminBookCard({book}) {

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

    return (

            <Card xs={{width: '100%',height:'100%'}}>
                <CardActionArea style={{paddingTop: '15px'}} onClick={() => {
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
                    <CardContent style={{height:'150px'}}>
                        <Typography gutterBottom variant="h5" component="div" style={{height:"80px"}}>
                            {book.title}
                        </Typography>
                        <Typography variant="body2" color="secondary">
                            {book.author}
                        </Typography>
                        <Typography variant={"h6"} color="text.primary">
                            ${(book.price + ".00").substr(0, 5)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                    <CardActions disableSpacing>
                        <IconButton color="primary" onClick={() =>{goToEditPage(book.id)}}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error"  onClick={async () => {
                            (await deleteBook(book.id))
                            alert(book.id + "has been deleted")
                        }} >
                            <DeleteForeverIcon />
                        </IconButton>
                    </CardActions>

            </Card>
    );
}

