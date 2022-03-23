import React, { useState } from "react"

export const BinLocationContext = React.createContext()
const url = "http://localhost:8000"

export const BinLocationProvider = (props) => {
    const [bin_locations, setBin_locations ] = useState([])
    const [bin_location, setBin_location] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getBinLocations = () => {
        return fetch(`${url}/bin_locations`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_final_token")}`
            }
        })
            .then(response => response.json())
            .then(setBin_locations)
    }

    const getBinLocationById = bin_locationId => {
        return fetch(`${url}/bin_locations/${bin_locationId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_final_token")}`
            }
        })
        .then(res => res.json())
        .then(res => {
          setBin_location(res)
          return res
        })
    }

    const addBinLocation = bin_location => {
        return fetch(`${url}/bin_locations`, {
          method: "POST",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bin_location)
        })
        .then(res => res.json())
      }

    const deleteBinLocation = bin_locationId => {
    return fetch(`${url}/bin_locations/${bin_locationId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          }
    })
    .then(getBinLocations)
    }

    const updateBinLocation = bin_location => {
        return fetch(`${url}/bin_locations/${bin_location.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bin_location)
        })
        .then(getBinLocations)
      }

    const updateBinLocationById = bin_location => {
      return fetch(`${url}/bin_locations/${bin_location.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Token ${localStorage.getItem("init_final_token")
        }`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify(bin_location)
      })
      .then(getBinLocations)
    }

    return (
        <BinLocationContext.Provider value={{
            searchTerms,
            setSearchTerms,
            bin_locations,
            bin_location,
            getBinLocations,
            getBinLocationById,
            addBinLocation,
            deleteBinLocation,
            updateBinLocation,
            updateBinLocationById
        }}>
            {props.children}
        </BinLocationContext.Provider>
    )
}