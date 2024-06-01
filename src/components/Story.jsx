import React, { useState,useEffect } from 'react';
import "../App.css" 
import similarity from '../helpers/similiarityCalculator';
// Ensure you have the CSS file for styling

// Sample story segments with text and image associations
const storySegments = [
  {
    text: "Once upon a time, there was a little girl named Lily ",
    mediaSrc: "/images/girl_in_garden.jpg",
    mediaType:"image"
  },
  {
    text:"But today was not a good day.There was a monster convention nearby",
    mediaSrc:"/videos/girl_walking_video.mp4",
    mediaType:"video"
  },
  {
    text:"Many number of monsters were gathered nearby ",
    mediaSrc:"/images/demons_lurking.jpg",
    mediaType:"image"
  },

  
];


 
// List of clickable words and their associated words
const clickableWords = {
  "lily":["lil"],
  "butterfly": ["but", "butter", "butterfly"],
  "flowers": ["flow", "flower", "flowers"],
  "garden": ["gar", "gard", "garden"],
  // Add more as needed
};

const getContenType = (segment)=>{
    return segment.mediaType;
   


}

// Sound file for click event
const clickSound = new Audio('/sounds/click.mp3');

// Word Component
const Word = ({browniePointsSetter, word, clickHandler,brownieWords }) => {
  const isClickable = Object.keys(clickableWords).includes(word.toLowerCase());
  return (
    <span
      className={isClickable ? 'clickable' : ''}
      onClick={() => isClickable && clickHandler(word)}
    >
      {word}
    </span>
  );
};

// WordList Component
const WordList = ({ words }) => {
  return (
    <div>
      {words.map((word, index) => (
        <div key={index}>{word}</div>
      ))}
    </div>
  );
};

const Story = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [brownieWordsVisible,setBrownieWordsVisible] = useState(false);
  const [browniePointsWords,setBrowniePointsWords] = useState([]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const spokenWord = event.results[0][0].transcript.toLowerCase();
        setTranscript(spokenWord);
        const result = checkMatch(spokenWord);
        if (result){
            setIsNextEnabled(true)
           
        }
        else{
            //need to still switch off the animation
            setIsListening(false)
            setBrownieWordsVisible(true)
        }
      };

      
      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false)
      };

      let brownieWords = GetBrowniePointsWords(storySegments[currentSegment]);

      setBrowniePointsWords(brownieWords)
      setRecognition(recognitionInstance);
    } else {
      alert('Speech Recognition API is not supported in this browser.');
    }
  }, [currentSegment]);

  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text
    speechSynthesis.speak(utterance);
  };

  const nextSegmentClickHandler = ()=>{
    setCurrentSegment((currentSegment)=>currentSegment+1);
    setIsListening(false)
    setBrowniePointsWords([])
    setTranscript("")
  }


  const checkMatch = (spokenWord) => {
    const targetWord = storySegments[currentSegment].text;
    const similarityScore = similarity(spokenWord, targetWord);

    if (similarityScore >= 0.6) {
      alert('Great job! Moving to the next part of the story.');
      setIsListening(false)
      return true
     
    } else {
      alert('Try again!');
      setIsListening(false)
      setBrownieWordsVisible(true)
      return false
    }
  };

  const startRecognition = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const TextOverLay = ({line}) => {
    const words = line.split(' ').map((word, idx) => (
      <React.Fragment key={idx}>
        <Word word={word} onClick={false} />{' '}
      </React.Fragment>
    ));

    return (
        [words]
    );
  };
  
  const GetBrowniePointsWords = (line)=>{
    let brownieWords = [];
    line.text.split(" ").forEach(word => {
        const isClickable = Object.keys(clickableWords).includes(word.toLowerCase());
        if (isClickable){
          brownieWords.push(word)
        }
    })
    return brownieWords;
}

const BrownieComponent = ({browniePointsWords,clickHandler})=>{
    const links = browniePointsWords.map((word,indx)=>(
        <span key={indx} onClick = {clickHandler}>{word}</span>)
    );
    return (
        <>
        <div>Dont worry,You can still go to next part.Click Here</div>
        <>{[links]}</>
        </>
    )

}

// get current text,media
  const { text, mediaSrc } = storySegments[currentSegment];
  let mediaType = getContenType(storySegments[currentSegment]);

  return (
    
    <div>
      <div className="segment">
        {mediaType === "image" 
        ? <img src={mediaSrc} alt={text} className="story-image" />
        :
        <video src={mediaSrc} loop autoPlay muted
            ></video>}
       
        <div className="overlay">
            <TextOverLay line = {text}></TextOverLay>
        </div>
      </div>
      <div className="overlay-bottom">
      <button onClick={startRecognition}>Speak the word</button>
      <div className={`listening-indicator ${isListening ? 'listening' : ''}`}></div>
      <p>{transcript ? `You said: ${transcript}` : 'Say the highlighted word to continue'}</p>
      <>
      {isNextEnabled? 
      <div>
        <button onClick ={()=>handleSpeak(text)} className = "pressable-button">Read Original</button>
        <button onClick ={()=>nextSegmentClickHandler()} className = "pressable-button">Next Part</button>
      </div>:""}
      <div>  {brownieWordsVisible?<BrownieComponent 
                                    browniePointsWords = {browniePointsWords} 
                                    clickHandler = {()=>alert("launch modal")}> 
                                    </BrownieComponent>:""}
     </div>
    
      </>
      
      </div>
    </div>
  );

}


  


export default Story;
