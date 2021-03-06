import React, { useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { CustomerContext  } from "./CustomerProvider"
import "./Customer.css"


export const CustomerList = () => { 
    const {getCustomers, deleteCustomer, customers} = useContext(CustomerContext)
    const handleDelete = (id) => {
        deleteCustomer(id)
    }

    useEffect(() => {
        getCustomers()
    }, [])

    const history = useHistory()

    return(
        <>
            <div className='customers'>
                <h2 className='customers_title'>Customers</h2>
                <button className="create_button" onClick={() => history.push("/customers/create")}>
                    Create a new Customer
                </button>
                <ul className='customers_list'>
                    {
                        customers && customers.map((customer) => {
                            return (
                                <section className="customer_list_lis" key={`customer--${customer.id}`}>
                                    <li className='customers-li'>
                                        Customer Name: {customer.first_name} {customer.last_name}<br/>
                                        Customer Company: {customer.company}<br/>

                                        <button onClick={() => { history.push(`/customers/edit/${customer.id}`) }}>Edit</button>
                                        <button onClick={() => { handleDelete(customer.id) }}>Delete Customer</button>
                                    </li>
                                </section>
                            );

                        })
                    }
                </ul>
            </div>
        </>
    );
};