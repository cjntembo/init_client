import React from "react";
import { Route } from "react-router-dom";
import { EmployeeProvider } from "./employee/EmployeeProvider";
// import { EmployeeCreate } from "./employee/EmployeeCreate";
import { EmployeeList } from "./employee/EmployeeList";
import { EmployeeForm } from "./employee/EmployeeForm";
import { CustomerProvider } from "./customer/CustomerProvider";
import { CustomerList } from "./customer/CustomerList";
import { CustomerForm } from "./customer/CustomerForm";
import { BinLocationProvider } from "./binLocation/BinLocationProvider";
import { BinLocationList } from "./binLocation/BinLocationList";
import { BinLocationForm } from "./binLocation/BinLocationForm";
import { InventoryProvider } from "./inventory/InventoryProvider";
import { InventoryList } from "./inventory/InventoryList";
import { InventoryForm } from "./inventory/InventoryForm";
import { PickListProvider } from "./pickList/PickListProvider";
import { PickListList } from "./pickList/PickListList";
import { PickListForm } from "./pickList/PickListForm";

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
              <BinLocationProvider>
                <InventoryProvider>
                  <BinLocationProvider>
                    <InventoryProvider>
                      <PickListProvider>

                        <Route exact path="/employees">
                          <EmployeeList />
                        </Route>
                        <Route exact path="/employees/create">
                          <EmployeeForm />
                        </Route>
                        <Route exact path="/employees/edit/:employeeId(\d+)">
                          <EmployeeForm />
                        </Route>

                        <Route exact path="/customers">
                          <CustomerList />
                        </Route>
                        <Route exact path="/customers/create">
                          <CustomerForm />
                        </Route>
                        <Route exact path="/customers/edit/:customerId(\d+)">
                          <CustomerForm />
                        </Route>

                        <Route exact path="/bin_locations">
                          <BinLocationList />
                        </Route>
                        <Route exact path="/bin_locations/create">
                          <BinLocationForm />
                        </Route>
                        <Route exact path="/bin_locations/edit/:bin_locationId(\d+)">
                          <BinLocationForm />
                        </Route>

                        <Route exact path="/inventories">
                          <InventoryList />
                        </Route>
                        <Route exact path="/inventories/create">
                          <InventoryForm />
                        </Route>
                        <Route exact path="/inventories/edit/:inventoryId(\d+)">
                          <InventoryForm />
                        </Route>

                        <Route exact path="pick_lists">
                          <PickListList />
                        </Route>
                        <Route exact path="/pick_lists/create">
                          <PickListForm />
                        </Route>
                        <Route exact path="/pick_lists/:pick_listId(\d+)">
                          <PickListForm />
                        </Route>

                      </PickListProvider>
                    </InventoryProvider>
                  </BinLocationProvider>
                </InventoryProvider>
              </BinLocationProvider>
            </CustomerProvider>
          </EmployeeProvider>
        </main>
      </>
    )
  }