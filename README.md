## ChitChat - (add snappy text)

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info (Please review the "stable-before-final" branch.)
This browser based web application named ChitChat allows users to be matched with other users of similar interests. Matched users are then able to chat with other users and potentially meet up.

* Hello my name is Bryan Tran. I'm thrilled about this project because I can experience the development process web development. 
Getting hands-on experience of FireStore Database and using Jquery to manipulate information is essential information. 


* Hi my name is Evon. I'm excited about this project because I get to experience coding a project with a team for the first time. I have always been curious on what it is like and I am grateful for the opportunity to experience this.

* Hi my name is Changwhi Oh. I'm excited about this project because I was very excited to have the xperience of making a product from planning for the first time. Especially, the process of actually implementing the features we wanted was so much fun.

## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap 
* Firestore Database
* Trello
* Figma
* Discord
	
## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # Landing HTML file, this is what users see when you come to url
├── login.html               # Login/signup HTML file, this is where users login or signup for our app.
├── README.md
└──  template.html           # Template file, every new file in this project is based on this template file.
           

It has the following subfolders and files:
├── .git                           # Folder for git repo
├── html                           # Folder for html
    /chat-list.html                # Html for chat feature
    /edit-profile.html             # Html for when user edits their own profile page 
    /friendlist.html               # Html for friends list
    /main.html                     # Html for the main page once the user logs in 
    /other-user-profile.html       # Html for the profile page for when profile button is clicked from search page
    /profile.html                  # Html for the profile page of current user. Edit profile is connected to this as well.  
    /questionnaire.html            # Html for the questionnaire page after user sign up
    /search.html                   # Html for the user search feature        
    /user-matched-profile.html     # Html for when the user go to the profile of someone that they matched with.    
├── images                         # Folder for images
    /chitchat-logo-cropped.jpg     # Cropped ChitChat logo
    /chichat-logo.png              # Non-cropped ChitChat logo
    /ChitChat-Logo.svg             # ChitChat logo in svg format
    /front-page-1.svg              # Image used for the hero image in index.html
    /profile-man.jpg               # Placeholder image used for the profile page
├── scripts                        # Folder for scripts
    /authentication.js             # Used for firebase authentication
    /chat-index.js                 # For chat feature
    /chat-list.js                  # For chat feature
    /chat-main.js                  # For chat feature
    /edit-profile.js               # For edit-profile.html
    /firebaseAPI_TEAM10.js         # Contains the api keys, had to include to github in order for          netlify to function with firebase.
    /friendlist.js                 # For code containing friendlist fucntionality
    /index.js                      # For index.html
    /main.js                       # For main.html
    /navbar.js                     # For navbar.html
    /other-user-profile.js         # For connecting users found via search to their specific profile page.
    /profile.js                    # This is for connecting the currentUser to their profile page 
    /questionnaire.js              # This is for the questionnaire.html, this appends to the current users answerList in firebase 
    /search.js                     # Code for the search feature 
    /signout.js                    # Code for the user signout feature. Currently broken. This is connected to all html pages after signup.
    /skeleton.js                   # Connects the skeleton navbars and footers to all pages. 
    /tests.js                      # Contains code that Hoda sent to Evon for help, wanted to keep here for future reference 
    /user-match-profile.js         # This is for the user-match-profile.html, when profile button is clicked, the user is then sent to a specific profile page for user matches.
    /user-matching.js              # This is code that contains user-matching algorithm. 
├── styles                         # Folder for styles
    /chat-list.css                 # Styles for chat-list.html
    /chat-main.css                 # Styles for chat feature
    /friendlist.css                # Styles for chat feature
    /index.css                     # Styles for index.html 
    /list-groups.css                
    /login.css                     # Styles for login.html 
    /main.css                      # Styles for main.html 
    /other-user-profile.css        # Styles for other-user-profile.html 
    /profile.css                   # Styles for profile.html 
    /questionnaire.css             # Styles for questionnaire.html 
    /search.css                    # Styles for search.html 
    /style.css                     # This is default style. Used for all html 
    /user-matched-profile.css      # Styles for user-match-profile.html  
├── text                           # Folder for skeleton files for navbars and footers
    /footer.html                   # Skeleton file for footer
    /nav-logged.html               # Skeleton file for bottom bar with the icons
    /nav.html                      # Skeleton file for top bar with just the logo
    /navTop.html                   # Skeleton file for top bar with just the logo

Firebase hosting files: 
├── .firebaserc
├── 404.html
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── storage.rules




```

Tips for file naming files and folders:
* use lowercase with no spaces
* use dashes (not underscore) for word separation

