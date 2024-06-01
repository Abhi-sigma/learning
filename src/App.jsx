import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import SetUpPage from './components/SetUpPage.jsx';
import LearningPage from './components/Learning.jsx';
import ThreeLetterWordsPage from './components/ThreeWordPage.jsx';
import Story from './components/Story.jsx';
import similarity from './helpers/similiarityCalculator';
import WordBreakdown from './components/wordPronounce.jsx';

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
  },{
    path:"/readstory",
    element:<Story/>
  },
  {
    path:"/wordbreakdown",
    element:<WordBreakdown></WordBreakdown>
  },
]);

  
  

  function App({routes}) {
   

    return (
      <>
      
      <RouterProvider router={router}/>
      
        
      </>
    );
  }
  

export default App;