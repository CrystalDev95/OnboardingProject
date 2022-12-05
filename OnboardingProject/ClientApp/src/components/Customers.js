import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import CustomersCreate from './Customers/CustomersCreate';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'



export function Customers() {
    const [data, setData] = useState([])



    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('https://localhost:7114/api/customers');
                setData(response);
                console.log(response)
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);


    const handleDelete = async customer => {
        await axios.delete('https://localhost:7114/api/customers' + '/' + customer.id)
        setData(data.filter(c => c.id !== customer.id));
        console.log("Customer Deleted Successfully")
    }


    const handleUpdate = (id) => {
        console.log(id)
    }




    return (
        <>
            <h1>Customer list</h1>

            <Link to={`/CustomerCreate`}>
                <button className="ui primary button">
                    Create New Customer
                </button>
            </Link>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map(customer =>
                        <Table.Row key={customer.id}>
                            <Table.Cell>{customer.id}</Table.Cell>
                            <Table.Cell>{customer.name}</Table.Cell>
                            <Table.Cell>{customer.address}</Table.Cell>
                            <Table.Cell>
                                <Link
                                    to={`/CustomerUpdate/${customer.id}`}
                                    onClick={() =>
                                        handleUpdate(customer.id)}
                                ><button className="ui green button"><FaRegEdit />
                                        Update
                                    </button>
                                </Link>
                            </Table.Cell>
                                <Table.Cell>
                                <button
                                    className="ui red button"
                                    onClick={() => handleDelete(customer)}
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


export default Customers;