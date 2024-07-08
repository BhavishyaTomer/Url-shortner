
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import Applayout from './layouts/app-layout'
import './App.css'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Link from './pages/Link'
import RedirectLink from './pages/RedirectLink'
import UrlProvider from './context'
import ProtectedRoutes from './components/ui/ProtectedRoutes'
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
      element:<ProtectedRoutes><Dashboard/></ProtectedRoutes>
    },
    {
      path:'/auth',
      element:<Auth/>
    }
    ,
    {
      path:'/link/:id',
      element:<ProtectedRoutes><Link/></ProtectedRoutes>
    }
    ,{
      path:'/:id',
      element:<ProtectedRoutes><RedirectLink/></ProtectedRoutes>
    }
  ]
    }
  ])

  return (
    <>
    <UrlProvider>
    <RouterProvider router={browserRouter}/>
    </UrlProvider>
    </>
  )
}

export default App
