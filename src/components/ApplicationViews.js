import React from "react";
import { Route } from "react-router-dom";
import { EmployeeProvider } from "./employee/EmployeeProvider";
import { EmployeeCreate } from "./employee/EmployeeCreate";
import { EmployeeList } from "./employee/EmployeeList";
import { EmployeeForm } from "./employee/EmployeeForm";


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
            <Route path="/employees">
              <EmployeeList />
            </Route>
            <Route path="/employees/create">
              <EmployeeCreate />
            </Route>
            <Route path="/employees/edit/:employeeId(\d+)">
              <EmployeeForm />
            </Route>
          </EmployeeProvider>
        </main>
      </>
    )
  }