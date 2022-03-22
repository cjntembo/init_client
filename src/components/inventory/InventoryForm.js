import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { BinLocationContext } from "../binLocation/BinLocationProvider"
import { EmployeeContext } from "../employee/EmployeeProvider"
import { InventoryContext } from "./InventoryProvider"


export const InventoryForm = () => {
    const history = useHistory()
    const {updateInventory,
        updateInventoryById,
        getInventories,
        addInventory,
        getInventoryById,
        inventory} = useContext(InventoryContext)

    const {employee, getEmployees} = useContext(EmployeeContext)
    const {getBinLocations} = useContext(BinLocationContext)

    const { inventoryId } = useParams()
    const { employeeId } = useParams()

    const [ currentInventory, setCurrentInventory ] = useState({
        description:"",
        unit_price:"",
        qty_available:"",
        bin_location:"",
        created_by:""
    })

    const handleControlledInputChange = (event) => {
        const newInventory = {...currentInventory}
        newInventory[event.target.name] = event.target.value
        setCurrentInventory(newInventory)
    };

    const handleSaveInventory = () => {
        if (inventoryId === 0) {
            window.alert("Please Enter New Inventory")
        } else {
            if (inventoryId) {
                updateInventory({
                    id: inventory.id,
                    description: inventory.description,
                    unit_price: inventory.unit_price,
                    bin_location:parseInt(inventory.bin_location.id),
                    created_by:parseInt(inventory.employee.id)
                })
                    .then(() => history.push("/inventories"))
            } else {
                
                addInventory({
                    description: currentInventory.description,
                    unit_price: inventory.unit_price,
                    bin_location:parseInt(inventory.bin_location.id),
                    created_by:parseInt(inventory.employee.id)
                })
                    .then(() => history.push("/inventories"))
            }
        }
    }

    useEffect(() => {
            getInventories()
            .then(getBinLocations())
            .then(getEmployees())
        }, []);

    useEffect(() => {
        getInventoryById(parseInt(inventoryId))
        .then(inventory => {
            setCurrentInventory(inventory)
        })
    },[]);
    
    return (
        <>
            <form className='Inventory_form'>
                <h2>{inventory?.description}</h2>
                <div className='Inventory_edit'>
                    <fieldset>
                        <div className="inventory_form_group">
                            <label htmlFor="description">Inventory Name: </label>
                            <input type="text" name="description" required autoFocus className="form-control"
                                placeholder={currentInventory?.description}
                                defaultValue={inventory ? inventory?.description : currentInventory?.description}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="inventory_form_group">
                            <label htmlFor="unit_price">Unit Price: </label>
                            <input type="number" name="unit_price" required autoFocus className="form-control"
                                placeholder={currentInventory?.unit_price}
                                defaultValue={inventory ? inventory?.unit_price : currentInventory?.unit_price}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="inventory_form_group">
                            <label htmlFor="qty_available">Quantity Available: </label>
                            <input type="number" name="qty_available" required autoFocus className="form-control"
                                placeholder={currentInventory?.qty_available}
                                defaultValue={inventory ? inventory?.qty_available : currentInventory?.qty_available}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="inventory_form_group">
                            <label htmlFor="bin_location">Bin Location: </label>
                            <input type="text" name="bin_location" required autoFocus className="form-control"
                                placeholder={currentInventory?.bin_location}
                                defaultValue={inventory ? inventory?.bin_location : currentInventory?.bin_location}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="inventory_form_group">
                            <label htmlFor="created_by">Created By: </label>
                            <input type="text" name="created_by" required autoFocus className="form-control"
                                placeholder={currentInventory?.created_by}
                                defaultValue={inventory ? inventory?.created_by : currentInventory?.created_by}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <button
                        type="submit"
                        onClick={(evt) => {
                            evt.preventDefault();
                            handleSaveInventory();
                        }}
                        className="btn btn-primary"
                    >
                        {inventoryId ? <>Save Inventory</> : <>Create New Inventory</>}
                    </button>
                    <button className='Inventory_edit--cancel' onClick={() => { history.push('/inventories') }}>Cancel</button>
                </div>
            </form>
        </>
    )
}