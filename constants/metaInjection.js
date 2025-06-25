const injectedJS = `
  (function() {
    try {
      let color = '';

      // 1. Try meta tag
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta && meta.content) {
        color = meta.content;
      }

      // 2. Try CSS variable
      if (!color || !color.trim()) {
        color = getComputedStyle(document.documentElement)
                  .getPropertyValue('--accent-color');
      }

      // 3. Try body background color
      if (!color || !color.trim()) {
        color = getComputedStyle(document.body).backgroundColor;
      }

      // 4. Fallback default
      if (!color || !color.trim()) {
        color = '#3498db';
      }

      window.ReactNativeWebView.postMessage(color.trim());
    } catch (e) {
      window.ReactNativeWebView.postMessage('#3498db');
    }
  })();

  const style = document.createElement('style');
  style.innerHTML = 'html { padding-bottom: 42px !important; }';
  document.head.appendChild(style);
  true;
`;

export default injectedJS;
