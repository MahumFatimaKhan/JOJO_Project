import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import './ProductList.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom'
import { BiEdit, BiWindowOpen } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Sidebar from './Sidebar'
import UseAuth from '../../Context/UseAuth'


const ProductList = () => {

    let [products, SetProducts] = useState([])
    const { auth } = UseAuth()

    useEffect(() => {
        axios.get(
            'http://localhost:3000/product/getAllProducts',
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`
                }
            }
        ).then(response => {
            SetProducts(response.data)
        })
    }, [])

    const deleteProduct = async (id, name) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: `Are you sure you want to delete ${name}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await axios.delete(
                            `http://localhost:3000/product/deleteProduct/${id}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${auth.accessToken}`
                                }
                            }
                        ).then(response => {
                            //SetProducts(response.data)
                            window.alert("This product was deleted")
                        }).catch(err => {
                            window.alert('Failed to delete')
                        })
                    }
                },
                {
                    label: 'No',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            willUnmount: () => { },
            afterClose: () => { },
            onClickOutside: () => { },
            onKeypress: () => { },
            onKeypressEscape: () => { },
            overlayClassName: "overlay-custom-class-name"
        })
    }

    return (
        <div className="main">
            <Sidebar />
            <div className="productListContainer">
                <h1 id="productListHeading">ALL PRODUCTS</h1>
                <table className="productListTable">
                    <thead>
                        <tr>
                            <th>
                                Product ID
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Stock
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val._id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.stock}</td>
                                    <td>{val.price}</td>
                                    <td>
                                        <BiEdit />
                                        <button onClick={(e) => deleteProduct(val._id, val.name, e)}>
                                            <RiDeleteBin6Line />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductList
