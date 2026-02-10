export class HomePage {
  constructor() {
    this.render();
  }

  render() {
    const app = document.getElementById('app');
    
    const html = `
      <div class="container">
        <header class="header">
          <h1>Classifieds Platform</h1>
          <p>Buy, sell, and find jobs in your community</p>
        </header>

        <div class="action-section">
          <button id="postBtn" class="btn btn-primary">Post a Listing</button>
        </div>

        <main class="categories-section">
          <h2>Browse by Category</h2>
          <div class="categories-grid">
            <div class="category-card" data-category="Jobs">
              <h3>📋 Jobs</h3>
              <p class="paid-badge">PAID LISTINGS</p>
              <p class="cost">$25 per listing</p>
            </div>
            <div class="category-card" data-category="Housing">
              <h3>🏠 Housing</h3>
              <p class="paid-badge">PAID LISTINGS</p>
              <p class="cost">$5 per listing</p>
            </div>
            <div class="category-card" data-category="For Sale">
              <h3>🛍️ For Sale</h3>
              <p class="free-badge">FREE LISTINGS</p>
            </div>
            <div class="category-card" data-category="Services">
              <h3>⚙️ Services</h3>
              <p class="free-badge">FREE LISTINGS</p>
            </div>
          </div>
        </main>
      </div>
    `;

    app.innerHTML = html;
    this.attachEventListeners();
  }

  attachEventListeners() {
    const postBtn = document.getElementById('postBtn');
    const categoryCards = document.querySelectorAll('.category-card');

    postBtn.addEventListener('click', () => {
      window.__router.go('/create');
    });

    categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const category = card.dataset.category;
        window.__router.go(`/category/${category}`);
      });
    });
  }
}
