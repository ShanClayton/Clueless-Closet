const app = angular.module('ClosetApp', []);

app.controller('MyController', ['$http', function($http){

  this.includePath = 'partials/nav.html';

  this.changeInclude = (path) => {
    this.includePath = 'partials/'+ path +'.html';
    console.log(this.changeInclude);
  };

    const controller = this;

    this.newOutfit = function(){
      $http({
        method: 'POST',
        url: '/outfits/new',
        data: {
          image: this.image
        }
      }).then(function(response){
        this.image = null;
        controller.getOutfit()
      }, function(){
        console.log('error');
      })
    }

    this.getOutfit = function(){
      $http({
        method: 'GET',
        url: '/outfits'
      }).then(function(response){
        controller.outfits = response.data
      }, function(){
        console.log('error');
      })
    }

    this.deleteOutfit = function(outfit){
        $http({
          method: 'DELETE',
          url: '/outfits/' + outfit._id
        }).then(function(response){
          controller.getOutfit();
        }, function() {
          console.log('error');
        })
        }

    this.editOutfit = function(outfit){
      $http({
        method: 'PUT',
        url: '/outfits/' + outfit._id,
        data: {
          image: this.editedImage
        }
      }).then(function(response){
        this.editedimage = null;
        controller.getoutfit();
        console.log(response)
      },function(){
        console.log('error');
      })
    }

    this.getOutfit();

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
      controller.loggedInUser = response.data.username;
      this.changeInclude("create");
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
    })
  }

this.openModal = function(){
  //if login button is clicked
  
  //show modal \\ open modal function

}

}])
