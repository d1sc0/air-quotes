// set varaibles for relevant DOM items
const quoteContainer = document.getElementById('container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newquoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading spinner
function showSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading spinner
function hideSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from Api
async function getQuote() {
  // show the spinner
  showSpinner();
  const apiUrl = 'https://sjm-api-proxy.herokuapp.com/api/airquote/random';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // check and replace blank author values
    if (data.fields.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.fields.quoteAuthor;
    }

    // change font size based on quote length
    if (data.fields.quoteText.length > 110) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    // populate data
    authorText.innerText = data.fields.quoteAuthor;
    quoteText.innerText = data.fields.quoteText;
    console.log(data);

    // stop loader and show quote
    hideSpinner();
  } catch (error) {
    console.log('whooops, no quote!', error);
  }
}

// tweet quote function
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet/?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newquoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
