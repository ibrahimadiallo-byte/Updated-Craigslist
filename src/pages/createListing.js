import { listingsAPI } from '../js/api';

export class CreateListingPage {
  constructor() {
    this.isPaid = false;
    this.selectedCategory = '';
    this.listingCosts = {
      'Jobs': 25,
      'Housing': 5,
      'For Sale': 0,
      'Services': 0,
    };
    this.render();
  }

  render() {
    const app = document.getElementById('app');

    const html = `
      <div class="container">
        <button id="backBtn" class="btn btn-secondary">← Back to Home</button>
        
        <div class="form-container">
          <h1>Post a Listing</h1>
          
          <form id="listingForm" class="listing-form">
            <div class="form-group">
              <label for="title">Title *</label>
              <input type="text" id="title" name="title" required placeholder="Enter listing title">
            </div>

            <div class="form-group">
              <label for="description">Description *</label>
              <textarea id="description" name="description" required placeholder="Enter detailed description" rows="5"></textarea>
            </div>

            <div class="form-group">
              <label for="category">Category *</label>
              <select id="category" name="category" required>
                <option value="">-- Select Category --</option>
                <option value="Jobs">Jobs</option>
                <option value="Housing">Housing</option>
                <option value="For Sale">For Sale</option>
                <option value="Services">Services</option>
              </select>
            </div>

            <div class="form-group">
              <label for="price">Price (Optional)</label>
              <input type="number" id="price" name="price" placeholder="Enter price (if applicable)" step="0.01">
            </div>

            <div class="form-group">
              <label for="contact">Contact Email *</label>
              <input type="email" id="contact" name="contact" required placeholder="your@email.com">
            </div>

            <div class="form-group">
              <label for="image">Upload Image (Optional)</label>
              <input type="file" id="image" name="image" accept="image/*">
            </div>

            <div id="paymentSection" class="payment-section" style="display: none;">
              <div class="payment-alert">
                <p id="paymentMessage"></p>
              </div>
              <div class="form-group checkbox">
                <input type="checkbox" id="agreePayment" name="agreePayment">
                <label for="agreePayment" id="agreeLabel"></label>
              </div>
            </div>

            <button type="submit" id="submitBtn" class="btn btn-primary btn-large">Post Listing</button>
          </form>
        </div>
      </div>
    `;

    app.innerHTML = html;
    this.attachEventListeners();
  }

  attachEventListeners() {
    const backBtn = document.getElementById('backBtn');
    const form = document.getElementById('listingForm');
    const categorySelect = document.getElementById('category');
    const paymentSection = document.getElementById('paymentSection');
    const paymentMessage = document.getElementById('paymentMessage');
    const agreeLabel = document.getElementById('agreeLabel');
    const submitBtn = document.getElementById('submitBtn');

    backBtn.addEventListener('click', () => {
      window.__router.go('/');
    });

    categorySelect.addEventListener('change', (e) => {
      this.selectedCategory = e.target.value;
      const cost = this.listingCosts[this.selectedCategory] || 0;
      this.isPaid = cost > 0;

      if (this.isPaid) {
        paymentMessage.textContent = `⚠️ ${this.selectedCategory} listings cost $${cost}`;
        agreeLabel.textContent = `I agree to pay $${cost} for this ${this.selectedCategory} listing`;
        paymentSection.style.display = 'block';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Post Listing (Check agreement)';
      } else {
        paymentSection.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Post Listing';
      }
    });

    const agreePayment = document.getElementById('agreePayment');
    if (agreePayment) {
      agreePayment.addEventListener('change', (e) => {
        submitBtn.disabled = !e.target.checked;
        submitBtn.textContent = e.target.checked ? 'Post Listing' : 'Post Listing (Check agreement)';
      });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleSubmit();
    });
  }

  async handleSubmit() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value || null;
    const contact = document.getElementById('contact').value;
    const imageInput = document.getElementById('image');
    const isPaid = this.isPaid;

    const listingData = {
      title,
      description,
      category,
      price: price ? parseFloat(price) : null,
      contact_email: contact,
      is_paid: isPaid,
      created_at: new Date().toISOString(),
      image_url: null,
    };

    try {
      // For now, use mock API - will integrate with backend
      const response = await this.mockCreateListing(listingData);
      
      // Save to local storage for demo
      let listings = JSON.parse(localStorage.getItem('listings') || '[]');
      const newListing = { id: Date.now().toString(), ...listingData };
      listings.push(newListing);
      localStorage.setItem('listings', JSON.stringify(listings));

      // Show confirmation
      alert(`✅ Your ${isPaid ? 'paid ' : ''}listing has been posted!\n\nCategory: ${category}\n${isPaid ? `Payment: $${this.listingCosts[category]} (simulated)` : ''}`);
      
      // Redirect to listing detail
      window.__router.go(`/listing/${newListing.id}`);
    } catch (error) {
      alert('Error posting listing. Please try again.');
      console.error('Error:', error);
    }
  }

  mockCreateListing(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: Date.now() });
      }, 500);
    });
  }
}
