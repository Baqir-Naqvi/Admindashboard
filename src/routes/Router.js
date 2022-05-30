import { lazy } from 'react'
import protect from './protect.js'
/****Layouts*****/
const FullLayout = lazy(() => import('../layouts/FullLayout'))
/***** Pages ****/

const Starter = lazy(() => import('../views/Starter'))
const About = lazy(() => import('../views/About'))
const Tables = lazy(() => import('../views/ui/Tables'))
const Forms = lazy(() => import('../views/ui/Forms'))
const Adminlogin = lazy(() => import('../views/ui/Adminlogin'))
const NewUser=lazy(()=>import('../views/ui/Newuser'))

/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element:  <FullLayout />,
    children: [
      {
        path: '/',
        exact: true,
        element: <Adminlogin />,
      },
      {
        path: '/starter',
        exact: true,
        element:protect()?  <Starter />:<Adminlogin/>,
      },
      { 
        path: '/about', 
        exact: true, 
        element:protect()?<About />:<Adminlogin/> 
      },
      {
        path: '/table/:user',
        exact: true,
        element:protect()?  <Tables />:<Adminlogin/>,
      },
      {
        path: '/table',
        exact: true,
        element:protect()? <Tables />:<Adminlogin/>,
      },
      {
        path: '/forms',
        exact: true,
        element:protect()? <Forms />:<Adminlogin/>,
      },
      {
        path: '/newuser',
        exact: true,
        element:protect()?  <NewUser />:<Adminlogin/>,
      },
    ],
  },
]

export default ThemeRoutes
