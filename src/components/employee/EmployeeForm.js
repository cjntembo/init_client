import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { EmployeeContext } from "./EmployeeProvider"


export const EmployeeForm = () => {
    const history = useHistory()
    const {updateEmployee, getEmployeeById, employee} = useContext(EmployeeContext)
    const [newEmployee, setNewEmployee] = useState({})

    const { employeeId } = useParams()

    useEffect(() => {
        getEmployeeById(employeeId)
    }, [])


    const handleControlledInputChange = (event) => {
        newEmployee[event.target.name] = event.target.value
        setNewEmployee(newEmployee)
    }

    const handleSaveEdit = (e) => {
        e.preventDefault()
        updateEmployee({
            id: employee.id,
            birth_date: newEmployee.birth_date
        }).then(() =>{
           history.push('/employees')
        })
    }

    return (
        <div className='employee_edit'>
            <form className='employee_edit_form'>
                <fieldset>
                    <div className="employee_edit_form_group">
                            <label htmlFor="birth_date">Employee Birth Date: </label>
                            <input type="date" key={employee.birth_date} name="birth_date" required autoFocus className="form-control"
                                placeholder={employee.birth_date}
                                defaultValue={employee.birth_date}
                                onChange={handleControlledInputChange}/>
                    </div>
                </fieldset>
            </form>
            <button className='employee_edit--save' onClick={handleSaveEdit}>Save</button>
            <button className='employee_edit--cancel' onClick={() => {history.push('/employees')}}>Cancel</button>
        </div>
    )
}