import React, { useState } from "react"

export const PickListContext = React.createContext()
const url = "http://localhost:8000"

export const PickListProvider = (props) => {
    const [pickList, setPickList] = useState({events:[]})
    const [pickListLine, setPickListLine] = useState({events:[]})
    const [searchTerms, setSearchTerms] = useState("")

    // pickLists
    const getPickLists = () => {
        return fetch(`${url}/pick_lists`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_token")}`
            }
        })
            .then(response => response.json())
            .then(setPickList)
    }

    const getPickListById = pickListId => {
        return fetch(`${url}/pick_lists/${pickListId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_token")}`
            }
        })
        .then(res => res.json())
    }

    const addPickList = pickList => {
        return fetch(`${url}/pick_lists`, {
          method: "POST",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pickList)
        })
        .then(res => res.json())
      }

    const deletePickList = pickListId => {
    return fetch(`${url}/pick_lists/${pickListId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          }
    })
    .then(getPickLists)
    }

    const updatePickList = pickList => {
        return fetch(`${url}/pick_lists/${pickList.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pickList)
        })
        .then(getPickLists)
      }

    //   pickListLines
      const getPickListLines = () => {
        return fetch(`${url}/pick_list_lines`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_token")}`
            }
        })
            .then(response => response.json())
            .then(setPickListLine)
    }

    const getPickListLineById = pickListLineId => {
        return fetch(`${url}/pick_list_lines/${pickListLineId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_token")}`
            }
        })
        .then(res => res.json())
    }

    const addPickListLine = pickListLine => {
        return fetch(`${url}/pick_list_lines`, {
          method: "POST",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pickListLine)
        })
        .then(res => res.json())
      }

    const deletePickListLine = pickListLineId => {
    return fetch(`${url}/pick_list_lines/${pickListLineId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          }
    })
    .then(getPickListLines)
    }

    const updatePickListLine = pickListLine => {
        return fetch(`${url}/pick_list_lines/${pickListLine.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pickListLine)
        })
        .then(getPickListLines)
      }
    
    return (
        <PickListContext.Provider value={{
            searchTerms,
            setSearchTerms,
            pickList,
            getPickLists,
            getPickListById,
            addPickList,
            deletePickList,
            updatePickList,
            pickListLine,
            getPickListLines,
            getPickListLineById,
            addPickListLine,
            deletePickListLine,
            updatePickListLine
        }}>
            {props.children}
        </PickListContext.Provider>
    )
}