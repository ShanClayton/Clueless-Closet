const app = angular.module('ClosetApp', []);

app.controller('MyController', ['$http', function($http){
  // this.category = null;
  // this.type = null;
  // this.image = null;
  // this.season = null;
  // this.occasion = null;

  this.includePath = 'partials/main.html';
  this.navPath = 'partials/nav.html'

  this.changeInclude = (path) => {
    this.includePath = 'partials/'+ path +'.html';
    console.log(this.changeInclude);
  };

  this.changeNavPath = (path) => {
    this.navPath = 'partials/'+ path
+ '.html';
console.log(this.changeNavPath);
};

    const controller = this;

    this.newOutfit = function($event){
      console.log(this.category);
      $event.preventDefault()
      $http({
        method: 'POST',
        url: '/outfits/new',
        data: {
          category: this.category,
          type: this.type,
          image: this.image,
          season: this.season,
          occasion: this.occasion
        }
      }).then(function(response){
        controller.getOutfit()
        controller.changeInclude('show')
        controller.category = null;
        controller.type = null;
        controller.image = null;
        controller.season = null;
        controller.occasion = null;
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
      console.log("h");
      $http({
        method: 'PUT',
        url: '/outfits/' + outfit._id,
        data: {
          category: this.editedCategory,
          type: this.editedType,
          image: this.image,
          season: this.editedSeason,
          occasion: this.editedOccasion

          // tag: this.editedtag
        }
      }).then(function(response){
        controller.editedCategory = null;
        controller.editedType = null;
        controller.image = null;
        controller.editedSeason = null;
        controller.editedOccasion = null;
          // this.editOutfit.image = null;
        controller.getOutfit();
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
        controller.changeInclude('login')
        controller.username =null,
        controller.password = null
    }, function(){
        console.log('error');
    });
}

this.logIn = function(){
  console.log("hey");
    $http({
        method:'POST',
        url: '/sessions',
        data: {
            username: this.username,
            password: this.password
        }
    }).then(function(response){
      controller.loggedInUser = response.data.username;
      controller.changeInclude("create")
      controller.changeNavPath('logout-nav')
        console.log(response);
        controller.username = null,
        controller.password = null
    }, function(){
        console.log('error');
    });
}

this.logOut = function(){
  $http({
    method: "DELETE",
    url: "/sessions"
  }).then(
    function(response){
      controller.changeInclude('main')
      controller.changeNavPath('nav')
    },
    function(error){
      console.log(error);
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

this.showModal = true;

this.displayHide = () => {
  this.showModal = !this.showModal;
}

this.test = () => {
  console.log('running');
  console.log(this.indexOfEditFormToShow); //0
  this.indexOfEditFormToShow;
  console.log(this.indexOfEditFormToShow); //undefined
}

// NOTES FOR SHOW PAGE SCROLLING DROPDOWN
  // var app = angular.module("demo", []);
    //
    // app.controller("dropdownDemo", function($scope) {
    //   $scope.colours = [
    //     { name: "Red", hex: "#F21B1B" },
    //     { name: "Blue", hex: "#1B66F2" },
    //     { name: "Green", hex: "#07BA16" }
    //   ];
    //   $scope.colour = "";
    // });
    //
    // app.run(function($rootScope) {
    //   angular.element(document).on("click", function(e) {
    //     $rootScope.$broadcast("documentClicked", angular.element(e.target));
    //   });
    // });
    //
    // app.directive("dropdown", function($rootScope) {
    //   return {
    //     restrict: "E",
    //     templateUrl: "templates/dropdown.html",
    //   scope: {
    //     placeholder: "@",
    //     list: "=",
    //     selected: "=",
    //     property: "@"
    //   },
    //   link: function(scope) {
    //     scope.listVisible = false;
    //     scope.isPlaceholder = true;
    //     scope.select = function(item) {
    //       scope.isPlaceholder = false;
    //       scope.selected = item; };
    //       scope.isSelected = function(item) {
    //         return item[scope.property] === scope.selected[scope.property]; };
    //         scope.show = function() {
    //           scope.listVisible = true;
    //         };
    //           $rootScope.$on("documentClicked", function(inner, target) {
    //              console.log($(target[0]).is(".dropdown-display.clicked") || $(target[0]).parents(".dropdown-display.clicked").length > 0);
    //              if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
    //              scope.$apply(function() {
    //                scope.listVisible = false;
    //              });
    //           });
    //           scope.$watch("selected", function(value) {
    //             scope.isPlaceholder = scope.selected[scope.property] === undefined; scope.display = scope.selected[scope.property];
    //           });
    //         }
    //       }
    //     });
}])
