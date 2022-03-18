import React, { useState } from "react"

export const EmployeeContext = React.createContext()
const url = "http://localhost:8000"

export const EmployeeProvider = (props) => {
    const [employee, setEmployee] = useState({events:[]})
    const [searchTerms, setSearchTerms] = useState("")

    const getEmployee = () => {
        return fetch(`${url}/employees`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_token")}`
            }
        })
            .then(response => response.json())
            .then(setEmployee)
    }

    const getEmployeeById = employeeId => {
        return fetch(`${url}/employees/${employeeId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_token")}`
            }
        })
        .then(res => res.json())
    }

    const addEmployee = employee => {
        return fetch(`${url}/employees`, {
          method: "POST",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(employee)
        })
        .then(res => res.json())
      }

    const deleteEmployee = employeeId => {
    return fetch(`${url}/peoples/${employeeId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          }
    })
    .then(getEmployees)
    }

    const updateEmployee = employee => {
        return fetch(`${url}/employees/${employee.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(employee)
        })
        .then(getEmployee)
      }

    return (
        <EmployeeContext.Provider value={{
            searchTerms,
            setSearchTerms,
            employee,
            getEmployee,
            getEmployeeById,
            addEmployee,
            deleteEmployee,
            updateEmployee
        }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}