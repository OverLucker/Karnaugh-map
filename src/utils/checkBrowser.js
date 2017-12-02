import settings from 'config/settings';

(function checkBrowser() {
  const BAD_BROWSER_URL = settings.badBrowserUrl;
  const userAgent = (navigator && navigator.userAgent || '').toLowerCase();
  const BROWSERS = [
    {
      id: 'ie',
      minVersion: 10,
      versionRegexp: /(?:msie |trident.+?; rv:)(\d+)/,
    }, {
      id: 'opera',
      minVersion: 15,
      versionRegexp: /(?:^opera.+?version|opr)\/(\d+)/,
    }, {
      id: 'firefox',
      minVersion: 29,
      versionRegexp: /(?:firefox|fxios)\/(\d+)/,
    }, {
      id: 'safari',
      minVersion: 8,
      versionRegexp: /version\/(\d+).+?safari/,
    },
  ];
  function getBrowserVersion(regExp) {
    const match = userAgent.match(regExp);
    return Boolean(match) && parseInt(match[1]);
  }
  function checkBrowserSupport() {
    for (let i = 0; i < BROWSERS.length; i++) {
      const browser = BROWSERS[i];
      const version = getBrowserVersion(browser.versionRegexp);
      if (version && version < browser.minVersion) {
        return false;
      }
    }
    return true;
  }
  function redirectToBadBrowserPage() {
    if (window.top && window.top.location.href){
      window.top.location.href = BAD_BROWSER_URL;
    }else{
      location.href = BAD_BROWSER_URL;
    }
  }
  const isBrowserSupported = checkBrowserSupport();
  if (!isBrowserSupported) {
    redirectToBadBrowserPage();
  }
}());
