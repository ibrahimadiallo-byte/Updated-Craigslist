// API utility functions for Craigslist clone

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Fetch all listings or filter by category
 * @param {string} category - Optional category to filter by
 * @returns {Promise<Array>} Array of listing objects
 */
async function fetchListings(category = null) {
  try {
    const url = category 
      ? `${API_BASE_URL}/listings?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/listings`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}

/**
 * Fetch a single listing by ID
 * @param {number} id - Listing ID
 * @returns {Promise<Object>} Listing object
 */
async function fetchListingById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching listing:', error);
    throw error;
  }
}

/**
 * Create a new listing
 * @param {Object} listingData - Listing object with title, description, category, contact_email, price (optional), image_url (optional)
 * @returns {Promise<Object>} Created listing object with ID and metadata
 */
async function createListing(listingData) {
  try {
    const response = await fetch(`${API_BASE_URL}/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(listingData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
}

/**
 * Format a date string to a readable format
 * @param {string} dateString - ISO 8601 date string
 * @returns {string} Formatted date (e.g., "Feb 10, 2026")
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Format price with currency
 * @param {number|null} price - Price value or null
 * @returns {string} Formatted price or empty string
 */
function formatPrice(price) {
  if (price === null || price === undefined) return '';
  return `$${price.toLocaleString()}`;
}
