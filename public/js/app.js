const app = angular.module('ClosetApp', []);

app.controller('MyController', ['$http', function($http){
  // this.includePath = 'partials/nav.html';
  //
  // this.changePath = (path) => {
  //  this.includePath = 'partials/' + path + '.html';
}])

app.controller('AuthController', ['$http', function($http){
    this.foo = 'bar';

    this.createUser = function(){
    $http({
        method:'POST',
        url: '/users',
        data: {
            username: this.username,
            password: this.password
        }
    }).then(function(response){
        console.log(response);
    }, function(){
        console.log('error');
    });
}

this.logIn = function(){
    $http({
        method:'POST',
        url: '/sessions',
        data: {
            username: this.username,
            password: this.password
        }
    }).then(function(response){
        console.log(response);
    }, function(){
        console.log('error');
    });
}

this.goApp = function(){
    const controller = this; //add this
    $http({
        method:'GET',
        url: '/app'
    }).then(function(response){
        controller.loggedInUsername = response.data.username; //change this
    }, function(){
        console.log('error');
    });
}


}]);
