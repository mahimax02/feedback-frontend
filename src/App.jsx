import React from "react";
import Registration from "./components/Registration";
import Feedback from "./components/Feedback";
import AdminDashboard from "./components/AdminDashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import './App.css'
import EditFeedback from "./components/EditFeedback";
import ViewFeedback from "./components/ViewFeedback";
import UserList from "./components/UserList";


const route  = createBrowserRouter([
    {
        path:'/',
        element:<Login></Login>
    },
    {
        path:'/register',
        element:<Registration></Registration>
    },
    {
        path:'/feedback',
        element:<Feedback></Feedback>
    },
    {
        path:'/dashboard',
        element:<AdminDashboard></AdminDashboard>
    },
    {
      path:'/editfeedback',
      element:<EditFeedback></EditFeedback>
    },
    {
      path: '/viewfeedback',
      element: <ViewFeedback></ViewFeedback>
    },
    {
      path: '/userlist',
      element: <UserList></UserList>
    }
])

function App() {
  return (
    <div>
      <h1>Feedback Management System</h1>
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
