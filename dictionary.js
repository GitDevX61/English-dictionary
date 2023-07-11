const inputEl = document.querySelector('.js-input')
inputEl.value;

const displayEl = document.querySelector('.js-info-text')

const meaningContainerEl = document.querySelector('.js-meaning-container')

const titleEl = document.querySelector('.js-title')
const meaningEl = document.querySelector('.js-meaning')
const audioEl = document.querySelector('.js-audio')

async function fetchAPI(word) {

  try {
    displayEl.style.display = "block";
    meaningContainerEl.style.display = "none";

    displayEl.innerText = `Searching the meaning of "${inputEl.value}" `;
    const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.title) {
      meaningContainerEl.style.display = "block";
      displayEl.style.display = "none";
      titleEl.innerText = word;
      meaningEl.innerText = "N/A"
      audioEl.style.display = "none"
    } else {
      displayEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
  
      titleEl.innerText = data[0].word;
      meaningEl.innerText = data[0].meanings[0].definitions[0].definition;   
      audioEl.src = data[0].phonetics[0].audio;
    }
    
  } catch (error) {
    console.log(error)
    displayEl.innerHTML = 'An error ocurred, please try later again.'
  }
}

inputEl.addEventListener('keyup', (e) => {
  
  if (inputEl.value && e.key === 'Enter') {
    fetchAPI(inputEl.value);
  }
  if (inputEl.value === "") {
    meaningContainerEl.style.display = 'none';
    displayEl.style.display = "block";
    displayEl.innerText = 'Type a word and press Enter';
  }
})

