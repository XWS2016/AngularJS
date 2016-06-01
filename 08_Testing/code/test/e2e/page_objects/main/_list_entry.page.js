var _ListEntry = function(listItem) {
    this.listItem = listItem;
}
_ListEntry.prototype = Object.create({}, {
    title: {
        get: function() {
            return this.listItem.element(by.xpath('.//div[1]')).getText();
        }    
    },
    
    entry: {
        get: function() {
            return this.listItem.element(by.xpath('.//div[2]')).getText();
        }
    },
    
    btnDetails: {
        get: function() {
            return this.listItem.element(by.xpath('.//div[3]/button')).getText();
        }
    }
});

module.exports = _ListEntry;