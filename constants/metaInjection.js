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

  window.onscroll = function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    window.ReactNativeWebView.postMessage(JSON.stringify({ scrollTop }));
  };

  true;
`;

export default injectedJS;
