export class ListingDetailPage {
  constructor(id) {
    this.id = id;
    this.listing = null;
    this.loadListing();
    this.render();
  }

  loadListing() {
    const allListings = JSON.parse(localStorage.getItem('listings') || '[]');
    this.listing = allListings.find(listing => listing.id === this.id);
  }

  isPaidCategory() {
    return this.listing && ['Jobs', 'Housing'].includes(this.listing.category);
  }

  getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  }

  render() {
    const app = document.getElementById('app');

    if (!this.listing) {
      app.innerHTML = `
        <div class="container">
          <button id="backBtn" class="btn btn-secondary">← Back</button>
          <div class="error-message">Listing not found.</div>
        </div>
      `;
      document.getElementById('backBtn').addEventListener('click', () => {
        window.__router.go('/');
      });
      return;
    }

    const categoryEmoji = {
      'Jobs': '📋',
      'Housing': '🏠',
      'For Sale': '🛍️',
      'Services': '⚙️',
    };

    const html = `
      <div class="container">
        <button id="backBtn" class="btn btn-secondary">← Back to ${this.listing.category}</button>
        
        <div class="listing-detail">
          <div class="detail-header">
            <h1>${this.listing.title}</h1>
            ${this.isPaidCategory() ? '<span class="badge badge-paid">PAID LISTING</span>' : ''}
          </div>

          ${this.listing.image_url ? `
            <div class="detail-image">
              <img src="${this.listing.image_url}" alt="${this.listing.title}">
            </div>
          ` : ''}

          <div class="detail-content">
            <div class="detail-info">
              <p><strong>Category:</strong> ${categoryEmoji[this.listing.category]} ${this.listing.category}</p>
              <p><strong>Posted:</strong> ${this.getTimeAgo(this.listing.created_at)}</p>
              ${this.listing.price ? `<p class="detail-price"><strong>Price:</strong> $${this.listing.price}</p>` : ''}
            </div>

            <div class="detail-description">
              <h2>Description</h2>
              <p>${this.listing.description}</p>
            </div>

            <div class="detail-contact">
              <h2>Contact Information</h2>
              <p><strong>Email:</strong> <a href="mailto:${this.listing.contact_email}">${this.listing.contact_email}</a></p>
            </div>
          </div>
        </div>
      </div>
    `;

    app.innerHTML = html;
    this.attachEventListeners();
  }

  attachEventListeners() {
    const backBtn = document.getElementById('backBtn');
    backBtn.addEventListener('click', () => {
      window.__router.go(`/category/${this.listing.category}`);
    });
  }
}
