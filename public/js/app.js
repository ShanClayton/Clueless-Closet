const app = angular.module('ClosetApp', []);

app.controller('MyController', ['$http', function($http){


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
  this.indexOfEditFormToShow = undefined;
  console.log(this.indexOfEditFormToShow); //undefined
}
 this.showEditForm = (index) => {
   this.indexOfEditFormToShow =index
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

LIkes and diskikes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const confession = Schema({
category:{
  type:String,
  required: true
},
confession:{
  type: String,
  required: true
},
likes:{
  type:Number,
  default: 0
},
dislikes:{
  type: Number,
  default: 0
}
});

const Confession = mongoose.model('Confession', confession);

module.exports = Confession;


<div class="container">
  <div class="confess-box" ng-repeat="confession in ctrl.confessions">
    <div ng-class="confession.category" class="confess-category card-header">
      {{confession.category}}
    </div>
    <div>
      <p>{{confession.confession}}</p>
      <span class="lnr lnr-pencil" ng-click="ctrl.changeInclude('edit'); ctrl.testConfession(confession)"></span>
      <span class="lnr lnr-cross" ng-click="ctrl.deleteConfession(confession)"></span>
      <span class="lnr lnr-thumbs-up" ng-click="ctrl.increaseLikes(confession)">{{confession.likes}}</span>
      <span class="lnr lnr-thumbs-down" ng-click="ctrl.decreaseLikes(confession)">{{confession.dislikes}}</span>
  </div>
</div>


const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function($http){

  this.includePath = 'partials/home.html';
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
    const confession = null;



this.showModal = true;

this.displayHide = () => {
  this.showModal = !this.showModal;
}

this.confess= function(){
    $http({
      method: 'POST',
      url: '/confessions',
      data: {
        category: this.category,
        confession: this.confession
      }
    }).then(response=>{
      controller.getConfession();
      controller.changeInclude('home')
      controller.category = null;
      controller.confession = null;
    }, function(error){
        console.log(error);
      });
  };

this.getConfession = function(){
  $http({
      method: 'GET',
      url: '/confessions',
    }).then(response=>{
      controller.confessions = response.data
      console.log(response.data);
    }, function(error){
        console.log(error);
      });
}

this.deleteConfession = function(confession){
  $http({
    method: 'DELETE',
    url: '/confessions/' + confession._id
  }).then(response=>{
    controller.getConfession();
  }, function() {
          console.log('error');
        });
};

this.editConfession = function(){
  $http({
    method: 'PUT',
    url: '/confessions/' + this.confession._id,
    data: {
      category: this.editedCategory,
      confession: this.editedConfession
    }
  }).then(function(response){
    controller.editedCategory = null;
    controller.editedConfession = null;
    controller.getConfession();
    console.log(response);
  },function(){
        console.log('error');
      });
};

  this.increaseLikes = function(confession){
    confession.likes += 1
    $http({
      method: 'PUT',
      url: '/confessions/' + confession._id,
      data: {likes: confession.likes}
    }).then(function(response){
    }, function(error){
        console.log(error);
      })
  }

  this.decreaseLikes = function(confession){
    confession.dislikes -= 1
    $http({
      method: 'PUT',
      url: '/confessions/' + confession._id,
      data: {dislikes: confession.dislikes}
    }).then(function(response){
    }, function(error){
        console.log(error);
      })
  }


this.showEditForm = (index) => {
   this.indexOfEditFormToShow =index
 }
 this.testConfession = function (confession){
   this.confession = confession
   console.log(confession);
 }


this.getConfession();
}]);
