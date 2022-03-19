import React, { useState } from "react"

export const InventoryContext = React.createContext()
const url = "http://localhost:8000"

export const InventoryProvider = (props) => {
    const [inventory, setInventory] = useState({events:[]})
    const [searchTerms, setSearchTerms] = useState("")

    const getInventories = () => {
        return fetch(`${url}/inventories`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_token")}`
            }
        })
            .then(response => response.json())
            .then(setInventory)
    }

    const getInventoryById = inventoryId => {
        return fetch(`${url}/inventories/${inventoryId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_token")}`
            }
        })
        .then(res => res.json())
    }

    const addInventory = inventory => {
        return fetch(`${url}/inventories`, {
          method: "POST",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(inventory)
        })
        .then(res => res.json())
      }

    const deleteInventory = inventoryId => {
    return fetch(`${url}/inventories/${inventoryId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          }
    })
    .then(getInventories)
    }

    const updateInventory = inventory => {
        return fetch(`${url}/inventories/${inventory.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(inventory)
        })
        .then(getInventories)
      }

    return (
        <InventoryContext.Provider value={{
            searchTerms,
            setSearchTerms,
            inventory,
            getInventories,
            getInventoryById,
            addInventory,
            deleteInventory,
            updateInventory
        }}>
            {props.children}
        </InventoryContext.Provider>
    )
}