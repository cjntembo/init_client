import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { EmployeeContext } from "./EmployeeProvider"


export const EmployeeForm = () => {
    const history = useHistory()
    const {updateEmployee,
        getEmployees,
        addEmployee,
        getEmployeeById,
        } = useContext(EmployeeContext)

    
    const { employeeId } = useParams()
    
    const [ currentEmployee, setCurrentEmployee ] = useState({user: {}})

    
    useEffect(() => {
        getEmployees()
    },[]);

    useEffect(() => {
        if(employeeId){
            getEmployeeById(parseInt(employeeId)).then(res => setCurrentEmployee(res))
        } else {
            setCurrentEmployee({...currentEmployee})
        }
    },[]);
 
    const handleControlledInputChange = (event) => {
        const newEmployee = {...currentEmployee}
            newEmployee[event.target.name] = event.target.value
        // debugger
        setCurrentEmployee(newEmployee)
    };

    const handleSaveEmployee = () => {
        if (employeeId === 0) {
            window.alert("Please Create New Employee")
        } else {
            if (employeeId) {
                updateEmployee({
                    id: parseInt(employeeId),
                    user: {
                        first_name: currentEmployee.first_name,
                        last_name: currentEmployee.user.last_name,
                        email: currentEmployee.user.email,
                    },
                    birth_date: currentEmployee.birth_date,
                    address: currentEmployee.address,
                    city: currentEmployee.city,
                    state: currentEmployee.state,
                    postal_code: currentEmployee.postal_code,
                    country: currentEmployee.country,
                    phone_number: currentEmployee.phone_number
                })
                    .then(() => history.push("/employees"))
            } else {
                addEmployee({
                    first_name: currentEmployee.first_name,
                    last_name: currentEmployee.last_name,
                    email: currentEmployee.email,
                    birth_date: currentEmployee.birth_date,
                    address: currentEmployee.address,
                    city: currentEmployee.city,
                    state: currentEmployee.state,
                    postal_code: currentEmployee.postal_code,
                    country: currentEmployee.country,
                    phone_number: currentEmployee.phone_number
                })
                    .then(() => history.push("/employees"))
            }
        }
    }


    return (
        <>
            <form className='employee_edit_form'>
                <h2>{currentEmployee?.user?.first_name} {currentEmployee?.user?.last_name}</h2>
                <div className='employee_edit'>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="first_name">Employee First Name: </label>
                            <input type="text" name="first_name" required autoFocus className="form-control"
                                placeholder="Please Enter First Name"
                                defaultValue={ employeeId ? currentEmployee?.user?.first_name : currentEmployee.first_name}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="last_name">Employee Last Name: </label>
                            <input type="text" name="last_name" required autoFocus className="form-control"
                                placeholder="Please Enter Last Name"
                                defaultValue={currentEmployee?.user?.last_name}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="email">Employee Email: </label>
                            <input type="text" name="email" required autoFocus className="form-control"
                                placeholder="Email"
                                defaultValue={currentEmployee?.user?.email}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="birth_date">Employee Birth Date: </label>
                            <input type="date" name="birth_date" required autoFocus className="form-control"
                                placeholder={currentEmployee?.birth_date}
                                defaultValue={currentEmployee?.birth_date}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="address">Employee Address: </label>
                            <input type="text" name="address" required autoFocus className="form-control"
                                placeholder={currentEmployee?.address}
                                defaultValue={currentEmployee?.address}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="city">City: </label>
                            <input type="text" name="city" required autoFocus className="form-control"
                                placeholder={currentEmployee?.city}
                                defaultValue={currentEmployee?.city}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="state">State: </label>
                            <input type="text" name="state" required autoFocus className="form-control"
                                placeholder={currentEmployee?.state}
                                defaultValue={currentEmployee?.state}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="postal_code">Postal Code: </label>
                            <input type="text" name="postal_code" required autoFocus className="form-control"
                                placeholder={currentEmployee?.postal_code}
                                defaultValue={currentEmployee?.postal_code}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="country">Country: </label>
                            <input type="tel" name="country" required autoFocus className="form-control"
                                placeholder={currentEmployee?.country}
                                defaultValue={currentEmployee?.country}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    {/* <button 
                    type="submit" 
                    onClick={(e) => { e.preventDefault()
                        SaveEmployee()}} 
                        className="btn btn-primary">
                        Save
                    </button> */}
                    <button
                        type="submit"
                        onClick={(evt) => {
                            evt.preventDefault();
                            handleSaveEmployee();
                        }}
                        className="btn btn-primary"
                    >
                        {employeeId ? <>Save Employee</> : <>Create New Employee</>}
                    </button>
                    <button className='employee_edit--cancel' onClick={() => { history.push('/employees') }}>Cancel</button>
                </div>
            </form>
        </>
    )
}