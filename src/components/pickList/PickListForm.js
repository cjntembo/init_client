import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers"
import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { BinLocationContext } from "../binLocation/BinLocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { EmployeeContext } from "../employee/EmployeeProvider"
import { InventoryContext } from "../inventory/InventoryProvider"
import { PickListContext } from "./PickListProvider"


export const PickListForm = () => {
    const history = useHistory()
    const {
        pick_list_lines,
        getPickLists,
        getPickListById,
        getPickListLines,
        getPickListLineById,
        addPickList,
        updatePickList,
        } = useContext(PickListContext)

    const {getCustomers} = useContext(CustomerContext)
    const {inventories, getInventories} = useContext(InventoryContext)
    const {employees, getEmployees} = useContext(EmployeeContext)
    const {getBinLocations} = useContext(BinLocationContext)

    const { pick_listId } = useParams()
    const { pick_list_lineId } = useParams()
    const { inventoryId } = useParams()
    const { employeeId } = useParams()

    const [ currentPickList, setCurrentPickList ] = useState({
        customer:"",
        picked_by:"",
        pick_list_date:"",
        pick_list_line:""
    })

    const [currentPickListLine, setCurrentPickListLine ] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [checkedState, setCheckedState] = useState(
        new Array(inventories.length).fill(false)
    );

    useEffect(() => {
            getPickLists()
            getCustomers()
            getEmployees()
            getPickListLines()
            getInventories()
        },[])

    useEffect(() => {
        if(pick_listId){
            getPickListById(parseInt(pick_listId)).then(res => setCurrentPickList(res)
            )
        }
    },[pick_listId])

    useEffect(() => {
        if(pick_list_lineId){
            getPickListLineById(parseInt(pick_list_lineId)).then(res => setCurrentPickListLine(res)
            )
        }
    },[pick_list_lineId])



    const handleControlledInputChange = (event) => {
        const newPickList = {...currentPickList}
        newPickList[event.target.name] = event.target.value
        setCurrentPickList(newPickList)
        setIsChecked(!isChecked)
    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
    
        setCheckedState(updatedCheckedState);
    }

    const handlePickLine = (evt) => {
            const newPick_list_line = {...currentPickListLine}
            newPick_list_line[evt.target.key] = evt.target.value
            setCurrentPickListLine(newPick_list_line)
            // pick.description = evt.target.key
            // pick.qty_available = evt.target.value
            // pick.qty_requested = evt.target.value
            // pick_list_lines.history.push("/pick_lists")
            .then(() => history.push("/pick_lists"))}

    const handleSavePickList = () => {
        if (pick_listId === 0) {
            window.alert("Please Create New Pick List")
        } else {
            if (pick_listId) {
                updatePickList({
                    id: parseInt(currentPickList.id),
                    customerId: parseInt(currentPickList.customer.id),
                    employeeId: parseInt(currentPickList.picked_by.id),
                    pick_list_date: currentPickList.pick_list_date,
                    pick_list_lineId: parseInt(currentPickList.pick_list_line)
                })
                    .then(() => history.push("/pick_lists"))
            } else {
                addPickList({
                    customerId: parseInt(currentPickList.customer.id),
                    employeeId: parseInt(currentPickList.picked_by.id),
                    pick_list_date: currentPickList.pick_list_date,
                    pick_list_lineId: parseInt(currentPickList.pick_list_line)
                })
                    .then(() => history.push("/pick_lists"))
            }
        }
    }


    return (
        <>
            <form className='pick_list_form'>
                <h2>{currentPickList?.customer}</h2>
                <div className='pick_list_edit'>
                    <fieldset>
                        <div className="pick_list_form_group">
                            <label htmlFor="customer">Customer: </label>
                            <input type="text" name="customer" required autoFocus className="form-control"
                                placeholder="Enter Customer"
                                defaultValue={currentPickList?.customer}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="inventory_form_group">
                            <label htmlFor="picked_by_id">Picked By: </label>
                            <select name="picked_by" className="form-control" onChange={handleControlledInputChange}>
                                <option value="0">"Select Employee"</option>
                                {
                                    employees.map(picked_by => (
                                        <option key={picked_by.id} value={picked_by.id}>{picked_by.user.first_name} {picked_by.user.last_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="pick_list_form_group">
                            <label htmlFor="pick_list_date">Pick List Due Date: </label>
                            <input type="date" name="pick_list_date" required autoFocus className="form-control"
                                placeholder="Enter Due Date"
                                defaultValue={currentPickList?.pick_list_date}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="inventory_form_group">
                            <label htmlFor="inventory_id">Add Inventory: </label>
                            <ul className="inventories-list">
                                {inventories.map(({ description, qty_available }, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="inventories-list-item">
                                                <div className="left-section">
                                                    <input
                                                        type="checkbox"
                                                        id={`custom-checkbox-${index}`}
                                                        name={description}
                                                        value={description}
                                                        checked={checkedState[index]}
                                                        onChange={() => handleOnChange(index)}
                                                    />
                                                    <label htmlFor={`custom-checkbox-${index}`}>{description}</label>
                                                </div>
                                                <div className="right-section">Quantity Available: {qty_available}</div>
                                                <label htmlFor="qty_requested">Quantity Requested: </label>
                                                <input type="number" name="qty_requested" className="form-control-requested" value={currentPickListLine?.qty_requested} onchange={handlePickLine} />
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </fieldset>
                    <button
                        type="submit"
                        onClick={(evt) => {
                            evt.preventDefault();
                            handleSavePickList();
                        }}
                        className="btn btn-primary"
                    >
                        {pick_listId ? <>Save PickList</> : <>Create Pick List</>}
                    </button>
                    <button className='pick_list_edit--cancel' onClick={() => { history.push('/pick_lists') }}>Cancel</button>
                </div>
            </form>
        </>
    )
}
