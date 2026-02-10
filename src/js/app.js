export const initializeApp = () => {
  // Create root app container if it doesn't exist
  if (!document.getElementById('app')) {
    const app = document.createElement('div');
    app.id = 'app';
    document.body.appendChild(app);
  }

  // Initialize local storage for listings if not present
  if (!localStorage.getItem('listings')) {
    localStorage.setItem('listings', JSON.stringify([]));
  }
};

export const getRouter = () => {
  // This will be injected by the Router class
  return window.__router;
};

export const setRouter = (router) => {
  window.__router = router;
};
