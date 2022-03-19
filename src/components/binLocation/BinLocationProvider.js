import React, { useState } from "react"

export const BinLocationContext = React.createContext()
const url = "http://localhost:8000"

export const BinLocationProvider = (props) => {
    const [binLocation, setBinLocation] = useState({events:[]})
    const [searchTerms, setSearchTerms] = useState("")

    const getBinLocations = () => {
        return fetch(`${url}/bin_locations`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_token")}`
            }
        })
            .then(response => response.json())
            .then(setBinLocation)
    }

    const getBinLocationById = binLocationId => {
        return fetch(`${url}/bin_locations/${binLocationId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_token")}`
            }
        })
        .then(res => res.json())
    }

    const addBinLocation = binLocation => {
        return fetch(`${url}/bin_locations`, {
          method: "POST",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(binLocation)
        })
        .then(res => res.json())
      }

    const deleteBinLocation = binLocationId => {
    return fetch(`${url}/bin_locations/${binLocationId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          }
    })
    .then(getBinLocations)
    }

    const updateBinLocation = binLocation => {
        return fetch(`${url}/bin_locations/${binLocation.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(binLocation)
        })
        .then(getBinLocations)
      }

    return (
        <BinLocationContext.Provider value={{
            searchTerms,
            setSearchTerms,
            binLocation,
            getBinLocations,
            getBinLocationById,
            addBinLocation,
            deleteBinLocation,
            updateBinLocation
        }}>
            {props.children}
        </BinLocationContext.Provider>
    )
}