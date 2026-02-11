// Handle post listing page functionality

const postForm = document.getElementById('postForm');
const categorySelect = document.getElementById('category');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const loadingIndicator = document.getElementById('loadingIndicator');
const pricingSelected = document.getElementById('pricingSelected');

// Update pricing display based on selected category
categorySelect.addEventListener('change', () => {
  const category = categorySelect.value;
  
  if (category === 'Jobs' || category === 'Housing') {
    pricingSelected.innerHTML = '💳 PAID LISTING - $45 will be charged';
    pricingSelected.style.background = '#ff9800';
    pricingSelected.style.color = '#000';
    pricingSelected.classList.add('active');
  } else if (category === 'For Sale' || category === 'Services') {
    pricingSelected.innerHTML = '✓ FREE LISTING';
    pricingSelected.style.background = '#4caf50';
    pricingSelected.style.color = '#fff';
    pricingSelected.classList.add('active');
  } else {
    pricingSelected.classList.remove('active');
  }
});

// Validate form
function validateForm() {
  const errors = {};
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const category = categorySelect.value;
  const contactEmail = document.getElementById('contactEmail').value.trim();
  const price = document.getElementById('price').value;
  const imageUrl = document.getElementById('imageUrl').value.trim();

  // Clear previous error displays
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
  
  if (!title) {
    errors.title = 'Title is required';
  }
  
  if (!description) {
    errors.description = 'Description is required';
  }
  
  if (!category) {
    errors.category = 'Please select a category';
  }
  
  if (!contactEmail) {
    errors.contactEmail = 'Contact email is required';
  } else if (!isValidEmail(contactEmail)) {
    errors.contactEmail = 'Please enter a valid email address';
  }
  
  if (price && isNaN(price)) {
    errors.price = 'Price must be a valid number';
  }

  // Display errors
  Object.keys(errors).forEach(field => {
    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
      errorElement.textContent = errors[field];
    }
  });

  return Object.keys(errors).length === 0;
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Handle form submission
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Clear messages
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';
  
  // Validate
  if (!validateForm()) {
    errorMessage.textContent = 'Please fix the errors above and try again.';
    errorMessage.style.display = 'block';
    return;
  }
  
  // Prepare listing data
  const listingData = {
    title: document.getElementById('title').value.trim(),
    description: document.getElementById('description').value.trim(),
    category: categorySelect.value,
    contact_email: document.getElementById('contactEmail').value.trim(),
    price: document.getElementById('price').value ? parseFloat(document.getElementById('price').value) : null,
    image_url: document.getElementById('imageUrl').value.trim() || null
  };
  
  // Submit
  try {
    loadingIndicator.style.display = 'inline';
    const createdListing = await createListing(listingData);
    
    loadingIndicator.style.display = 'none';
    successMessage.innerHTML = `
      <strong>Success!</strong> Your listing has been posted!<br>
      <a href="detail.html?id=${createdListing.id}">View your listing</a> or <a href="listings.html?category=${createdListing.category}">browse more listings</a>
    `;
    successMessage.style.display = 'block';
    
    // Reset form
    postForm.reset();
    categoryNote.textContent = '';
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
  } catch (error) {
    loadingIndicator.style.display = 'none';
    errorMessage.textContent = `Error posting listing: ${error.message}`;
    errorMessage.style.display = 'block';
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Handle reset
postForm.addEventListener('reset', () => {
  pricingSelected.classList.remove('active');
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
});
