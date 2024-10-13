const apiUrl = 'https://rickandmortyapi.com/api/character';
let currentPage = 1;

const charactersContainer = document.getElementById('characters');
const loadingMessage = document.getElementById('loading');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const currentPageSpan = document.getElementById('currentPage');

// Function to fetch and display characters
function fetchCharacters(page) {
  loadingMessage.style.display = 'block';
  charactersContainer.innerHTML = '';

  fetch(`${apiUrl}?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      // Display the characters
      displayCharacters(data.results);

      // Update pagination based on the API response
      updatePagination(data.info);

      loadingMessage.style.display = 'none';
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Function to display characters in the container
function displayCharacters(characters) {
  characters.forEach((character) => {
    const charDiv = document.createElement('div');
    charDiv.classList.add('character');
    charDiv.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <p>${character.name}</p>
            <p>${character.status}</p>
        `;
    charactersContainer.appendChild(charDiv);
  });
}

// Function to update pagination buttons and state
function updatePagination(info) {
  currentPageSpan.textContent = currentPage;

  prevButton.disabled = !info.prev;
  nextButton.disabled = !info.next;
}

// Event handler for the "Next" button
nextButton.addEventListener('click', () => {
  currentPage++;
  fetchCharacters(currentPage);
});

// Event handler for the "Prev" button
prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
  }
});

// Fetch and display the first page on page load
fetchCharacters(currentPage);
