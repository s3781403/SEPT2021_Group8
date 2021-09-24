import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {ErrorMessage, Form, useFormik, Formik} from 'formik';
import * as yup from 'yup';
import {Button, TextField} from "@mui/material";
import {useParams} from "react-router-dom";
import {createBook, getBookByID, updateBook} from "../../api/books";
import {AppContext} from "../../context/AppContext";
//import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';

function TextError(props) {
    return (
        <div className="error">
            {props.children}
        </div>
    )
}

function AddEditBook() {


    const {bookid} = useParams()
    const {setLoading} = useContext(AppContext)

    const [bookData, setBookData] = useState()
    const editMode = (bookid != null)

    const initialValues = {
        isbn: '',
        title: '',
        category: '',
        author: '',
        publisher: '',
        price: '',
        type: 'physical',
        condition: 3,
        stock: '',
        sellerID: '',
        imageURL: ''
    }

    const validationSchema = yup.object({

        isbn: yup.string().required('Required'),
        title: yup.string().email('Is not a valid email'),
        category: yup.string().required('Required'),
        author: yup.string().required('Required'),
        publisher: yup.string().required('Required'),
        price: yup.string().required('Required'),
        type: yup.string().required('Required'),
        condition: yup.string().required('Required'),
        stock: yup.string().required('Required'),
        sellerID: yup.string().required('Required'),

    });

    useEffect(async () => {
        if (bookid) {
            setLoading(true)
            let fetchedBookInfo = await (getBookByID(bookid));
            setBookData(fetchedBookInfo)
            setLoading(false)
        }
    }, [])


    const formStyle = {
        padding: 10,
        margin: "10",

    }

    const textFieldStyle = {
        // padding:5,
        width: 500, //TODO: do not hardcode the width
    }

    if (!bookData && bookid) return null

    const getInputProps = (name, props) => {
        return {
            name,
            value: props.values[name],
            onChange: props.handleChange,
            error: props.touched[name] && Boolean(props.errors['name']),
            helperText: props.touched[name] && props.errors[name]
        }
    }

    return (
        <Formik
            initialValues={bookData || initialValues}
            // validationSchema={validationSchema}
            onSubmit={async (values) => {
                setLoading(true)
                let newBook;
                if (editMode) newBook = await updateBook(bookid, values)
                else newBook = await createBook(values).then(console.log)
                setLoading(false)
                alert(`${newBook.title} has been ${editMode ? "edited" : "created"}`)
            }}
        >
            {
                props => (
                    <Form onSubmit={props.handleSubmit} onReset={props.handleReset}>
                        {/*<pre>{JSON.stringify(props, null ,2)}</pre>*/}
                        <h1 style={{textAlign: "left"}}>{editMode ? "Edit" : "Add"} Book</h1>
                        <div style={{textAlign: "left", padding: 6, margin: 6}}>
                            <div style={formStyle}>
                                <TextField
                                    label="Title"
                                    type="text"

                                    style={textFieldStyle}
                                    {
                                        ...getInputProps("title", props)
                                    }


                                />
                                {/*<ErrorMessage name="name" component={TextError}/>*/}
                            </div>
                            <div style={formStyle}>
                                <TextField
                                    label="Author"
                                    type="text"
                                    style={textFieldStyle}

                                    {
                                        ...getInputProps("author", props)
                                    }

                                />


                                {/*<ErrorMessage name="name" component={TextError}/>*/}
                            </div>
                            <div style={formStyle}>
                                <TextField
                                    label="ISBN"
                                    type="number"
                                    style={textFieldStyle}

                                    {
                                        ...getInputProps("isbn", props)
                                    }

                                />
                                {/*<ErrorMessage name="name" component={TextError}/>*/}
                            </div>
                            <div style={formStyle}>
                                <TextField
                                    label="Category"
                                    type="text"
                                    style={textFieldStyle}

                                    {
                                        ...getInputProps("category", props)
                                    }
                                />
                                {/*<ErrorMessage name="name" component={TextError}/>*/}
                            </div>
                            <div style={formStyle}>
                                <TextField
                                    label="Publisher"
                                    type="text"
                                    style={textFieldStyle}

                                    {
                                        ...getInputProps("publisher", props)
                                    }

                                />
                                {/*<ErrorMessage name="name" component={TextError}/>*/}
                            </div>
                            {/*<ErrorMessage name="channel" component={TextError}/>*/}

                            <div style={formStyle}>
                                <TextField
                                    label="Price"
                                    type="number"
                                    style={textFieldStyle}

                                    {
                                        ...getInputProps("price", props)
                                    }

                                />
                                {/*<ErrorMessage name="name" component={TextError}/>*/}
                            </div>


                            <div style={formStyle}>
                                <TextField
                                    label="Stock"
                                    type="number"
                                    style={textFieldStyle}
                                    {
                                        ...getInputProps("stock", props)
                                    }

                                />
                                {/*<ErrorMessage name="name" component={TextError}/>*/}
                            </div>

                            <div style={formStyle}>
                                <TextField
                                    label="Seller ID"
                                    type="text"
                                    style={textFieldStyle}
                                    {
                                        ...getInputProps("sellerID", props)
                                    }
                                />
                                {/*<ErrorMessage name="name" component={TextError}/>*/}
                            </div>

                            <div style={formStyle}>
                                <TextField
                                    label="Image URL"
                                    type="text"
                                    style={textFieldStyle}
                                    {
                                        ...getInputProps("imageURL", props)
                                    }


                                />
                                {/*<ErrorMessage name="name" component={TextError}/>*/}
                            </div>
                            <Button variant="outlined" style={{padding: 10, margin: 10}} type={"submit"}>Submit</Button>
                        </div>
                    </Form>
                )
            }


        </Formik>

    );
}


export default AddEditBook;