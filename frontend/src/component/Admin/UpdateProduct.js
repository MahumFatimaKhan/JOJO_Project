import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import UseAuth from '../../Context/UseAuth'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'

const UpdateProduct = () => {

    const [product, setProduct] = useState(JSON.parse(localStorage.getItem("product")))
    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [description, setDescription] = useState(product.description)
    const [Category, setCategory] = useState('');
    const [color, setColor] = useState(product.color)
    const [stock, setStock] = useState(product.stock)
    const [imagesPreview, setImagesPreview] = useState(product.productPictures)
    const [categories, setCategories] = useState([])
    const [categoryID, setCategoryID] = useState(product.category)

    const { auth } = UseAuth()
    const navigate = useNavigate()

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

    useEffect(() => {
        axios.get(
            `http://localhost:3000/category/searchCategoryByID/${categoryID}`,
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`
                }
            }
        ).then(response => {
            setCategory(response.data)
        })
    })

    const updateProduct = (e) => {
        e.preventDefault()
        axios.put(
            `http://localhost:3000/product/updateProduct/${product._id}`,
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
                    "Authorization": `Bearer ${auth.accessToken}`
                }
            }
        ).then(() => {
            window.alert("Updated")
            localStorage.removeItem("product")
            navigate(`/admin/products`, { replace: true })
        }
        ).catch(err => {
            window.alert("Failed to update")
        })
    }

    const getCategoryID = () => {
        axios.get(`http://localhost:3000/category/searchCategory/${Category}`,
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`
                }
            }).then(response => {
                setCategoryID(response.data)
            }).catch(e => {
                console.log(e)
            })
    }

    return (
        <Fragment>
            <div className="main">
                <Sidebar />
                <div className='newProductContainer'>
                    <form className="createProductForm" onSubmit={updateProduct}>
                        <h1>
                            Update Product
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
                                value={price}
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
                                <option value="Category">{Category}</option>
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
                                value={stock}
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
                        <input className="createProductBtn" type="submit" value="UPDATE" />
                    </form>
                </div>
            </div >
        </Fragment >
    )
}

export default UpdateProduct
