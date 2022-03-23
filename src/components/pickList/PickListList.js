import React, { useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { EmployeeContext } from "../employee/EmployeeProvider";
import { CustomerContext } from "../customer/CustomerProvider";
import { PickListContext  } from "./PickListProvider"
import { InventoryContext } from "../inventory/InventoryProvider";
import "./PickList.css"


export const PickListList = () => { 
    const {getPickLists, deletePickList, pick_lists, setPickList, pickListLines, getPickListLines} = useContext(PickListContext)
    const { getEmployees, setEmployee,employee } = useContext(EmployeeContext)
    const { getCustomers, setCustomer } = useContext(CustomerContext)
    const { getInventories, setInventory} = useContext(InventoryContext)

    const handleDelete = (id) => {
        deletePickList(id)
    }

    useEffect(() => {
        getPickLists()
        // getEmployees()
        // getCustomers()
        // getInventories()
    }, [])

    const history = useHistory()

    return(
        <>
            <div className='pick_lists'>
                <h2 className='pick_list_title'>Pick Lists</h2>
                <button className="create_button" onClick={() => history.push("/pick_lists/create")}>
                    Create a New Pick List
                </button>
                <ul className='pick_list_list'>
                    {
                        pick_lists && pick_lists.map((pick_list) => {
                            return (
                                <section className="pick_list-lis" key={`pick_list--${pick_list.id}`}>
                                    <li className='pickList-li'>
                                        
                                        Customer: {pick_list.customer?.first_name} {pick_list.customer?.last_name}<br/>
                                        Pick By: {pick_list?.picked_by?.user?.first_name} {pick_list?.picked_by?.user?.last_name}<br/>
                                        Pick List Due Date: {pick_list.pick_list_date}<br/>
                                        {/* Pick Detail: <li>
                                            {pickListLines.map(() => {pickListLine})}
                                            </li>> */}
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