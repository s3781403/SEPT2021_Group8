import React, {useContext, useEffect, useState} from "react";
import { Form, Formik} from 'formik';
import {Button, TextField} from "@mui/material";
import {useParams} from "react-router-dom";
import {createBook, getBookByID, updateBook,FileUploadToApi} from "../../../api/books";
import {AppContext} from "../../../context/AppContext";
import MenuItem from "@mui/material/MenuItem";
import {Rating, RatingView} from 'react-simple-star-rating'
import Typography from "@mui/material/Typography";
import { FileUploader } from "react-drag-drop-files";

function AddEditBook() {


    const imageFileTypes = ["JPG", "PNG", "GIF","jpg", "png", "jpeg"];
    const pdfFileTypes=["pdf"];

    const {bookid} = useParams()
    const {setLoading} = useContext(AppContext)

    const [bookData, setBookData] = useState()
    const editMode = (bookid != null)

    const [bookType, setBookType] = useState()

    const initialValues = {
        isbn: '',
        title: '',
        category: '',
        author: '',
        publisher: '',
        price: '',
        type: '',
        quality: '',
        stock: '',
        sellerID: '',
        imageURL: '',
        pdfURL:''
    }


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

    const handleChange = (event) => {
        setBookType(event.target.value);
    };

    const handleFormSubmit = async (values) => {
        setLoading(true)
        let newBook;
        try {
            if (editMode) newBook = await updateBook(bookid, values)
            else newBook = await createBook(values)
            alert(`${newBook.title} has been ${editMode ? "Edited" : "Created"}`)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }


    };

    return (

        <Formik

            initialValues={bookData || initialValues}

            onSubmit={(values) => handleFormSubmit(values)}>
            {

                (props) => (
                    <Form onSubmit={props.handleSubmit} onReset={props.handleReset}>
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

                            </div>

                            <div style={formStyle}>
                                <TextField
                                    label="Price"
                                    type="number"
                                    style={textFieldStyle}

                                    {
                                        ...getInputProps("price", props)
                                    }

                                />

                            </div>

                            <div style={formStyle}>
                                <div>
                                    <TextField
                                        select
                                        label="Type"
                                        value={bookType}
                                        onChange={handleChange}
                                        style={textFieldStyle}
                                        {
                                            ...getInputProps("type", props)
                                        }
                                    >

                                        <MenuItem value={"physical"}>
                                            Physical
                                        </MenuItem>
                                        <MenuItem value={"ebook"}>
                                            E-Book
                                        </MenuItem>


                                    </TextField>
                                </div>
                            </div>

                            <div style={formStyle}>

                                <Typography variant={"subtitle1"}>
                                    Quality
                                </Typography>
                                <Rating name={'quality'} onClick={(rating) => {
                                    props.setFieldValue('quality', rating)
                                    setTimeout(() => props.setFieldTouched('quality', true))
                                }} ratingValue={parseInt(props.values.quality) || 0} /* Rating Props */ />

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

                            </div>

                            <div style={formStyle}>
                                <TextField
                                    label="Seller ID"
                                    type="number"
                                    style={textFieldStyle}
                                    {
                                        ...getInputProps("sellerID", props)
                                    }
                                />
                            </div>

                            <div style={formStyle}>
                                <img src={props.values.imageURL} />
                                <FileUploader
                                    handleChange={async (file) => {
                                        const s3Url = await FileUploadToApi(file)
                                        props.setFieldValue('imageURL', s3Url)
                                        console.log(s3Url)
                                    }}
                                    name="file"
                                    types={imageFileTypes}
                                />
                            </div>

                            <div style={formStyle}>
                                <FileUploader
                                    handleChange={async (file) => {
                                        const s3Url = await FileUploadToApi(file)
                                        console.log(s3Url)
                                        props.setFieldValue('pdfURL', s3Url)
                                    }}
                                    name="file"
                                    types={pdfFileTypes}
                                />
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