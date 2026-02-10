import '../styles/main.css';
import { Router } from './router';
import { initializeApp } from './app';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  new Router();
});
