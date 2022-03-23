import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { BinLocationContext } from "../binLocation/BinLocationProvider"
import { EmployeeContext } from "../employee/EmployeeProvider"
import { InventoryContext } from "./InventoryProvider"


export const InventoryForm = () => {
    const history = useHistory()
    const {updateInventory,
        getInventories,
        addInventory,
        getInventoryById,
        } = useContext(InventoryContext)

    const { inventoryId } = useParams()

    const {employees, getEmployees} = useContext(EmployeeContext)
    const {bin_locations, getBinLocations} = useContext(BinLocationContext)
    const [ currentInventory, setCurrentInventory ] = useState({
        description:"",
        unit_price:"",
        qty_available:"",
        bin_location:"",
        created_by:""
    })


    useEffect(() => {
            getInventories()
            getEmployees()
        }, []);

    useEffect(() => {
        if (inventoryId) {
            getInventoryById(parseInt(inventoryId)).then(res => setCurrentInventory(res)
            )
        }
        getBinLocations()
    }, [inventoryId]);

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
                    id: parseInt(currentInventory.id),
                    description: currentInventory.description,
                    unit_price: currentInventory.unit_price,
                    qty_available: currentInventory.qty_available,
                    bin_locationId: parseInt(currentInventory.bin_location.id),
                    employeeId: parseInt(currentInventory.created_by)
                })
                    .then(() => history.push("/inventories"))
            } else {
                addInventory({
                    description: currentInventory.description,
                    unit_price: currentInventory.unit_price,
                    qty_available: currentInventory.qty_available,
                    bin_locationId: parseInt(currentInventory.bin_location),
                    employeeId: parseInt(currentInventory.created_by)
                })
                    .then(() => history.push("/inventories"))
            }
        }
    }


    return (
        <>
            <form className='Inventory_form'>
                <h2>{currentInventory?.description}</h2>
                <div className='Inventory_edit'>
                    <fieldset>
                        <div className="inventory_form_group">
                            <label htmlFor="description">Inventory Name: </label>
                            <input type="text" name="description" required autoFocus className="form-control"
                                placeholder="Enter Description"
                                defaultValue={currentInventory?.description}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="inventory_form_group">
                            <label htmlFor="unit_price">Unit Price: </label>
                            <input type="number" name="unit_price" required autoFocus className="form-control"
                                placeholder="Enter Price per Unit"
                                defaultValue={currentInventory?.unit_price}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="inventory_form_group">
                            <label htmlFor="qty_available">Quantity Available: </label>
                            <input type="number" name="qty_available" required autoFocus className="form-control"
                                placeholder="Enter Quantity"
                                defaultValue={currentInventory?.qty_available}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="inventory_form_group">
                            <label htmlFor="bin_location_id">Bin Location: </label>
                            <select name="bin_location" className="form-control"  onChange={handleControlledInputChange}>
                            <option value={currentInventory?.bin_location.id}>{currentInventory.bin_location.bin_location_name}</option>
                            {
                                bin_locations.map(bin_location => {
                                    <option key={bin_location.id} value={bin_location.id}>{bin_location.bin_location_name}</option>
                                })
                            }
                            </select>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="inventory_form_group">
                            <label htmlFor="created_by_id">Created By: </label>
                            <select name="created_by" className="form-control"  onChange={handleControlledInputChange}>
                            <option value="0">"Select Employee"</option>
                            {
                                employees.map(created_by => (
                                    <option key={created_by.id} value={created_by.id}>{created_by.user.first_name} {created_by.user.last_name}</option>
                                ))
                            }
                            </select>
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