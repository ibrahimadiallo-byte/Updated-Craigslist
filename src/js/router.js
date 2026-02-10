import { HomePage } from '../pages/home';
import { CreateListingPage } from '../pages/createListing';
import { CategoryPage } from '../pages/category';
import { ListingDetailPage } from '../pages/listingDetail';

export class Router {
  constructor() {
    this.currentPage = null;
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => this.navigate());
    this.navigate();
  }

  navigate(path = window.location.pathname) {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = '';

    if (path === '/' || path === '/index.html') {
      this.currentPage = new HomePage();
    } else if (path === '/create') {
      this.currentPage = new CreateListingPage();
    } else if (path.startsWith('/category/')) {
      const category = path.split('/')[2];
      this.currentPage = new CategoryPage(category);
    } else if (path.startsWith('/listing/')) {
      const id = path.split('/')[2];
      this.currentPage = new ListingDetailPage(id);
    } else {
      this.currentPage = new HomePage();
    }
  }

  go(path) {
    window.history.pushState({}, '', path);
    this.navigate(path);
  }
}
