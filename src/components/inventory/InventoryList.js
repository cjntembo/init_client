import React, { useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { BinLocationContext } from "../binLocation/BinLocationProvider";
import { EmployeeContext } from "../employee/EmployeeProvider";
import { InventoryContext  } from "./InventoryProvider"
// import "./Inventory.css"


export const InventoryList = () => { 
    const {getInventories, deleteInventory, inventories} = useContext(InventoryContext)
    const { getEmployees, employees } = useContext(EmployeeContext)
    const { getBinLocations, bin_locations } = useContext(BinLocationContext)
    
    const handleDelete = (id) => {
        deleteInventory(id)
    }

    useEffect(() => {
        getInventories()
        getEmployees()
        getBinLocations()
    }, [])

    const history = useHistory()

    return(
        <>
            <div className='inventories'>
                <h2 className='inventories_title'>Inventory</h2>
                <button onClick={() => history.push("/inventories/create")}>
                    Create New Inventory
                </button>
                <ul className='inventory_list'>
                    {
                        inventories && inventories.map((inventory) => {
                            return (
                                <section key={`inventory--${inventory.id}`}>
                                    <li >
                                        Description: {inventory.description}<br/>
                                        Unit Price: {inventory.unit_price}<br/>
                                        Quantity Available: {inventory.qty_available}<br/>
                                        {/* {inventory.bin_location}  */}
                                        <button onClick={() => { history.push(`/inventories/edit/${inventory.id}`) }}>Edit</button>
                                        <button onClick={() => { handleDelete(inventory.id) }}>Delete Inventory</button>
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