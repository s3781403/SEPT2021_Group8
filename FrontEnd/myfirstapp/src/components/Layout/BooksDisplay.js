import React from "react";
import {Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


function Book({title, description}) {
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

    return(



    <Grid container spacing={5}>

        {
            (new Array(12).fill(0)).map((_, i) => {

                return (
                    <Grid key={i} item xs={12} md={6} lg={4}>
                        <Paper className={classes.paper}>
                            <div>
                                <img style={{border: "solid 1px red", width: 'auto', height: "auto",margin:"10 10"}}
                                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1c30aYoFMNapscvNsb2gpnY7S9lYErRi8qg&usqp=CAU"/>
                                <h4>Software Book</h4>
                                <p>$500</p>

                            </div>
                        </Paper>
                    </Grid>
                )
            })
        }
    </Grid>


    )
};
export default Book;