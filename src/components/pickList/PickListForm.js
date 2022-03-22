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
        pick_list,
        pick_lists,
        getPickLists,
        getPickListById,
        addPickList,
        deletePickList,
        updatePickList,
        updatePickListById,
        pick_list_line,
        pick_list_lines,
        getPickListLines,
        getPickListLineById,
        addPickListLine,
        deletePickListLine,
        updatePickListLine,
        updatePickListLineById} = useContext(PickListContext)
    const {getCustomers} = useContext(CustomerContext)
    const {getInventories} = useContext(InventoryContext)
    const {employee, getEmployees} = useContext(EmployeeContext)
    const {getBinLocations} = useContext(BinLocationContext)
    const { pick_listId } = useParams()
    const { pick_list_lineId } = useParams()
    const { inventoryId } = useParams()
    const { employeeId } = useParams()

    const [ currentPickList, setCurrentPickList ] = useState({
        customer:"",
        picked_by:"",
        pick_list_date:"",
    })

    const [ currentPickListLine, setCurrentPickListLine] =useState({
        pick_list:"",
        inventory:"",
        qty_requested:""
    })

    const handleControlledInputChange = (event) => {
        const newPickList = {...currentPickList}
        newPickList[event.target.name] = event.target.value
        setCurrentPickList(newPickList)
    };

    const handleSavePickList = () => {
        if (pick_listId === 0) {
            window.alert("Please Create New Pick List")
        } else {
            if (pick_listId) {
                updatePickList({
                    id: pick_list.id,
                    customer: pick_list.customer,
                    picked_by: pick_list.picked_by,
                    pick_list_date: pick_list.pick_list_date,
                    pick_list_line: pick_list.pick_list_line
                })
                    .then(() => history.push("/pick_lists"))
            } else {
                
                addPickList({
                    customer: currentPickList.customer,
                    picked_by: currentPickList.picked_by,
                    pick_list_date: pick_list.pick_list_date,
                    pick_list_line: currentPickList.pick_list_line
                })
                    .then(() => history.push("/pick_lists"))
            }
        }
    }

    useEffect(() => {
        debugger
        getPickLists()
        // .then(getCustomers())
        // .then(getEmployees())
        // .then(getPickListLines())
    },[])
    
    return (
        <>
            <form className='pick_list_form'>
                <h2>{pick_list?.customer}</h2>
                <div className='pick_list_edit'>
                    <fieldset>
                        <div className="pick_list_form_group">
                            <label htmlFor="customer">Customer: </label>
                            <input type="text" name="customer" required autoFocus className="form-control"
                                placeholder={currentPickList?.customer}
                                defaultValue={pick_list ? pick_list?.customer : currentPickList?.customer}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="pick_list_form_group">
                            <label htmlFor="picked_by">Picked By: </label>
                            <input type="number" name="picked_by" required autoFocus className="form-control"
                                placeholder={currentPickList?.picked_by}
                                defaultValue={pick_list ? pick_list?.picked_by : currentPickList?.picked_by}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="pick_list_form_group">
                            <label htmlFor="pick_list_date">Pick List Due Date: </label>
                            <input type="date" name="pick_list_date" required autoFocus className="form-control"
                                placeholder={currentPickList?.pick_list_date}
                                defaultValue={pick_list ? pick_list?.pick_list_date : currentPickList?.pick_list_date}
                                onChange={handleControlledInputChange} />
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
                        {inventoryId ? <>Save PickList</> : <>Create Pick List</>}
                    </button>
                    <button className='pick_list_edit--cancel' onClick={() => { history.push('/pick_lists') }}>Cancel</button>
                </div>
            </form>
        </>
    )
}