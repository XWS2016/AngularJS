var _Navbar = function() {};
_Navbar.prototype = Object.create({}, {
    // Login button
    btnLogin: {
        get: function() {
            return element(by.css('#appNavbar [name=btnLogin]'));
        }
    },
    
    // Logout button
    btnLogout: {
        get: function() {
            return element(by.css('#appNavbar [name=btnLogout]'));
        }
    }
});

module.exports = _Navbar;