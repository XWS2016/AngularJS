var LoginPage = function() {}
LoginPage.prototype = Object.create({}, {

    // Username field
    username: {
        get: function() {
            return element(by.model('user.name'));
        },
        set: function(value) {
            return this.username.clear().sendKeys(value);
        }
    },
    
    // Password field
    password: {
        get: function() {
            return element(by.model('user.password'));
        },
        set: function(value) {
            return this.password.clear().sendKeys(value);
        }
    },
    
    // Login button
    btnLogin: {
        get: function() {
            return element(by.name('btnLogin'));
        }
    },
    
    login: {
        value: function(username, password) {
            this.username = username;
            this.password = password;
            this.btnLogin.click();
        }
    }
});

module.exports = LoginPage;