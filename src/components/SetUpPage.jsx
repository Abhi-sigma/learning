import { useState,useEffect } from 'react'
import { redirect } from "react-router-dom";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import  {loadWordList} from  '../assets/js/initialisation'
import '../App.css'


function SetUpPage() {
  
  
  const [name, setName] = useState(localStorage.getItem('childName') || '');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Function to execute on component mount (similar to window.onload)
    const loadInitialData = () => {
      // Perform actions when component mounts (e.g., fetching data, setting up subscriptions)
     loadWordList();
    };

    // Call the function when the component mounts
    loadInitialData();

  
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSaveName = () => {
    const enteredName = inputValue.trim();
    if (enteredName) {
      localStorage.setItem('childName', enteredName);
      setName(enteredName);
      setInputValue(''); // Clear input field
      redirect('/home'); // Navigate to greeting page
    } else {
      alert('Please enter a valid name!');
    }
  };
  
    
    
  

  return (
    <>
       <div className='app_background_start'>
      <div className="welcome_text">Welcome to Word Learner</div>
      <div className='input_container'>
        {name ? (
          <>
            <p>Hello, {name}!</p>
            <button onClick={redirect("/home")}>Start Learning</button>
          </>
        ) : (
          <>
            <span>Enter Your Child Name</span>
            <input
              className='name_input'
              type='text'
              value={inputValue}
              onChange={handleInputChange}
              placeholder='Enter name'
            />
            <button onClick={handleSaveName}>Save</button>
          </>
        )}
      </div>
    </div>

 
    </>
  )

}

export default SetUpPage
