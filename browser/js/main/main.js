app.config(function ($stateProvider) {
    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'js/main/main.html',
        controller: 'MainCtrl',
        resolve: {
            loggedInUser: function (AuthService, socket) {
                return AuthService.getLoggedInUser()
                    .then(user => {
                        socket.logIn({ username: user.email, id: socket.id });
                        return user;
                    })
            }
        }
    });
})

app.controller('MainCtrl', function ($scope, $rootScope, socket, loggedInUser, peer) {
    $scope.user = loggedInUser;
    $scope.incomingInvitation = null;

    peer.creatPeer($scope.user);
    peer.getConnectPeers(peers => $scope.connectedPeers = peers);
    peer.listenForConnections();

    $scope.allUsers = {
        0: 'none yet'
    };

    socket.trackUsers(function (users) {
        $scope.allUsers = users;
        $scope.$digest();
    });

    socket.listenForInvites(function (invitation) {
        $scope.incomingInvitation = invitation;
        console.log(invitation);
        $scope.$digest();
    });
});
