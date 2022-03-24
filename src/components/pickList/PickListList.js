import React, { useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { EmployeeContext } from "../employee/EmployeeProvider";
import { CustomerContext } from "../customer/CustomerProvider";
import { PickListContext  } from "./PickListProvider"
import { InventoryContext } from "../inventory/InventoryProvider";
import "./PickList.css"


export const PickListList = () => { 
    const {getPickLists, deletePickList, pick_lists, setPickList, pick_list_lines, getPickListLines} = useContext(PickListContext)
    const { getEmployees, setEmployee,employee } = useContext(EmployeeContext)
    const { getCustomers, setCustomer } = useContext(CustomerContext)
    const { inventories, getInventories, setInventory} = useContext(InventoryContext)

    const handleDelete = (id) => {
        deletePickList(id)
    }

    useEffect(() => {
        getPickLists()
        // getEmployees()
        // getCustomers()
        // getPickListLines()
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
                                        Customer: {pick_list.customer?.first_name} {pick_list.customer?.last_name}<br />
                                        Pick By: {pick_list?.picked_by?.user?.first_name} {pick_list?.picked_by?.user?.last_name}<br />
                                        Pick List Due Date: {pick_list.pick_list_date}<br />



                                        <fieldset>
                                            <div className="inventory_form_group">
                                                <label htmlFor="pick_list_id">Pick List Detail: </label>
                                                <ul key="pick_listId" className="pick_list_detail-list">
                                                    {pick_list.pick_list_lines.map(({ inventory, qty_requested }, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <div className="inventories-list-item">
                                                                    <div className="left-section">
                                                                        <label htmlFor={`custom-checkbox-${index}`}>{inventory?.description}</label>
                                                                    </div>
                                                                    <div className="right-section">Quantity Available: {inventory?.qty_available}</div>
                                                                    <label htmlFor="qty_requested">Quantity Requested: {qty_requested}</label>
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </fieldset>




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