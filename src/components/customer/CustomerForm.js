import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { CustomerContext } from "./CustomerProvider"
import { EmployeeContext } from "../employee/EmployeeProvider"


export const CustomerForm = () => {
    const history = useHistory()
    const {updateCustomer,
        updateCustomerById,
        getCustomers,
        addCustomer,
        getCustomerById,
        customer} = useContext(CustomerContext)

    const {employee, getEmployees} = useContext(EmployeeContext)
    const { customerId } = useParams()
    
    const [ currentCustomer, setCurrentCustomer ] = useState({
        email:"",
        company:"",
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        phone_number: "",
        // employee:""
    })

    
 
    const handleControlledInputChange = (event) => {
        const newCustomer = {...currentCustomer}
        newCustomer[event.target.name] = event.target.value
        setCurrentCustomer(newCustomer)
    };

    const handleSaveCustomer = () => {
        if (customerId === 0) {
            window.alert("Please Create New Customer")
        } else {
            if (customerId) {
                updateCustomer({
                    id: currentCustomer.id,
                    email: currentCustomer.email,
                    company: currentCustomer.company,
                    first_name: currentCustomer.first_name,
                    last_name: currentCustomer.last_name,
                    address: currentCustomer.address,
                    city: currentCustomer.city,
                    state: currentCustomer.state,
                    postal_code: currentCustomer.postal_code,
                    country: currentCustomer.country,
                    phone_number: currentCustomer.phone_number,
                    
                })
                    .then(() => history.push("/customers"))
            } else {
                
                addCustomer({
                    email: currentCustomer.email,
                    company: currentCustomer.company,
                    first_name: currentCustomer.first_name,
                    last_name: currentCustomer.last_name,
                    address: currentCustomer.address,
                    city: currentCustomer.city,
                    state: currentCustomer.state,
                    postal_code: currentCustomer.postal_code,
                    country: currentCustomer.country,
                    phone_number: currentCustomer.phone_number,
                    // employee: parseInt(currentCustomer.employee.id)
                })
                    .then(() => history.push("/customers"))
            }
        }
    }

    useEffect(() => {
            getCustomers()
            // .then(getEmployees())
           }, []);

    useEffect(()=>{
        getCustomerById(parseInt(customerId))
        .then(customer => {
            setCurrentCustomer(customer)
        })
    },[]);
    
    
    
    return (
        <>
            <form className='customer_form'>
                <h2>{customer?.email} {customer?.company}</h2>
                <div className='customer_edit'>
                    <fieldset>
                        <div className="customer_form_group">
                            <label htmlFor="email">Customer Email: </label>
                            <input type="email" name="email" required autoFocus className="form-control"
                                placeholder={currentCustomer?.email}
                                defaultValue={customer ? customer?.email : currentCustomer?.email}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="customer_form_group">
                            <label htmlFor="company">Customer Company: </label>
                            <input type="text" name="company" required autoFocus className="form-control"
                                placeholder={currentCustomer?.company}
                                defaultValue={customer ? customer?.company : currentCustomer?.company}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="customer_form_group">
                            <label htmlFor="first_name">Customer First Name: </label>
                            <input type="text" name="first_name" required autoFocus className="form-control"
                                placeholder={currentCustomer?.first_name}
                                defaultValue={customer ? customer?.first_name : currentCustomer?.first_name}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="customer_form_group">
                            <label htmlFor="last_name">Customer Last Name: </label>
                            <input type="text" name="last_name" required autoFocus className="form-control"
                                placeholder={currentCustomer?.last_name}
                                defaultValue={customer ? customer?.last_name : currentCustomer?.last_name}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="customer_form_group">
                            <label htmlFor="address">Customer Address: </label>
                            <input type="text" name="address" required autoFocus className="form-control"
                                placeholder={currentCustomer?.address}
                                defaultValue={customer ? customer?.address : currentCustomer?.address}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="customer_form_group">
                            <label htmlFor="city">City: </label>
                            <input type="text" name="city" required autoFocus className="form-control"
                                placeholder={currentCustomer?.city}
                                defaultValue={customer ? customer?.city : currentCustomer?.city}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="customer_form_group">
                            <label htmlFor="state">State: </label>
                            <input type="text" name="state" required autoFocus className="form-control"
                                placeholder={currentCustomer?.state}
                                defaultValue={customer ? customer?.state : currentCustomer?.state}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="customer_form_group">
                            <label htmlFor="postal_code">Postal Code: </label>
                            <input type="text" name="postal_code" required autoFocus className="form-control"
                                placeholder={currentCustomer?.postal_code}
                                defaultValue={customer ? customer?.postal_code : currentCustomer?.postal_code}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="customer_form_group">
                            <label htmlFor="country">Country: </label>
                            <input type="text" name="country" required autoFocus className="form-control"
                                placeholder={currentCustomer?.country}
                                defaultValue={customer ? customer?.country : currentCustomer?.country}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="customer_form_group">
                            <label htmlFor="phone_number">Phone Number: </label>
                            <input type="tel" name="phone_number" required autoFocus className="form-control"
                                placeholder={currentCustomer?.phone_number}
                                defaultValue={customer ? customer?.phone_number : currentCustomer?.phone_number}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    {/* <fieldset>
                        <div className="customer_form_group">
                            <label htmlFor="employee.id">Employee Id: </label>
                            <input type="text" name="employee.id" required autoFocus className="form-control"
                                placeholder={currentCustomer?.employee.id}
                                defaultValue={currentCustomer?.employee.id}
                                onChange={handleControlledInputChange} />
                        </div>
                    </fieldset> */}
                    
                    <button
                        type="submit"
                        onClick={(evt) => {
                            evt.preventDefault();
                            handleSaveCustomer();
                        }}
                        className="btn btn-primary"
                    >
                        {customerId ? <>Save Customer</> : <>Create New Customer</>}
                    </button>
                    <button className='customer_edit--cancel' onClick={() => { history.push('/customers') }}>Cancel</button>
                </div>
            </form>
        </>
    )
}