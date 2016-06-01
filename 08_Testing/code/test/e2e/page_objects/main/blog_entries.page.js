var _Navbar = new (require('../_navbar.page.js'))();
var _ListEntry = require('./_list_entry.page.js');

var MainPage = function() {}
MainPage.prototype = Object.create({}, {
    // Navbar partial
    navbar: {
        get: function() {
            return _Navbar;
        }
    },
    
    // List of blog entries
    blogEntries: {
        get: function() {
            // return element.all(by.repeater('blogEntry in blogEntries')).map(function(value) {
            //     return new _ListEntry(value);
            // });
            
            return element.all(by.repeater('blogEntry in blogEntries'));
        }
    },
    
    // A single entry selected by title
    entryByTitle: {
        value: function(title) {
            return new _ListEntry(element(by.xpath('//li/div[text()="' + title + '"]/..')));
        }
    },
    
    // Title on the entry form
    entryTitle: {
        get: function() {
            return element(by.model('blogEntry.title'));
        },
        set: function(value) {
            return this.entryTitle.clear().sendKeys(value);
        }
    },
    
    // Entry field for the blog entry form
    entryText: {
        get: function() {
            return element(by.model('blogEntry.entry'));
        },
        set: function(value) {
            return this.entryText.clear().sendKeys(value);
        }
    },
    
    // The entry form submit button
    btnSubmitEntry: {
        get: function() {
            return element(by.name('btnSubmitEntry'));
        }
    }
});

module.exports = MainPage;