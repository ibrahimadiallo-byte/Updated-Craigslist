export class CategoryPage {
  constructor(category) {
    this.category = category;
    this.listings = [];
    this.loadListings();
    this.render();
  }

  loadListings() {
    const allListings = JSON.parse(localStorage.getItem('listings') || '[]');
    this.listings = allListings.filter(listing => listing.category === this.category);
    // Sort by newest first
    this.listings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  isPaidCategory() {
    return ['Jobs', 'Housing'].includes(this.category);
  }

  getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  }

  render() {
    const app = document.getElementById('app');
    const categoryEmoji = {
      'Jobs': '📋',
      'Housing': '🏠',
      'For Sale': '🛍️',
      'Services': '⚙️',
    };

    let listingsHTML = '';
    if (this.listings.length === 0) {
      listingsHTML = '<div class="no-listings"><p>No listings in this category yet.</p></div>';
    } else {
      listingsHTML = this.listings.map(listing => `
        <div class="listing-card" data-id="${listing.id}">
          <div class="listing-header">
            <h3>${listing.title}</h3>
            ${this.isPaidCategory() ? '<span class="badge badge-paid">PAID LISTING</span>' : ''}
          </div>
          ${listing.price ? `<p class="listing-price">$${listing.price}</p>` : ''}
          <p class="listing-description">${listing.description.substring(0, 150)}...</p>
          <p class="listing-date">Posted: ${this.getTimeAgo(listing.created_at)}</p>
        </div>
      `).join('');
    }

    const html = `
      <div class="container">
        <button id="backBtn" class="btn btn-secondary">← Back to Categories</button>
        
        <div class="category-header">
          <h1>${categoryEmoji[this.category]} ${this.category}</h1>
          <p class="category-info">${this.listings.length} listing${this.listings.length !== 1 ? 's' : ''} found</p>
        </div>

        <div class="listings-container">
          ${listingsHTML}
        </div>
      </div>
    `;

    app.innerHTML = html;
    this.attachEventListeners();
  }

  attachEventListeners() {
    const backBtn = document.getElementById('backBtn');
    const listingCards = document.querySelectorAll('.listing-card');

    backBtn.addEventListener('click', () => {
      window.__router.go('/');
    });

    listingCards.forEach(card => {
      card.addEventListener('click', () => {
        const listingId = card.dataset.id;
        window.__router.go(`/listing/${listingId}`);
      });
    });
  }
}
