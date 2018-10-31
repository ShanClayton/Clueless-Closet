# Clueless_Closet

***Clueless_Closet*** is a group project created for the Web Development Remote Immersive at General Assembly ('WDIR').

Collaborators on this project:
- Shanaun Clayton
- Krystal Williams
- Stevie Burnette

# Clueless_Closet


## Project Concept

This app is a collaborative effort to offer users a fun and easily accessible way to style and edit outfits, based on the clothes currently in their closet or their desired styles. Our aim is to offer users a colorful and aesthetic interactive experience, which we achieved through images and icons set on a minimalistic background.

Once users sign up by creating an account with a username and password, they can then login and begin "creating a closet" by styling outfits. 

Upon login, users are directed to the "create" page where they have the opportunity to input information about their clothing item into various fields and upload an image.

Once users add a clothing item via the create form, they are taken to the "show" page where they can view their items individually and edit or delete them. 


## Getting Started

Clueless Closet is an app currently hosted via Heroku at https://cluelesscloset.heroku.app.
In order to access the app, simply visit the link above and click 'Sign Up' to create a username and password. No additional installations or programs are required to access this app.


## Technologies Implemented

This app was developed using the MEAN stack - Mongoose, Express, Angular, and Node.js.

Supporting technologies include [GitHub Pages](https://pages.github.com/), text editor [Atom](https://atom.io/), and project management tool [waffle.io](https://waffle.io/). 

All site images are included courtesy [Unsplash](https://unsplash.com/) and the icons were created using [Flaticon](https://www.flaticon.com/).

## Collaborator Contributions

### Shanaun Clayton
Front End:
* Image Selection
* Create Page Styling
* Font Selection

### Krystal Williams
Front End:
* Navigation Bar Styling
* Login and Sign Up Modals
* Image Selection
* Show Page Styling
* Edit and Delete Icons

### Stevie Burnette
Back End:
  - Models
  - Controllers
  - Sessions
* Angular
* App.js  
* Partials
* Group Lead

## Technical Challenges and Unsolved Issues

### Technical Challenges

* Github
  - merge conflicts
* Heroku
  - pushing from Github to Heroku
* Models for Outfits
  - outfits.js schema had to be altered to accommodate the dropdown format we later desired
* App.css
  - Footer would not display styling and layout correctly, fix: we removed it
* App.js
  - Could not get multiple controllers to connect, fix: auth.controller had to be placed within app.controller
  - Getting forms to clear properly
  - Getting sessions to work correctly
  - Getting create form to work correctly
  - Getting edit form to work correctly
  - Getting edit form to display on Heroku
  - Getting items to show correctly
  - Getting create form to connect upon returning to the create page without requiring a page reload
  - Closing the modals
* Partials
  - Getting familiar with partials, fix: learning how connect partials with other partials
* Modals
  - Image sizing issues
  - Close modal button 
* Create Page
  - Centering items
  - Positioning the form
* Show Page
  - Item positioning
  - Edit form - appearing and disappearing
* Sessions
  - Log in/Log out
  

### Unsolved Issues

After we attempted to push to Heroku, our edit form buttons became dysfunctional and we are not currently able to correctly display our edit route.

## Future Optimizations

Initially, we had planned for the "show" page to take the entered items and create a collage containing those items, thereby displaying an entire outfit as a cohesive whole.
