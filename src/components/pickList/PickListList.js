import React, { useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { EmployeeContext } from "../employee/EmployeeProvider";
import { CustomerContext } from "../customer/CustomerProvider";
import { PickListContext  } from "./PickListProvider"
// import "./Inventory.css"


export const PickListList = () => { 
    const {getPickLists, deletePickList, pick_lists} = useContext(PickListContext)
    const { getEmployees, employees } = useContext(EmployeeContext)
    const { getCustomers, customers } = useContext(CustomerContext)
    const handleDelete = (id) => {
        deletePickList(id)
    }

    useEffect(() => {
        getEmployees()
        getPickLists()
        getCustomers()
    }, [])

    const history = useHistory()

    return(
        <>
            <div className='pick_lists'>
                <h2 className='pick_list_title'>Pick Lists</h2>
                <button onClick={() => history.push("/pick_lists/create")}>
                    Create a New Pick List
                </button>
                <ul className='pick_list_list'>
                    {
                        pick_lists && pick_lists.map((pick_list) => {
                            return (
                                <section>
                                    <li >
                                        Customer: {pick_list.customer}<br/>
                                        Pick By: {pick_list.picked_by}<br/>
                                        Pick List Due Date: {pick_list.pick_list_date}<br/>
                                        <button onClick={() => { history.push(`/pick_lists/edit/${pick_list.id}`) }}>Edit</button>
                                        <button onClick={() => { handleDelete(pick_list.id) }}>Delete Pick list</button>
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