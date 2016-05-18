(function () {
    angular
        .module('authentication',['ngStorage', 'ui.router', 'angular-jwt'])
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage, $log, $state, jwtHelper) {
        var service = {};

        service.login = login;
        service.logout = logout;
        service.getCurrentUser = getCurrentUser;

        return service;

        function login(username, password, callback) {
            $http.post('/api/users/authenticate', { name: username, password: password })
                .success(function (response) {
                    // ukoliko postoji token, prijava je uspecna
                    if (response.token) {
                        // korisnicko ime, token i rola (ako postoji) cuvaju se u lokalnom skladištu
                        var currentUser = { username: username, token: response.token }
                        var tokenPayload = jwtHelper.decodeToken(response.token);
                        if(tokenPayload.role){
                            currentUser.role = tokenPayload.role;
                        }
                        $localStorage.currentUser = currentUser;
                        // jwt token dodajemo u to auth header za sve $http zahteve
                        $http.defaults.headers.common.Authorization = response.token;
                        // callback za uspesan login
                        callback(true);
                        $state.go('main');
                    } else {
                        // callback za neuspesan login
                        callback(false);
                    }
                });
        }

        function logout() {
            // uklonimo korisnika iz lokalnog skladišta
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            $state.go('login');
        }

        function getCurrentUser() {
            return $localStorage.currentUser;
        }
    }
})();