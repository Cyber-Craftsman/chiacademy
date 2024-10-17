const API_URL = 'https://rickandmortyapi.com/api/character'; // Base URL for fetching Rick & Morty characters
let currentPage = 1; // Variable to keep track of the current page number
let loading = false; // Flag to prevent multiple requests at the same time

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Get references to key elements in the DOM
  const characterList = document.getElementById('character-list'); // List to display character cards
  const modal = document.getElementById('modal'); // Modal element for displaying character details
  const modalContent = document.getElementById('modal-character-info'); // Container for character details in the modal
  const closeBtn = document.querySelector('.close'); // Button to close the modal
  const loadingText = document.getElementById('loading'); // Element to show loading status

  // Load the initial set of characters when the page is loaded
  fetchCharacters(currentPage);

  // Infinite scroll: Load more characters when the user scrolls to the bottom of the page
  window.addEventListener('scroll', () => {
    // Check if the user has scrolled to the bottom and no request is currently loading
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading) {
      currentPage++; // Increment to the next page
      fetchCharacters(currentPage); // Fetch the next set of characters
    }
  });

  // Event delegation for character card clicks to open a modal
  characterList.addEventListener('click', (event) => {
    const card = event.target.closest('.character-card'); // Check if the click happened on a character card
    if (!card) return; // If no card was clicked, exit

    const characterId = card.dataset.id; // Get the character ID from the clicked card
    openModal(characterId); // Open the modal with the character's details
  });

  // Close the modal when the close button is clicked
  closeBtn.addEventListener('click', closeModal);

  // Close the modal when the user clicks outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal(); // Close modal if the user clicks outside
    }
  });

  // Fetch characters from the API based on the current page
  async function fetchCharacters(page) {
    loading = true; // Set loading to true to prevent further requests
    loadingText.style.display = 'block'; // Show the loading text

    try {
      // Make a request to fetch characters from the API
      const response = await fetch(`${API_URL}?page=${page}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
      }
      const data = await response.json(); // Parse the JSON response

      // Create and append character cards for each character
      data.results.forEach((character) => {
        const card = document.createElement('div'); // Create a new card element
        card.classList.add('character-card'); // Add class to the card
        card.dataset.id = character.id; // Store the character's ID in the dataset
        card.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <div class="character-info">
                    <h3>${character.name}</h3>
                </div>
            `;
        characterList.appendChild(card); // Append the card to the character list
      });
      // Check if there are more pages to load
      loading = !data.info.next; // Set loading to true if no more pages, false otherwise
    } catch (error) {
      console.error('Error fetching characters:', error); // Log the error
      alert('Failed to load characters. Please try again later.'); // Inform the user
    } finally {
      loadingText.style.display = 'none'; // Hide the loading text
    }
  }

  // Fetch character details by ID and display them in the modal
  async function openModal(characterId) {
    try {
      // Make a request to fetch character details by ID
      const response = await fetch(`${API_URL}/${characterId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
      }
      const character = await response.json(); // Parse the JSON response

      // Update the modal content with the character's details
      modalContent.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Gender: ${character.gender}</p>
            <p>Origin: ${character.origin.name}</p>
        `;
      modal.style.display = 'block'; // Show the modal
    } catch (error) {
      console.error('Error fetching character details:', error); // Log the error
      alert('Failed to load character details. Please try again later.'); // Inform the user
    }
  }

  // Close the modal and clear its content
  function closeModal() {
    modal.style.display = 'none'; // Hide the modal
    modalContent.innerHTML = ''; // Clear the modal content
  }
});
