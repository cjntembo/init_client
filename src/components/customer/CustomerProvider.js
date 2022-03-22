import React, { useState } from "react"

export const CustomerContext = React.createContext()
const url = "http://localhost:8000"

export const CustomerProvider = (props) => {
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getCustomers = () => {
        return fetch(`${url}/customers`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_final_token")}`
            }
        })
            .then(response => response.json())
            .then(setCustomers)
    }

    const getCustomerById = customerId => {
        return fetch(`${url}/customers/${customerId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_final_token")}`
            }
        })
        .then(res => res.json())
        .then(setCustomer)
    }

    const addCustomer = customer => {
        return fetch(`${url}/customers`, {
          method: "POST",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(customer)
        })
        .then(res => res.json())
      }

    const deleteCustomer = customerId => {
    return fetch(`${url}/customers/${customerId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          }
    })
    .then(getCustomers)
    }

    const updateCustomer = customer => {
        return fetch(`${url}/customers/${customer.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(customer)
        })
        .then(getCustomers)
      }

  const updateCustomerById = customer => {
    return fetch(`${url}/customers/${customer.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("init_final_token")
          }`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(getCustomers)
  }

    return (
        <CustomerContext.Provider value={{
            searchTerms,
            setSearchTerms,
            customers,
            customer,
            getCustomers,
            getCustomerById,
            addCustomer,
            deleteCustomer,
            updateCustomer,
            updateCustomerById
        }}>
            {props.children}
        </CustomerContext.Provider>
    )
}