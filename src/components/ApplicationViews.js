import React from "react";
import { Route } from "react-router-dom";
import { EmployeeProvider } from "./employee/EmployeeProvider";
import { EmployeeCreate } from "./employee/EmployeeCreate";
import { EmployeeList } from "./employee/EmployeeList";
import { EmployeeForm } from "./employee/EmployeeForm";
import { CustomerProvider } from "./customer/CustomerProvider";
import { CustomerList } from "./customer/CustomerList";

export const ApplicationViews = () => {
    return (
      <>
        <main
          style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem",
          }}
        >
          <EmployeeProvider>
            <CustomerProvider>

              <Route exact path="/employees">
                <EmployeeList />
              </Route>
              <Route exact path="/employees/create">
                <EmployeeCreate />
              </Route>
              <Route exact path="/employees/edit/:employeeId">
                <EmployeeForm />
              </Route>

              <Route exact path="/customers">
                <CustomerList />
              </Route>

            </CustomerProvider>
          </EmployeeProvider>
        </main>
      </>
    )
  }