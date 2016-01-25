app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser();
            }
        },
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function ($scope, user) {
    $scope.user = user;

})
