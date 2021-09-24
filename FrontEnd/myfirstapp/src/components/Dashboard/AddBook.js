import React from "react";
import axios from "axios";
import {ErrorMessage, Form, useFormik,Formik} from 'formik';
import * as yup from 'yup';
import {Button, TextField} from "@mui/material";
//import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';

function TextError(props) {
    return (
        <div className="error">
            {props.children}
        </div>
    )
}
function AddBook()
{
//     const paperStyle={
//         padding:50,
//         width:400,
//         margin:"30px"
//     };
//
//
//     const createBook=async () => {
//
//         console.log("create button clicked")
//
//         const isbn = document.getElementById("textISBN").value;
//         const title = document.getElementById("textTitle").value;
//         const category = document.getElementById("textCategory").value;
//         const author = document.getElementById("textAuthor").value;
//         const publisher = document.getElementById("textPublisher").value;
//         const price = document.getElementById("textPrice").value;
//         const type = document.getElementById("textType").value;
//         const condition = document.getElementById("textQuality").value;
//         const stock = document.getElementById("textStock").value;
//         const sellerID = document.getElementById("textSellerId").value;
//
//
// console.log(stock,condition,price,isbn,(typeof stock))
//
//
//         return await axios.post("http://localhost:8080/api/books/create", {
//                 "isbn": parseInt(isbn),
//                 "author": author,
//                 "category": category,
//                 "price": parseFloat(price),
//                 "publisher": publisher,
//                 "sellerID": sellerID,
//                 "title": title,
//                 "type": type,
//                 "condition": parseInt(condition),
//                 "stock": parseInt(stock)
//             },
//             {
//                 headers: {
//                     "Accept": "*/*",
//                     "Access-Control-Allow-Origin": "*"
//                 }
//             });
//
//     }
//     return(
//     <form style={paperStyle}>
//       <Grid container style={{marginLeft:5,marginRight:50}}>
//           <Grid  item xs={10}>
//               <h1 align={"center"}  >Add Book</h1>
//
//
//               <TextField required id="textISBN" label="ISBN" />
//               <TextField required id="textTitle" label="Title"  />
//               <TextField required id="textCategory" label="Category"  />
//               <TextField required id="textAuthor" label="Author"  />
//               <TextField required id="textPublisher" label="Publisher"  />
//               <TextField required id="textPrice" label="Price"  />
//               <TextField required id="textType" label="Type"  />
//               <TextField required id="textQuality" label="Quality"  />
//               <TextField required id="textStock" label="Stock"  />
//               <TextField required id="textSellerId" label="sellerID"  />
//
// <Button onClick={()=>{
//     createBook().then(r => console.log(r)).catch(error=>console.log(error.r));
// }}>Create Book</Button>
//
//
//           </Grid>
//       </Grid>
//
//   </form>


    const initialValues =  {
        isbn: '',
        title: '',
        category: '',
        author: '',
        publisher: '',
        price: '',
        type: '',
        condition: '',
        stock:'',
        sellerID:'',
    }
    const onSubmit = values => {
        alert(JSON.stringify(values, null, 2));
    }

    const validationSchema = yup.object({

        isbn: yup.string().required('Required'),
        title: yup.string().required('Required'),
        category:yup.string().required('Required'),
        author: yup.string().required('Required'),
        publisher: yup.string().required('Required'),
        price: yup.string().required('Required'),
        type: yup.string().required('Required'),
        condition: yup.string().required('Required'),
        stock:yup.string().required('Required'),
        sellerID:yup.string().required('Required'),

    });

    const formStyle={
        padding:10,
        margin:"10"
    }

    const textFieldStyle={
        padding:5,
        width:500,

    }
    return(

        <Formik

            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <Form>
                <h1 style={{textAlign:"left"}}>Add Book</h1>
                <div style={{textAlign:"left",padding:6,margin:6}} >
                <div style={formStyle}>
                    <TextField
                        label="Title"
                        type="text"
                        id="text"
                        name="name"
                        style={textFieldStyle}
                    />
                    <ErrorMessage name="name" component={TextError}/>
                </div>
                    <div style={formStyle}>
                        <TextField
                            label="Author"
                            type="text"
                            id="text"
                            name="name"
                            style={textFieldStyle}
                        />
                        <ErrorMessage name="name" component={TextError}/>
                    </div>
                    <div style={formStyle}>
                        <TextField
                            label="ISBN"
                            type="text"
                            id="text"
                            name="name"
                            style={textFieldStyle}
                        />
                        <ErrorMessage name="name" component={TextError}/>
                    </div>
                    <div style={formStyle}>
                        <TextField
                            label="Category"
                            type="text"
                            id="text"
                            name="name"
                            style={textFieldStyle}
                        />
                        <ErrorMessage name="name" component={TextError}/>
                    </div>
                    <div style={formStyle}>
                        <TextField
                            label="Publisher"
                            type="text"
                            id="text"
                            name="name"
                            style={textFieldStyle}
                        />
                        <ErrorMessage name="name" component={TextError}/>
                    </div>
                <ErrorMessage name="channel" component={TextError}/>

                    <div style={formStyle}>
                        <TextField
                            label="Price"
                            type="number"
                            id="text"
                            name="name"
                            style={textFieldStyle}
                        />
                        <ErrorMessage name="name" component={TextError}/>
                    </div>


                    <div style={formStyle}>
                        <TextField
                            label="Stock"
                            type="number"
                            id="text"
                            name="name"
                            style={textFieldStyle}
                        />
                        <ErrorMessage name="name" component={TextError}/>
                    </div>

                    <div style={formStyle}>
                        <TextField
                            label="Seller ID"
                            type="text"
                            id="text"
                            name="name"
                            style={textFieldStyle}
                        />
                        <ErrorMessage name="name" component={TextError}/>
                    </div>

                    <div style={formStyle}>
                        <TextField
                            label="Image URL"
                            type="text"
                            id="text"
                            name="name"
                            style={textFieldStyle}
                        />
                        <ErrorMessage name="name" component={TextError}/>
                    </div>
                    <Button variant="outlined" style={{padding:10 ,margin:10}} onClick={onSubmit}>Submit</Button>
                    </div>
            </Form>
        </Formik>

    );
};
export default AddBook;