# Social Blog SPA
Software University 2019

## Angular Project

## Tech
* Front-end:
	* Angular - Platform for building mobile and desktop web applications
	* Material - design system

* Back-end:
	* NodeJS - Event-driven I/O for the back-end
	* ExpressJS - Web application framework for Node.js
	* MongoDB - Free and open-source cross-platform document-oriented database
	* Mongoose - ODM for MongoDB
	* JSONWebToken - Method for representing claims between two parties
	

* The goal of this project is to show the core concepts of building SPA with ExpressJS and Angular. In this project I've used:
	* Wrapped each major feature into a module
	* Lazy-loading for most of the modules so the app can start faste
	* Shared module for components, directives and pipes that can be imported into any feature module
	* Services for each major feature
	* Guards to prevent unauthorized users to view routes that require authentication or admin rights
	* Interceptors for attaching JWT token to the request headers, showing notifications from the server response and error handling
	* Custom pipes
	* TypeScript models
	* Reactive forms for handling user input

### Features
The app has the following structure:
* Guests (anonymous users) are:
	* allowed to the home page and see all the posts
	* allowed to see some more content of each post
	* not allowed to post/comment
* Users can:
	* create posts
	* see a more detailed view of the post
	* leave a comment
	* edit/delete their own posts
	* like/hate a post
	* edit/delete their own comments
* Admins can (additionally to the registered users):
	* approve/delete/edit anyone's posts
	* approve/delete/edit anyone's comments
