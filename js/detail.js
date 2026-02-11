// Handle listing detail page functionality

const errorContainer = document.getElementById('errorContainer');
const loadingContainer = document.getElementById('loadingContainer');
const detailContent = document.getElementById('detailContent');
const notFoundContainer = document.getElementById('notFoundContainer');

// Get listing ID from URL
function getListingIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Go back to listings or previous page
function goBack() {
  // Try to go back, fallback to listings page
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'listings.html';
  }
}

// Render listing details
function renderListing(listing) {
  // Set title and price
  document.getElementById('listingTitle').textContent = listing.title;
  
  if (listing.price !== null) {
    document.getElementById('listingPrice').textContent = formatPrice(listing.price);
    document.getElementById('detailPriceRow').style.display = 'flex';
    document.getElementById('detailPrice').textContent = formatPrice(listing.price);
  }

  // Set category and date
  document.getElementById('listingCategory').textContent = listing.category;
  document.getElementById('detailCategory').textContent = listing.category;
  
  const formattedDate = formatDate(listing.created_at);
  document.getElementById('listingDate').textContent = `Posted: ${formattedDate}`;
  document.getElementById('detailDate').textContent = formattedDate;

  // Set description
  document.getElementById('listingDescription').textContent = listing.description;

  // Set image
  if (listing.image_url) {
    document.getElementById('listingImage').innerHTML = `<img src="${listing.image_url}" alt="${listing.title}">`;
  } else {
    document.getElementById('listingImage').textContent = 'No image available';
  }

  // Set contact email
  const emailElement = document.getElementById('contactEmail');
  emailElement.textContent = listing.contact_email;
  emailElement.href = `mailto:${listing.contact_email}`;

  // Set paid badge
  if (listing.is_paid) {
    document.getElementById('listingPaidBadge').innerHTML = '<span class="badge paid">PAID LISTING</span>';
  }

  // Show content
  detailContent.style.display = 'block';
}

// Load listing details
async function loadListing(id) {
  try {
    loadingContainer.style.display = 'block';
    errorContainer.innerHTML = '';
    
    const listing = await fetchListingById(id);
    loadingContainer.style.display = 'none';
    renderListing(listing);
  } catch (error) {
    loadingContainer.style.display = 'none';
    
    if (error.message.includes('404') || error.message.includes('not found')) {
      notFoundContainer.style.display = 'block';
    } else {
      errorContainer.innerHTML = `<div class="error">Error loading listing: ${error.message}</div>`;
    }
  }
}

// Initialize page
function init() {
  const id = getListingIdFromURL();
  
  if (!id) {
    errorContainer.innerHTML = '<div class="error">No listing ID provided.</div>';
    return;
  }
  
  loadListing(id);
}

// Initialize when page loads
init();
