import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'



export function Products() {
    const [data, setData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('https://localhost:7114/api/products');
                setData(response);
                console.log(response)
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);


    const handleDelete = async product => {
        await axios.delete('https://localhost:7114/api/products' + '/' + product.id)
        setData(data.filter(c => c.id !== product.id));
        console.log("Product Deleted Successfully")
    }


    const handleUpdate = (id) => {
        console.log(id)
    }




    return (
        <>
            <h1>Product list</h1>

            <Link to={`/ProductCreate`}>
                <button className="ui primary button">
                    Create New Product
                </button>
            </Link>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map(product =>
                        <Table.Row key={product.id}>
                            <Table.Cell>{product.id}</Table.Cell>
                            <Table.Cell>{product.name}</Table.Cell>
                            <Table.Cell>${product.price}</Table.Cell>
                            <Table.Cell>
                                <Link
                                    to={`/ProductUpdate/${product.id}`}
                                    onClick={() =>
                                        handleUpdate(product.id)}
                                ><button className="ui green button"><FaRegEdit />
                                        Update
                                    </button>
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <button
                                    className="ui red button"
                                    onClick={() => handleDelete(product)}
                                ><FaTrashAlt />Delete
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    )}

                </Table.Body>
            </Table>
        </>
    )
}


export default Products;