import React, { useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { EmployeeContext } from "../employee/EmployeeProvider";
import { BinLocationContext  } from "./BinLocationProvider"
import "./BinLocation.css"


export const BinLocationList = () => { 
    const {getBinLocations, deleteBinLocation, bin_locations} = useContext(BinLocationContext)
    const { getEmployees,employee } = useContext(EmployeeContext)
    const handleDelete = (id) => {
        deleteBinLocation(id)
    }

    useEffect(() => {
        getBinLocations()
        getEmployees()
    }, [])

    const history = useHistory()

    return(
        <>
            <div className='bin_locations'>
                <h2 className='bin_locations_title'>Bin Locations</h2>
                <button className="create_button" onClick={() => history.push("/bin_locations/create")}>
                    Create a new Bin Location
                </button>
                <ul  className='bin_location_list'>
                    {
                        bin_locations && bin_locations.map((bin_location) => {
                            return (
                                <section className="binLocation_list_lis" key={`bin_location--${bin_location.id}`}>
                                    <li className="bin__location_li">
                                        Bin Location: {bin_location.bin_location_name} <br/>
                                        <button onClick={() => { history.push(`/bin_locations/edit/${bin_location.id}`) }}>Edit</button>
                                        <button onClick={() => { handleDelete(bin_location.id) }}>Delete Bin Location</button>
                                    </li>
                                </section>
                            );

                        })
                    }
                </ul>
            </div>
        </>
    );
};