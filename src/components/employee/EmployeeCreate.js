import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { EmployeeContext } from "./EmployeeProvider";

export const EmployeeCreate = () => {
    // const birth_date = useRef(EmployeeContext)

    const history = useHistory()
    const {employee_id} = useParams()
    const {addEmployee, getEmployees} = useContext(EmployeeContext)
    const [employee, setEmployee] = useState([]);

   

    useEffect(() => {
        getEmployees().then((data) => setEmployee(data))
    }, []);

    const handleControlledInputChange = (event) => {
        const newEmployee = { ...employee }
        newEmployee[event.target.id] = event.target.value
        setEmployee(newEmployee)
    }

    const handleSaveEmployee= () => {

        if (employee_id === 0) {
            window.alert("Please enter employee")
        } else {
            addEmployee({
                first_name:employee.user.first_name,
                last_name:employee.user.last_name,
                email:employee.user.email,
                birth_date: employee.birth_date,
                address: employee.address,
                city: employee.city,
                state: employee.state,
                postal_code: employee.postal_code,
                country: employee.country,
                phone_number: employee.phone_number
            })
            .then(() => history.push("/employees"))
        }
    }

    return(
        <form className="employeeForm">
            <h2 className="employeeForm_title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="first_name">First Name: </label>
                    <input type="text" id="first_name" required autoFocus className="form-control" placeholder="Employee First Name" onChange={handleControlledInputChange} defaultValue={employee?.first_name} />
                </div>
            </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="last_name">Employee Last Name: </label>
                    <input type="text" id="last_name" required autoFocus className="form-control" placeholder="Employee Last Name" onChange={handleControlledInputChange} defaultValue={employee?.last_name} />
                </div>
            </fieldset>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Employee Email: </label>
                    <input type="email" id="email" required autoFocus className="form-control" placeholder="Employee Email" onChange={handleControlledInputChange} defaultValue={employee?.email} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="birth_date">Birth Date: </label>
                    <input type="date" id="birth_date" required autoFocus className="form-control" placeholder="Employee Birth Date" onChange={handleControlledInputChange} defaultValue={employee?.birth_date} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address: </label>
                    <input type="text" id="address" required autoFocus className="form-control" placeholder="Employee Address" onChange={handleControlledInputChange} defaultValue={employee?.address} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="city">City: </label>
                    <input type="text" id="city" required autoFocus className="form-control" placeholder="City" onChange={handleControlledInputChange} defaultValue={employee?.city} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="state">State: </label>
                    <input type="text" id="state" required autoFocus className="form-control" placeholder="State" onChange={handleControlledInputChange} defaultValue={employee?.state} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="postal_code">Postal Code: </label>
                    <input type="text" id="postal_code" required autoFocus className="form-control" placeholder="Postal Code" onChange={handleControlledInputChange} defaultValue={employee?.postal_code} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="country">Country: </label>
                    <input type="text" id="country" required autoFocus className="form-control" placeholder="Country" onChange={handleControlledInputChange} defaultValue={employee?.country} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phone_number">Phone Number: </label>
                    <input type="phoneNumber" id="phone_number" required autoFocus className="form-control" placeholder="Employee Phone Number" onChange={handleControlledInputChange} defaultValue={employee?.phone_number} />
                </div>
            </fieldset>
            
            <button type="submit"
                onClick={event => {
                    event.preventDefault()
                    handleSaveEmployee()
                }}
                className="btn btn-primary">
                    Save Employee
                </button>
        </form>
    )


}