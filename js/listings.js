// Handle listings page functionality

const listingsList = document.getElementById('listingsList');
const categorySelect = document.getElementById('categorySelect');
const categoryTitle = document.getElementById('categoryTitle');
const noListingsContainer = document.getElementById('noListingsContainer');
const loadingContainer = document.getElementById('loadingContainer');
const errorContainer = document.getElementById('errorContainer');

// Get category from URL parameter
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category') || '';
}

// Format listing item HTML
function createListingElement(listing) {
  const li = document.createElement('li');
  li.className = listing.image_url ? 'listing-item has-image' : 'listing-item';
  
  let imageHTML = '';
  if (listing.image_url) {
    imageHTML = `<div class="listing-image"><img src="${listing.image_url}" alt="${listing.title}"></div>`;
  }

  const priceBadge = listing.price !== null ? `<span class="listing-price">${formatPrice(listing.price)}</span>` : '';
  const paidBadge = listing.is_paid ? '<span class="badge paid">PAID LISTING</span>' : '';

  const listingHTML = `
    ${imageHTML}
    <div class="listing-content">
      <a href="detail.html?id=${listing.id}" class="listing-title">${listing.title}</a>
      <div class="listing-meta">
        ${priceBadge}
        <span>${formatDate(listing.created_at)}</span>
      </div>
      <div class="listing-description">${listing.description}</div>
      <div class="listing-footer">
        <span class="listing-category">${listing.category}</span>
        ${paidBadge}
      </div>
    </div>
  `;
  
  li.innerHTML = listingHTML;
  li.addEventListener('click', (e) => {
    if (e.target.className !== 'listing-title') {
      window.location.href = `detail.html?id=${listing.id}`;
    }
  });
  
  return li;
}

// Render listings
function renderListings(listings) {
  listingsList.innerHTML = '';
  
  if (listings.length === 0) {
    noListingsContainer.style.display = 'block';
    return;
  }

  noListingsContainer.style.display = 'none';
  listings.forEach(listing => {
    listingsList.appendChild(createListingElement(listing));
  });
}

// Load listings
async function loadListings(category = '') {
  try {
    loadingContainer.style.display = 'block';
    errorContainer.innerHTML = '';
    
    const listings = await fetchListings(category || null);
    loadingContainer.style.display = 'none';
    renderListings(listings);
  } catch (error) {
    loadingContainer.style.display = 'none';
    errorContainer.innerHTML = `<div class="error">Error loading listings: ${error.message}</div>`;
  }
}

// Update category title
function updateCategoryTitle(category) {
  if (!category) {
    categoryTitle.textContent = 'All Listings';
  } else {
    categoryTitle.textContent = `${category} Listings`;
  }
}

// Initialize page
function init() {
  const category = getCategoryFromURL();
  
  if (category) {
    categorySelect.value = category;
    updateCategoryTitle(category);
  }
  
  loadListings(category);
}

// Event listener for category filter changes
categorySelect.addEventListener('change', (e) => {
  const category = e.target.value;
  updateCategoryTitle(category);
  loadListings(category);
});

// Initialize when page loads
init();
