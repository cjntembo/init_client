import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { EmployeeContext } from "../employee/EmployeeProvider"
import { BinLocationContext } from "./BinLocationProvider"


export const BinLocationForm = () => {
    const history = useHistory()
    const {updateBinLocation,
        updateBinLocationById,
        getBinLocations,
        addBinLocation,
        getBinLocationById,
        bin_location} = useContext(BinLocationContext)

    const {employee, getEmployees} = useContext(EmployeeContext)

    const { bin_locationId } = useParams()
    const { employeeId } = useParams()

    const [ currentBinLocation, setCurrentBinLocation ] = useState({
        bin_location_name:"",
        binned_by:"",
    })

    const handleControlledInputChange = (event) => {
        const newBinLocation = {...currentBinLocation}
        newBinLocation[event.target.name] = event.target.value
        setCurrentBinLocation(newBinLocation)
    };

    const handleSaveBinLocation = () => {
        if (bin_locationId === 0) {
            window.alert("Please Create a New Bin Location")
        } else {
            if (bin_locationId) {
                updateBinLocation({
                    id: bin_location.id,
                    bin_location_name: bin_location.bin_location_name,
                    binned_by: bin_location.employee.id
                    
                })
                    .then(() => history.push("/bin_locations"))
            } else {
            
                addBinLocation({
                    bin_location_name: currentBinLocation.bin_location_name,
                    binned_by: bin_location.employee.id
                    
                })
                    .then(() => history.push("/bin_locations"))
            }
        }
    }

    useEffect(() => {
        getBinLocations()
        getEmployees()
    },[]);
    
    useEffect(() => {
        getBinLocationById(parseInt(bin_locationId))
        .then(bin_location => {
            setCurrentBinLocation(bin_location)
        })
    },[]);

    return (
        <>
            <form className='bin_location_form'>
                <h2>{bin_location?.bin_location_name}</h2>
                <div className='Bin_location_edit'>
                    <fieldset>
                        <div className="bin_location_form_group">
                            <label htmlFor="bin_location_name">Bin Location Name: </label>
                            <input type="text" name="bin_location_name" required autoFocus className="form-control"
                                placeholder={currentBinLocation?.bin_location_name}
                                defaultValue={bin_location ? bin_location?.bin_location_name : currentBinLocation?.bin_location_name}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="bin_location_form_group">
                            <label htmlFor="binned_by">Binned By: </label>
                            <input type="text" name="binned_by" required autoFocus className="form-control"
                                placeholder={currentBinLocation?.binned_by}
                                defaultValue={bin_location ? bin_location?.binned_by : currentBinLocation?.binned_by}
                                onChange={handleControlledInputChange} />
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