import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'



export function Sales() {
    const [data, setData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('https://localhost:7114/api/sales');
                setData(response);
                console.log(response)
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);







    const handleDelete = async sale => {
        await axios.delete('https://localhost:7114/api/sales' + '/' + sale.id)
        setData(data.filter(s => s.id !== sale.id));
        console.log("Sale Deleted Successfully")
    }


    const handleUpdate = (id) => {
        console.log(id)
    }




    return (
        <>
            <h1>Sale list</h1>

            <Link to={`/SaleCreate`}>
                <button className="ui primary button">
                    Create New Sale
                </button>
            </Link>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>ProductID</Table.HeaderCell>
                        <Table.HeaderCell>CustomerID</Table.HeaderCell>
                        <Table.HeaderCell>StoreID</Table.HeaderCell>
                        <Table.HeaderCell>Date Sold</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map(sale =>
                        <Table.Row key={sale.id}>
                            <Table.Cell>{sale.id}</Table.Cell>
                            <Table.Cell>{sale.productId}</Table.Cell>
                            <Table.Cell>{sale.customerId}</Table.Cell>
                            <Table.Cell>{sale.storeId}</Table.Cell>
                            <Table.Cell>{sale.dateSold}</Table.Cell>
                            <Table.Cell>
                                <Link
                                    to={`/SaleUpdate/${sale.id}`}
                                    onClick={() =>
                                        handleUpdate(sale.id)}
                                ><button className="ui green button"><FaRegEdit />
                                        Update
                                    </button>
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <button
                                    className="ui red button"
                                    onClick={() => handleDelete(sale)}
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


export default Sales;