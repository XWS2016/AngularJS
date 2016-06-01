var LoginPage = new (require('../page_objects/login/login.page.js'))();
var BlogEntriesPage = new (require('../page_objects/main/blog_entries.page.js'))();

describe('Blog Entries:', function() {
    describe('without authorization', function() {
        it('should have no blog entries present.', function() {
            browser.get('/blog/index.html#/main');
            BlogEntriesPage.blogEntries.count().should.eventually.be.equal(0);
        });
        
        it('should not have the Blog form present.', function() {
            BlogEntriesPage.entryTitle.isPresent().should.eventually.not.be.ok;
            BlogEntriesPage.entryText.isPresent().should.eventually.not.be.ok;
            BlogEntriesPage.btnSubmitEntry.isPresent().should.eventually.not.be.ok;
        });
    });
    
    describe('with authorization', function() {
        before(function() {
            BlogEntriesPage.navbar.btnLogin.click();
            LoginPage.login('mitar', 'miric');
        });
        
        it('should have no blog entries present.', function() {
            BlogEntriesPage.blogEntries.count().should.eventually.be.equal(0);
        });
        
        it('should have the Blog form present', function() {
            BlogEntriesPage.entryTitle.isPresent().should.eventually.be.ok;
            BlogEntriesPage.entryText.isPresent().should.eventually.be.ok;
            BlogEntriesPage.btnSubmitEntry.isPresent().should.eventually.be.ok;
        });
        
        it('should be able to create a new Blog Entry.', function() {
            BlogEntriesPage.entryTitle = 'Blog 1';
            BlogEntriesPage.entryText = 'Lorem ipsum.';
            BlogEntriesPage.btnSubmitEntry.click();
            BlogEntriesPage.blogEntries.count().should.eventually.be.equal(1);
        });
        
        it('should correctly display created blog entries.', function() {
            var entry = BlogEntriesPage.entryByTitle('Blog 1');
            entry.title.should.eventually.be.equal('Blog 1');
            entry.entry.should.eventually.be.equal('Lorem ipsum.');
            entry.btnDetails.isDisplayed().should.eventually.be.ok;
        });
    });
});