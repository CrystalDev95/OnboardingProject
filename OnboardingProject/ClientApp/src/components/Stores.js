import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'



export function Stores() {
    const [data, setData] = useState([])



    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('https://localhost:7114/api/stores');
                setData(response);
                console.log(response)
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);


    const handleDelete = async store => {
        await axios.delete('https://localhost:7114/api/stores' + '/' + store.id)
        setData(data.filter(c => c.id !== store.id));
        console.log("Store Deleted Successfully")
    }


    const handleUpdate = (id) => {
        console.log(id)
    }




    return (
        <>
            <h1>Store list</h1>

            <Link to={`/StoreCreate`}>
                <button className="ui primary button">
                    Create New Store
                </button>
            </Link>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map(store =>
                        <Table.Row key={store.id}>
                            <Table.Cell>{store.id}</Table.Cell>
                            <Table.Cell>{store.name}</Table.Cell>
                            <Table.Cell>{store.address}</Table.Cell>
                            <Table.Cell>
                                <Link
                                    to={`/StoreUpdate/${store.id}`}
                                    onClick={() =>
                                        handleUpdate(store.id)}
                                ><button className="ui green button"><FaRegEdit />
                                        Update
                                    </button>
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <button
                                    className="ui red button"
                                    onClick={() => handleDelete(store)}
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


export default Stores;