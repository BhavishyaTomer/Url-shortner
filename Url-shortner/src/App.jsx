
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import Applayout from './layouts/app-layout'
import './App.css'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Link from './pages/Link'
import RedirectLink from './pages/RedirectLink'
function App() {
  const browserRouter=createBrowserRouter([
    {
      element:<Applayout/>,
      children:[{
        path:'/',
        element:<LandingPage/>
      },
    {
      path:'/dashboard',
      element:<Dashboard/>
    },
    {
      path:'/auth',
      element:<Auth/>
    }
    ,
    {
      path:'/link/:id',
      element:<Link/>
    }
    ,{
      path:'/:id',
      element:<RedirectLink/>
    }
  ]
    }
  ])

  return (
    <>
    <RouterProvider router={browserRouter}/>
    </>
  )
}

export default App
