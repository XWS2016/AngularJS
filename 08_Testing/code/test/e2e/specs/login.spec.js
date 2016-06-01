var LoginPage = new (require('../page_objects/login/login.page.js'))();
var BlogEntriesPage = new (require('../page_objects/main/blog_entries.page.js'))();

describe('Login:', function() {
    
    before(function() {
        browser.get('/blog/index.html#/login');
    });
    
    it('should have the correct url.', function() {
        browser.getCurrentUrl().should.eventually.be.equal('http://localhost:8080/blog/index.html#/login');
    });
    
    it('should have the expected elements on the page.', function() {
        LoginPage.username.isPresent().should.eventually.be.true;
        LoginPage.username.isDisplayed().should.eventually.be.true;
        
        LoginPage.password.isPresent().should.eventually.be.true;
        LoginPage.password.isDisplayed().should.eventually.be.true;
        
        LoginPage.btnLogin.isPresent().should.eventually.be.true;
        LoginPage.btnLogin.isDisplayed().should.eventually.be.true;
    });
    
    it('should not log in with wrong credentials.', function() {
        LoginPage.username = 'Mitar';
        LoginPage.password = 'Miric';
        LoginPage.btnLogin.click();
        browser.getCurrentUrl().should.eventually.be.equal('http://localhost:8080/blog/index.html#/login');
    });
    
    it('should log in with the correct credentials.', function() {
        LoginPage.username = 'mitar';
        LoginPage.password = 'miric';
        LoginPage.btnLogin.click();
        browser.getCurrentUrl().should.eventually.be.equal('http://localhost:8080/blog/index.html#/main');
    });
    
    after(function() {
        BlogEntriesPage.navbar.btnLogout.click();
    });
});