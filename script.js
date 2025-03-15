// Function to fetch a random verse
async function fetchRandomVerse() {
    // Get the selected translation or default to 'kjv'
    const translation = document.getElementById('translation').value || 'kjv';
    try {
      const response = await fetch(`https://bible-api.com/?random=verse&translation=${translation}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching verse:', error);
      return null;
    }
  }
  
  // Function to display the verse
  function displayVerse(verse) {
    const verseText = document.getElementById('verse-text');
    const verseReference = document.getElementById('verse-reference');
    const loading = document.getElementById('loading');
    const shareButtons = document.getElementById('share-buttons');
  
    if (verse && verse.verses && verse.verses.length > 0) {
      const firstVerse = verse.verses[0];
      verseText.textContent = firstVerse.text;
      verseReference.textContent = `${firstVerse.book_name} ${firstVerse.chapter}:${firstVerse.verse}`;
  
      // Update Facebook share button
      const facebookButton = document.getElementById('facebook-share');
      const shareText = `${firstVerse.text} - ${firstVerse.book_name} ${firstVerse.chapter}:${firstVerse.verse}`;
      const shareUrl = encodeURIComponent(window.location.href);
  
      facebookButton.onclick = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodeURIComponent(shareText)}`);
      };
  
      shareButtons.style.display = 'flex';
    } else {
      verseText.textContent = 'Failed to fetch verse. Please try again.';
      verseReference.textContent = '';
      shareButtons.style.display = 'none';
    }
  
    loading.style.display = 'none';
    verseText.style.display = 'block';
    verseReference.style.display = 'block';
  }
  
  // Event listener for the generate button
  document.getElementById('generate-btn').addEventListener('click', async () => {
    const verseText = document.getElementById('verse-text');
    const verseReference = document.getElementById('verse-reference');
    const loading = document.getElementById('loading');
    const shareButtons = document.getElementById('share-buttons');
  
    verseText.style.display = 'none';
    verseReference.style.display = 'none';
    shareButtons.style.display = 'none';
    loading.style.display = 'block';
  
    const verse = await fetchRandomVerse();
    displayVerse(verse);
  });

  // Function to copy verse to clipboard
function copyVerseToClipboard() {
    const verseText = document.getElementById('verse-text').textContent;
    const verseReference = document.getElementById('verse-reference').textContent;
    const fullText = `${verseText} - ${verseReference}`;
  
    navigator.clipboard.writeText(fullText).then(() => {
      alert('Verse copied to clipboard!');
    }).catch((error) => {
      console.error('Failed to copy verse:', error);
      alert('Failed to copy verse. Please try again.');
    });
  }
  
  // Event listener for the copy button
  document.getElementById('copy-btn').addEventListener('click', copyVerseToClipboard);
  
  // Function to display the verse
  function displayVerse(verse) {
    const verseText = document.getElementById('verse-text');
    const verseReference = document.getElementById('verse-reference');
    const loading = document.getElementById('loading');
    const shareButtons = document.getElementById('share-buttons');
    const copyButtons = document.getElementById('copy-buttons');
  
    if (verse && verse.verses && verse.verses.length > 0) {
      const firstVerse = verse.verses[0];
      verseText.textContent = firstVerse.text;
      verseReference.textContent = `${firstVerse.book_name} ${firstVerse.chapter}:${firstVerse.verse}`;
  
      // Update Facebook share button
      const facebookButton = document.getElementById('facebook-share');
      const shareText = `${firstVerse.text} - ${firstVerse.book_name} ${firstVerse.chapter}:${firstVerse.verse}`;
      const shareUrl = encodeURIComponent(window.location.href);
  
      facebookButton.onclick = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodeURIComponent(shareText)}`);
      };
  
      shareButtons.style.display = 'flex';
      copyButtons.style.display = 'flex'; // Show the copy button
    } else {
      verseText.textContent = 'Failed to fetch verse. Please try again.';
      verseReference.textContent = '';
      shareButtons.style.display = 'none';
      copyButtons.style.display = 'none';
    }
  
    loading.style.display = 'none';
    verseText.style.display = 'block';
    verseReference.style.display = 'block';
  }

  // Initialize favorites array from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to save a verse to favorites
function saveVerse() {
  const verseText = document.getElementById('verse-text').textContent;
  const verseReference = document.getElementById('verse-reference').textContent;

  const verse = { text: verseText, reference: verseReference };
  favorites.push(verse);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  alert('Verse saved to favorites!');
  displayFavorites();
}

// Function to display favorites
function displayFavorites() {
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = favorites.map((verse, index) => `
    <div class="favorite-item">
      <p>${verse.text} - ${verse.reference}</p>
      <button onclick="removeFavorite(${index})">Remove</button>
    </div>
  `).join('');
}

// Function to remove a favorite
function removeFavorite(index) {
  favorites.splice(index, 1);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  displayFavorites();
}

// Event listener for the save button
document.getElementById('save-btn').addEventListener('click', saveVerse);

// Function to display the verse
function displayVerse(verse) {
  const verseText = document.getElementById('verse-text');
  const verseReference = document.getElementById('verse-reference');
  const loading = document.getElementById('loading');
  const shareButtons = document.getElementById('share-buttons');
  const copyButtons = document.getElementById('copy-buttons');
  const saveButtons = document.getElementById('save-buttons');

  if (verse && verse.verses && verse.verses.length > 0) {
    const firstVerse = verse.verses[0];
    verseText.textContent = firstVerse.text;
    verseReference.textContent = `${firstVerse.book_name} ${firstVerse.chapter}:${firstVerse.verse}`;

    // Update Facebook share button
    const facebookButton = document.getElementById('facebook-share');
    const shareText = `${firstVerse.text} - ${firstVerse.book_name} ${firstVerse.chapter}:${firstVerse.verse}`;
    const shareUrl = encodeURIComponent(window.location.href);

    facebookButton.onclick = () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodeURIComponent(shareText)}`);
    };

    shareButtons.style.display = 'flex';
    copyButtons.style.display = 'flex';
    saveButtons.style.display = 'flex'; // Show the save button
  } else {
    verseText.textContent = 'Failed to fetch verse. Please try again.';
    verseReference.textContent = '';
    shareButtons.style.display = 'none';
    copyButtons.style.display = 'none';
    saveButtons.style.display = 'none';
  }

  loading.style.display = 'none';
  verseText.style.display = 'block';
  verseReference.style.display = 'block';
}

// Display favorites on page load
displayFavorites();

