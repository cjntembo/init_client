import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { EmployeeContext } from "./EmployeeProvider"


export const EmployeeForm = () => {
    const history = useHistory()
    const {updateEmployee, updateEmployeeById,addEmployee, getEmployees, getEmployeeById, employee} = useContext(EmployeeContext)
    
    const { employeeId } = useParams()
    
    const [ currentEmployee, setCurrentEmployee ] = useState({
        first_name:"",
        last_name:"",
        email: "",
        birth_date: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        phone_number: ""
    })

    useEffect(() => {
            getEmployeeById(employeeId).then((res) => {setCurrentEmployee(res)})
            console.log(employee)
        }, []);

    // useEffect(() => {
    //     if(employeeId) {
    //         getEmployeeById(employeeId).then((data) => {
    //             setCurrentEmployee(prevState => ({
    //                 ...prevState,
                    
    //                 first_name: data.first_name,
    //                 last_name: data.last_name,
    //                 email: data.email,
    //                 birth_date: data.birth_date,
    //                 address: data.address,
    //                 city: data.city,
    //                 state: data.state,
    //                 postal_code: data.postal_code,
    //                 country: data.country,
    //                 phone_number: data.phone_number
    //             }))
    //         })
    //     }
    // }, [employeeId])




    const handleControlledInputChange = (event) => {
        const newEmployee = {...currentEmployee}
        newEmployee[event.target.name] = event.target.value
        setCurrentEmployee(newEmployee)
    };

    // const editMode = currentEmployee.id ? true : false

    const SaveEmployee = () => {
        if (employeeId) {
            updateEmployee({
                id: employee.id,
                first_name: employee.first_name,
                last_name: employee.last_name,
                email: employee.email,
                birth_date: employee.birth_date,
                address: employee.address,
                city: employee.city,
                state: employee.state,
                postal_code: employee.postal_code,
                country: employee.country,
                phone_number: employee.phone_number
            })
            .then(() => history.push("/employees"))
        } else {
            addEmployee({
                first_name:currentEmployee.first_name,
                last_name:currentEmployee.last_name,
                email:currentEmployee.email,
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

    


    return (
        <>
            <h1>{employee?.first_name} {employee?.last_name}</h1>
            <div className='employee_edit'>
                <form className='employee_edit_form'>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="first_name">Employee First Name: </label>
                            <input type="text" key={currentEmployee?.first_name} name="first_name" required autoFocus className="form-control"
                                placeholder={currentEmployee?.first_name}
                                value={employee ? employee?.user.first_name : currentEmployee?.user.first_name}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="last_name">Employee Last Name: </label>
                            <input type="text" key={currentEmployee?.last_name} name="last_name" required autoFocus className="form-control"
                                placeholder={currentEmployee?.last_name}
                                value={employee ? employee?.user.last_name : currentEmployee?.user.last_name}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="email">Employee Email: </label>
                            <input type="text" key={currentEmployee?.email} name="email" required autoFocus className="form-control"
                                placeholder={currentEmployee?.email}
                                value={employee ? employee?.user.email : currentEmployee?.user.email}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="birth_date">Employee Birth Date: </label>
                            <input type="date" key={currentEmployee?.birth_date} name="birth_date" required autoFocus className="form-control"
                                placeholder={currentEmployee?.birth_date}
                                value={employee ? employee?.birth_date : currentEmployee?.birth_date}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="address">Employee Address: </label>
                            <input type="text" key={currentEmployee?.address} name="address" required autoFocus className="form-control"
                                placeholder={currentEmployee?.address}
                                value={employee ? employee?.address : currentEmployee?.address}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="city">City: </label>
                            <input type="text" key={currentEmployee?.city} name="city" required autoFocus className="form-control"
                                placeholder={currentEmployee?.city}
                                value={employee ? employee?.city : currentEmployee?.city}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="state">State: </label>
                            <input type="text" key={currentEmployee?.state} name="state" required autoFocus className="form-control"
                                placeholder={currentEmployee?.state}
                                value={employee ? employee?.state : currentEmployee?.state}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="postal_code">Postal Code: </label>
                            <input type="number" key={currentEmployee?.postal_code} name="postal_code" required autoFocus className="form-control"
                                placeholder={currentEmployee?.postal_code}
                                value={employee ? employee?.postal_code : currentEmployee?.postal_code}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="employee_edit_form_group">
                            <label htmlFor="country">Country: </label>
                            <input type="text" key={currentEmployee?.country} name="country" required autoFocus className="form-control"
                                placeholder={currentEmployee?.country}
                                value={employee ? employee?.country : currentEmployee?.country}
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
                            SaveEmployee();
                        }}
                        className="btn btn-primary"
                    >
                        {employeeId ?  <>Save Employee</> : <>Create New Employee</>}
                    </button>
                    <button className='employee_edit--cancel' onClick={() => { history.push('/employees') }}>Cancel</button>
                </form>
            </div>
        </>
    )
}