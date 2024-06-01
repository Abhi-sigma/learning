import React, { useState, useRef } from 'react';

// Utility function to check if a character is a vowel
const isVowel = char => 'aeiouy'.includes(char.toLowerCase());
const wordComponents = {
    "convention": [[{"con":"con", "ven":"ven", "son":"tion"}],["ka","n","ve","n","san"]],
    "beautiful": [[{byue:"beau", tee:"ti", ful:"ful"}],["b","yu","ti","ful"]],
    "conversion": [[{"con":"con", "ver":"ver", "zhahn":"sion"}], ["K", "AH", "N", "V", "EH", "R", "ZH", "AH", "N"]]
    // Add more words and their components as needed
};


function splitWord(word) {
    const lowercasedWord = word.toLowerCase();
    if (lowercasedWord in wordComponents) {
        return wordComponents[lowercasedWord];
    } else {
        return false; // Return the word as a single syllable if not found in the dictionary
    }
}


const SyllableCard = ({ syllable, onMouseEnter, onMouseLeave }) => (
    <div
      style={styles.card}
      onMouseEnter={() => onMouseEnter(syllable)}
      onMouseLeave={() => onMouseLeave(syllable)}
    >
      {syllable}
    </div>
  );

  const PronounceCard =({syllable})=>(

    <div
      style={styles.card}
      
    >
      {syllable}
    </div>

  )

  const WholeWord = ({word,onMouseEnter})=>(
    <div style={styles.wholeWordCard} 
        onMouseEnter={()=>onMouseEnter(word)
        }>
        {word}
     </div>


  )

  const AnimateWordContainer = ({animatedWord})=>{
    return (
        <div  className = "container"
        dangerouslySetInnerHTML={{ __html: animatedWord}}>
        
        </div>
    )
  }

const WordBreakdown = () => {
    const [word, setWord] = useState('');
    const [syllables, setSyllables] = useState([[], []]);
    const [hoveredSyllables, setHoveredSyllables] = useState(new Set());
    const [wordPresent,setWordPresent] = useState(false)
    const [animatedWord,setAnimatedWord] = useState("")
    const [unAnimatedWord,setUnAnimatedWord] = useState("")
    const utteranceRef = useRef(null);


    function highlightAndAnimate(word, arrayOfWords) {
        for (let substring of arrayOfWords) {
          const index = word.toLowerCase().indexOf(substring.toLowerCase());
          if (index !== -1) {
            const beforeMatch = word.slice(0, index);
            const match = word.slice(index, index + substring.length);
            const afterMatch = word.slice(index + substring.length);
            let html = `${beforeMatch}<span class="animate">${match}</span>${afterMatch}`;
            return html;
            
          }
        }
        return word; // Return the word as is if no match found
      }
   

    const handleWordChange = e => {
        //clear the input when there is nothing
        if(word.length === 0){
            setWord('');
            setAnimatedWord("")
            setSyllables([[],[]]);
            setHoveredSyllables(new Set());
            setWordPresent(false);      
        }
        setWord(e.target.value);
        const splitSyllables = splitWord(e.target.value);
        if (splitSyllables){
            setSyllables(splitSyllables);
            setWordPresent(true)
            setAnimatedWord(e.target.value)
        }
        // if not found,we have to do this because it does not clear once,we start deleting and tying new word
        else{
            setSyllables([[],[]]);
            setWordPresent(false);
            setAnimatedWord("")
        }
        setHoveredSyllables(new Set());

    };

    const handleMouseLeave = (e)=>{
        handleStopSpeak();
        setAnimatedWord(word)

    }

    const handleStopSpeak = () => {
        // Stop speaking if there is an active utterance
        if (utteranceRef.current) {
            window.speechSynthesis.cancel();
        }
    };

    const handleSyllableHover = (syllable) => {
        let html = highlightAndAnimate(word,[syllables[0][0][syllable]]);
        setAnimatedWord(html)
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(syllable);
        synth.speak(utterance);
        utteranceRef.current = utterance;
        setHoveredSyllables(prev => new Set(prev).add(syllable));
    };

    const handleWholeWordHover = () => {
        if (hoveredSyllables.size === Object.values(syllables[0][0]).length) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(word);
            synth.speak(utterance);
        }
    };

    return (
        <div style={styles.container}>
            <input
                
                type="text"
                value={word}
                onChange={handleWordChange}
                
                placeholder="Enter a word"
                style={styles.input}
            />
            
            
            {wordPresent?
            <>
            <AnimateWordContainer
            animatedWord={animatedWord}
            ></AnimateWordContainer>
            <div style={styles.syllableContainer}>
                <span>Hear it like this</span>
                {Object.keys(syllables[0][0]).map((syllable, index) => (
                    <SyllableCard
                        key={index}
                        syllable={syllable}
                        onMouseEnter={handleSyllableHover}
                        onMouseLeave={handleMouseLeave}
                    />
                ))}
            </div>
            <div style={styles.syllableContainer}>
                <span>Say it like this</span>
                {syllables[1].map((syllable, index) => (
                    <PronounceCard
                        key={index}
                        syllable={syllable}
                       
                    />
                ))}
            </div>
            {hoveredSyllables.size === Object.values(syllables[0][0]).length && (
                <WholeWord word={word}
                onMouseEnter={handleWholeWordHover}
                >

                </WholeWord>
            )}
            </>
            :
            <div>
                {word.length>2?<span>Finding....</span>:<span>Keep tying the word..</span>}
                
            </div>
            }
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        marginBottom: '20px',
    },
    syllableContainer: {
        display: 'flex',
        gap: '10px',
        width:"25vw",
        height:"20vh"
    },
    card: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    wholeWordCard: {
        marginTop: '20px',
        padding: '10px',
        border: '2px solid #000',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    }
   
    
};

export default WordBreakdown;