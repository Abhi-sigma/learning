import React from 'react'
import ReactDOM from 'react-dom/client'
import SetUpPage from './components/SetUpPage.jsx'
import LearningPage from './components/Learning.jsx'
import App from './App.jsx'
import './index.css'
import Header from './components/Header.jsx'
import ThreeLetterWordsPage from './components/ThreeWordPage.jsx'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/setuppage",
    element: <SetUpPage></SetUpPage>,
  },
  {
    path:"/",
    
    element:<LearningPage></LearningPage>
  },
  {
    path:"/threeword",
    element:<ThreeLetterWordsPage></ThreeLetterWordsPage>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header></Header>
    <App/>
  </React.StrictMode>,
)
