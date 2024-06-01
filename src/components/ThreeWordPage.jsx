import React, { useEffect, useState,useRef} from 'react';

function ThreeLetterWordsPage() {
  const [words, setWords] = useState([]);
  const [currentWord,setcurrentWord] = useState();
  const [pairs,setpairs] = useState([]);
  const[isdataLoaded,setisdataLoaded] = useState(false)
  const[nextButtonPressed,setnextButtonPresed] = useState(0);
  let checked = false;
  const utteranceRef = useRef(null);
  let word_pairs = [];
  useEffect(() => {
    // Fetch data when component mounts
    fetchData();
   
  }, []);

  const handleSpeak = (word_to_speak) => {
    // Check if speech synthesis is supported by the browser
    if ('speechSynthesis' in window) {
      // Create a new SpeechSynthesisUtterance instance with the prefix
      const utterance = new SpeechSynthesisUtterance(word_to_speak);
      utteranceRef.current = utterance;

      // Speak the prefix using the default speech synthesis voice
      window.speechSynthesis.speak(utterance);
    } else {
      // Speech synthesis not supported
      alert('Speech synthesis is not supported in this browser.');
    }
  };

  const handleStopSpeak = () => {
    // Stop speaking if there is an active utterance
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }
  };

  function showWord(){
    let randomWord = getRandomWordPair(pairs);
    
    if(randomWord != null){
      const prefix = randomWord[0].slice(0, randomWord[0].length - 1); // Get all characters except the last one
      const suffix = randomWord[0].slice(randomWord[0].length - 1); // Get the last character
      return (
        <div className="card_holder">
        <div className="card">
            {/* <img src="https://placeimg.com/300/200/any" alt="Card Image"/> */}
            <div  onMouseEnter={()=>handleSpeak(prefix)}
                  onMouseLeave={handleStopSpeak}
                  className="card-content">
                <h3>{prefix}</h3>
                <img src="#" alt='Listen'></img>
                <a href="#" className="btn"></a>
            </div>
        </div>
        <div onMouseEnter={()=>handleSpeak(suffix)}
              onMouseLeave={handleStopSpeak}
              className="card">
            {/* <img src="https://placeimg.com/300/200/any" alt="Card Image"/> */}
            <div className="card-content">
                <h3>{suffix}</h3>
                <img src="#" alt='Listen'></img>
                <a href="#" className="btn"></a>
            </div>
        </div>
        <div 
                  onMouseLeave={handleStopSpeak}
                  className="card">
            {/* <img src="https://placeimg.com/300/200/any" alt="Card Image"/> */}
            <div className="card-content">
                <h3>{randomWord}</h3>
                <img src="#" alt='image'></img>
                
            </div>
            <>
            
            <button onClick = {()=>handleSpeak(randomWord)}>I Give Up</button>
            </>
        </div>
        <button className = "btn" onClick = {()=>setnextButtonPresed(nextButtonPressed+1)}>Next</button>
    
        </div>
        )
       
      
    
    }
    else{
      return
    }
  }
   
    
    
    
  function getRandomWordPair(wordPairs) {
    // Check if the wordPairs array is not empty
    if (wordPairs.length === 0) {
      return null; // Return null if the array is empty
    }
  
    // Generate a random index within the bounds of the wordPairs array
    const randomIndex = Math.floor(Math.random() * wordPairs.length);
  
    // Retrieve the random word pair using the random index
    const randomPair = wordPairs[randomIndex];
  
    return randomPair; // Return the randomly selected word pair
  }

  const fetchData = async () => {
    try {
      // Simulated data fetching (replace with your API call or data source)
      const response = await fetch('/threeletterword.json');
      const data = await response.json();
      //console.log(data);
      //later we can have variable which will treat letter ending part and page can be dynamic
      setWords(data['words']['ending_in_t']); // Update state with fetched data
      makePairs(data['words']['ending_in_t']);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const makePairs = (words)=>{
   
    Object.keys(words).map((word_key)=>{
     
     
      let w_value = words[word_key];
      if(Array.isArray(w_value)){
        w_value.map((word)=>{
            let values_ = []
            values_.push(word)
            word_pairs.push(values_)
        })
       
        
      }
      else{
        
        word_pairs.push(w_value);
      }
      
    })
   
    setpairs(word_pairs);
  }

  return (
    <div>
     {showWord()}
    </div>
  );
}

export default ThreeLetterWordsPage;