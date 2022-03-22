import React, { useState } from "react"

export const PickListContext = React.createContext()
const url = "http://localhost:8000"

export const PickListProvider = (props) => {
    const [pick_list, setPickList] = useState([])
    const [pick_lists, setPickLists] = useState([])
    const [pick_list_line, setPickListLine] = useState([])
    const [pick_list_lines, setPickListLines] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    // pick_lists
    const getPickLists = () => {
        return fetch(`${url}/pick_lists`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_final_token")}`
            }
        })
            .then(response => response.json())
            .then(setPickLists)
    }

    const getPickListById = pick_listId => {
        return fetch(`${url}/pick_lists/${pick_listId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_final_token")}`
            }
        })
        .then(res => res.json())
        .then(setPickList)
    }

    const addPickList = pick_list => {
        return fetch(`${url}/pick_lists`, {
          method: "POST",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pick_list)
        })
        .then(res => res.json())
      }

    const deletePickList = pick_listId => {
    return fetch(`${url}/pick_lists/${pick_listId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          }
    })
    .then(getPickLists)
    }

    const updatePickList = pick_list => {
        return fetch(`${url}/pick_lists/${pick_list.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pick_list)
        })
        .then(getPickLists)
      }

      const updatePickListById = pick_list => {
        return fetch(`${url}/pick_lists/${pick_list.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")
          }`,
          "Content-Type": "application/json"
          },
          body: JSON.stringify(pick_list)
        })
        .then(getPickLists)
      }



    //   pickListLines
      const getPickListLines = () => {
        return fetch(`${url}/pick_list_lines`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_final_token")}`
            }
        })
            .then(response => response.json())
            .then(setPickListLines)
    }

    const getPickListLineById = pick_list_lineId => {
        return fetch(`${url}/pick_list_lines/${pick_list_lineId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_final_token")}`
            }
        })
        .then(res => res.json())
        .then(setPickListLine)
    }

    const addPickListLine = pick_list_line => {
        return fetch(`${url}/pick_list_lines`, {
          method: "POST",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pick_list_line)
        })
        .then(res => res.json())
      }

    const deletePickListLine = pick_list_lineId => {
    return fetch(`${url}/pick_list_lines/${pick_list_lineId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          }
    })
    .then(getPickListLines)
    }

    const updatePickListLine = pick_list_line => {
        return fetch(`${url}/pick_list_lines/${pick_list_line.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pick_list_line)
        })
        .then(getPickListLines)
      }
    
      const updatePickListLineById = pick_list_line => {
        return fetch(`${url}/pick_list_lines/${pick_list_line.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")
          }`,
          "Content-Type": "application/json"
          },
          body: JSON.stringify(pick_list_line)
        })
        .then(getPickListLines)
      }

    return (
        <PickListContext.Provider value={{
            searchTerms,
            setSearchTerms,
            pick_list,
            pick_lists,
            getPickLists,
            getPickListById,
            addPickList,
            deletePickList,
            updatePickList,
            updatePickListById,
            pick_list_line,
            pick_list_lines,
            getPickListLines,
            getPickListLineById,
            addPickListLine,
            deletePickListLine,
            updatePickListLine,
            updatePickListLineById
        }}>
            {props.children}
        </PickListContext.Provider>
    )
}