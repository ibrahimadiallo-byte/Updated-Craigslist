import '../styles/main.css';
import { Router } from './router';
import { initializeApp, setRouter } from './app';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  const router = new Router();
  setRouter(router);
});
