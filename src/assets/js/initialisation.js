// Load word list from JSON file and store in local storage
export async function loadWordList() {
    console.log("importing word list")
    const response = await fetch('/worddata.json');
    const wordList = await response.json();
    localStorage.setItem('wordList', JSON.stringify(wordList));
  }

 export async function loadThreeLetterWords(){
  const response = await fetch('/three_letter_word.json');
  const wordList = await response.json();
  localStorage.setItem('wordList', JSON.stringify(wordList));

 }
  
  
  

  