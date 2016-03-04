# USER MANAUL for router™
----------------------------------
### APPENDIX

#### APPENDIX i: Assumptions

This manual assumes that the user
knows what the application is all about and 
assumes that he has the following things at his disposal:
- Internet Connection (preferably 4G+)
- Android phone with:
	- Android 5.0 (Lollipop) OS and above
	- 2GB of RAM
	- 8GB - 16GB of internal memory
	with a free slot of 300MB and above

#### APPENDIX ii: Knowledge

This manual will help the user on how to install
and how to use the application. This serves as the basis
of instructions.

#### APPENDIX iii: Users

Admin - this user is intended to manage the application and 
	needs to install the router.admin application.

Client - this user is the intended target of the application and
	needs to install the router application.

----------------------------------

#### CHAPTER 1: Installation

###### Installation for Server:

- **LOCALHOST(127.0.0.1) Installation**

* Download and Install XAMPP
* run server (start apache and mysql)
* copy file sever database router.sql
* import router.sql

- **OPENSHIFT SERVER Installation and Deployment**

* Set up openshift account from git account
* Plug-in the technology needed in the cartridge (in this case, XAMPP)
* Download application for authorization for pushing and pulling
the web application you are making.
* editing the server codes is a matter of pushing and pulling of your
git repository

* Openshift server credentials for phpmyadmin:
	* username: adminvYxxF2J
	* password: AiUVfK3pCgUk

###### Installation for administrator:

* install apk com.copyright.router.admin
* run the admin app

###### Installation for user:

* install apk com.copyright
* run the user/client app

----------------------------------

#### CHAPTER 2: System Overview

Team Copyright developed the router™ project that is composed of three interrelated projects:

* router.web
	- router web is a web application that serves as the server's API. 
router web is developed in codeigniter MVC Framework.

* router.admin
	- router admin is an android application that is responsible for the 
creating and managing routes, and creating and managing landmarks.

* router
	- router is an android application that will help people find jeepney
routes or alternative transportation in Cebu from their current
location to their destination intended for offline use.

----------------------------------

#### CHAPTER 3: FAQs for client

1. *How to navigate map on router?*

* Tap the navigate map button on the home screen
* drag the screen left/right to see the left/right side of the map
* pinch the map to zoom out the map
* stretch the map to zoom in

2. *How do I set my source and destination?*

* Tap the navigate map button on the home screen 
* on the upper right side of the screen, there is a set point label and make sure that the label is on "source"
 Tap anywhere on the map to set your source
* then on the upper right side of the screen there is still a set point label, tap it and the label will be set on target and the icon will change from green to red.
* Tap anywhere on the map in order to set the destination.

3. *How can I set my own personal landmark?*

* on the home screen, there is a "add landmark" button, then Tap it
* Tap anywhere on the map to set your own personal landmark
* The sytem will the require you to input the name of your landmark
* Tap the confirm button to save the landmark
* the system will redirect you to the home screen and on the bottom it will display a message that the landmark has been saved.

4. *How can I see my newly set landmark?*

* on the home screen, there is a "manage landmark" button. Tap it.
* the system will display the map and all the set landmark will be displayed.

5. *How can I edit or delete my set landmark?*

* on the home screen, there is a "manage landmark" button. Tap it.
* the system will display all the landmarks on the map
* if you want to edit your landmark, Tap on the desired landmark and the system will let you edit the name of the landmark.
* tap on the confirm button to change the name of the landmark
* if you want to delete your landmark, know that built in landmarks cannot be deleted.
* tap the landmark that you want to delete and tap on the 	x marker
* system will notify the user that the landmark has been deleted

6. *Can I personalize the application?*

* Yes, by pressing the "..." menu. This can be found anywhere on the screen.
* There will be number of options you can choose from after tapping that button
* tap on the personalize button
* enjoy personalizing your app

7. *What is the synchronize button?*

- The synchronize button lets you synchronize your current router app to the new version of the application. This is usually done if there is an update in the system. Also, a strong internet connection must be present.

8. *How can I arrive to my wanted destination at the fastest time possible*

- on the navigate map, on the upper left side corner, there is a mark named "shortest route". Tap on it and a route with the fastest time will be displayed on the map.

9. *Is there another time of route?*

- Yes, the cheapest route. The cheapest route is displayed when you press the route type on the upper left side of the app.
The system will displayed a route with the lowest amount to be paid.

10. *Can I use the existing landmark and use it as a source for the route?*

- Yes, you can search the landmark and there will be a list that will be displayed. Tap one of the list to display it as a source.

11. *Can I see the information of a specific jeepney?*

- Yes you can, in the navigate map, on the lower right side corner, there is a commute route details. When you tap it, there will display the amount to be paid, the jeepney to be ride, the estimated time of arrival/ ETA, the source and the destination.