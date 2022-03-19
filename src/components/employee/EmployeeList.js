import React, { useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { EmployeeContext  } from "./EmployeeProvider"
// import "./Employee.css"


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
            <button onClick={() => history.push("/employees/create")}>
                Create a new Employee
            </button>
            <ul className='employees_list'>
                
                {
                employees && employees.map(employee => {
                    return (
                        <li>
                          {employees.id}
                          <button className='employees_edit' 
                          onClick={() => {history.push(`/employees/edit/${employees.id}`)}}>Edit</button>
                          <button onClick={() => {handleDelete(employees.id)}}>Delete Employee</button>
                        </li>
                    )
                   
                })
                }
            </ul>
        </div>
    </>
    )
}