import React from 'react';
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider
} from 'react-router-dom';

// layouts import
import RootLayout from './layouts/RootLayout';
import EmployeeLayout from './layouts/EmployeeLayout';

// pages import
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employee/Employees';
import AddEmployee from './pages/Employee/AddEmployee';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='employees' element={<EmployeeLayout />}>
          <Route index element={<Employees />} />
          <Route path='add' element={<AddEmployee />} />
        </Route>
      </Route>
    </>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;