function waitForUrl(url, timeout) {
    browser.wait(function() {
        return browser.getCurrentUrl().then(function(currentUrl) {
            return currentUrl === url;
        }, timeout || 3000);
    });
}

module.exports.waitForUrl = waitForUrl;