import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import './CreateProduct.css'
import axios from 'axios'
import UseAuth from '../../Context/UseAuth'

// import AccountTreeIcon from "@material-ui/icons"
//import SpellcheckIcon from "@material-ui/icons/Spellcheck";

const CreateProduct = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("");
    const [Category, setCategory] = useState("");
    const [color, setColor] = useState("");
    const [stock, setStock] = useState(0);
    const [imagesPreview, setImagesPreview] = useState("");
    const [categories, setCategories] = useState([])
    const [categoryID, setCategoryID] = useState('')


    const { auth } = UseAuth()

    useEffect(() => {
        const arr = []
        axios.get(
            'http://localhost:3000/category/getCategories',
        ).then(response => {
            response.data.forEach(element => {
                arr.push(element.name)
            });
            setCategories(arr)
        })
    }, [])

    const getCategoryID = () => {
        axios.get(`http://localhost:3000/category/searchCategory/${Category}`,
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`
                }
            }).then(response => {
                setCategoryID(response.data)
                console.log(response.data)
            }).catch(e => {
                console.log(e)
            })
    }

    const create = (e) => {
        e.preventDefault()
        axios.post(
            'http://localhost:3000/product/create',
            JSON.stringify({
                name: name,
                price: price,
                description: description,
                productPictures: imagesPreview,
                stock: stock,
                color: color,
                category: categoryID
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${auth.accessToken}`
                }
            }
        ).then(
            window.alert('product was created')
        ).catch(err => {
            window.alert(err.message)
        })
    }


    return (
        <Fragment>
            <div className="main">
                <Sidebar />
                <div className='newProductContainer'>
                    <form className="createProductForm" onSubmit={create}>
                        <h1>
                            Create Product
                        </h1>
                        <div>
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Product Description"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            />
                        </div>
                        <div>
                            <select onChange={(e) => {
                                setCategory(e.target.value)
                                getCategoryID()
                            }}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Color"
                                required
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Image URL"
                                required
                                value={imagesPreview}
                                onChange={(e) => setImagesPreview(e.target.value)}
                            />
                        </div>
                        <input id="createProductBtn" type="submit" value="SUBMIT" />
                    </form>
                </div>
            </div >
        </Fragment >
    )
}

export default CreateProduct