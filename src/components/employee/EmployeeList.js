import React, { useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { EmployeeContext  } from "./EmployeeProvider"
import "./Employee.css"


export const EmployeeList = () => { 
    const {getEmployees, deleteEmployee, employees} = useContext(EmployeeContext)
    const handleDelete = (id) => {
        deleteEmployee(id)
    }

    useEffect(() => {
        getEmployees()
    }, [])
    
    const history = useHistory()

    return(
        <>
        <div className='employees'>
            <h2 className='employees_title'>Employees</h2>
            <button className="create_button" onClick={() => history.push("/employees/create")}>
                Create a new Employee
            </button>
            <ul className='employees_list'>
                {
                employees && employees.map(employee => {
                    return (
                        <section className="employees_list_lis" key={`employee--${employee.id}`}>
                            <li className='employees-li'>
                            {employee.user.first_name} {employee.user.last_name}<br/>
                            <button className='employee_edit' 
                            onClick={() => {history.push(`/employees/edit/${employee.id}`)}}>Edit</button>
                            <button onClick={() => {handleDelete(employee.id)}}>Delete Employee</button>
                            </li>
                        </section>
                    )
                })
                }
            </ul>
        </div>
    </>
    )
}