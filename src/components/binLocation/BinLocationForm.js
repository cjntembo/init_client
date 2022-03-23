import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { EmployeeContext } from "../employee/EmployeeProvider"
import { BinLocationContext } from "./BinLocationProvider"


export const BinLocationForm = () => {
    const history = useHistory()
    const {updateBinLocation,
        getBinLocations,
        addBinLocation,
        getBinLocationById,
        } = useContext(BinLocationContext)

    const { bin_locationId } = useParams()

    const {employees, getEmployees} = useContext(EmployeeContext)

    const [ currentBinLocation, setCurrentBinLocation ] = useState({
        bin_location_name:"",
        binned_by:"",
    })
    useEffect(() => {
            getBinLocations()
            getEmployees()
        },[]);

    useEffect(() => {
        if(bin_locationId){
        getBinLocationById(parseInt(bin_locationId)).then(res => setCurrentBinLocation(res)
        )
    }
    },[bin_locationId]);

    const handleControlledInputChange = (event) => {
        const newBinLocation = {...currentBinLocation}
        newBinLocation[event.target.name] = event.target.value
        setCurrentBinLocation(newBinLocation)
    };

    const handleSaveBinLocation = () => {
        if (bin_locationId === 0) {
            window.alert("Please Create a New Bin Location")
        } else {
            if (bin_locationId) {console.log(currentBinLocation)
                updateBinLocation({
                    id: parseInt(currentBinLocation.id),
                    bin_location_name: currentBinLocation.bin_location_name,
                    employeeId: parseInt(currentBinLocation.binned_by)
                })
                    .then(() => history.push("/bin_locations"))
            } else {
                console.log(currentBinLocation)
                addBinLocation({
                    bin_location_name: currentBinLocation.bin_location_name,
                    employeeId: parseInt(currentBinLocation.binned_by),
                })
                    .then(() => history.push("/bin_locations"))
            }
        }
    }

    

    return (
        <>
            <form className='bin_location_form'>
                <h2>{currentBinLocation?.bin_location_name}</h2>
                <div className='Bin_location_edit'>
                    <fieldset>
                        <div className="bin_location_form_group">
                            <label htmlFor="bin_location_name">Bin Location Name: </label>
                            <input type="text" name="bin_location_name" required autoFocus className="form-control"
                                placeholder="Enter Name"
                                value={currentBinLocation?.bin_location_name}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="bi_location_form_group">
                            <label htmlFor="binned_by_id">Binned By: </label>
                            <select name="binned_by" className="form-control"  onChange={handleControlledInputChange}>
                            <option value="0">"Select Employee"</option>
                            {
                                employees.map(binned_by => (
                                    <option key={binned_by.id} value={binned_by.id}>{binned_by.user.first_name} {binned_by.user.last_name}</option>
                                ))
                            }
                            </select>
                        </div>
                    </fieldset>
                    <button
                        type="submit"
                        onClick={(evt) => {
                            evt.preventDefault();
                            handleSaveBinLocation();
                        }}
                        className="btn btn-primary"
                    >
                        {bin_locationId ? <>Save Bin Location</> : <>Create New Bin Location</>}
                    </button>
                    <button className='Bin_location_edit--cancel' onClick={() => { history.push('/bin_locations') }}>Cancel</button>
                </div>
            </form>
        </>
    )
}