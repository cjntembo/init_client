import React, { useState } from "react"

export const AuthContext = React.createContext()

export const AuthProvider = (props) => {
    const [profile, setProfile] = useState([])

    const getProfile = () => {
        return fetch("http://localhost:8000/profile", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_final_id")}`
            }
        })
            .then(response => response.json())
            .then(setProfile)
    }

    return (
        <AuthContext.Provider value={{
            profile, getProfile
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
