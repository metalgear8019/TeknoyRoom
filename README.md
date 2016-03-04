# TeknoyRoom
----------------------------------
### APPENDIX

#### APPENDIX i: Assumptions

This manual assumes that the user
knows what the application is all about and 
assumes that he has the following things at his disposal:
- An Internet browser (preferrably Firefox)

#### APPENDIX ii: Knowledge

This manual will help the user on how to use the application.
This serves as the basis of instructions.

#### APPENDIX iii: Users

Admin - this user is intended to manage the application and 
	all of its users

Client - this user is the intended target of the application

----------------------------------

#### CHAPTER 1: Installation

###### Server Installation:

* Install [nodejs](https://nodejs.org/)
* Install [MeteorJS](https://www.meteor.com/install)
* Install [PeerServer](https://www.npmjs.com/package/peer) using the command `npm -g install peer` in `cmd`
* Open a command line window, go to this project's directory, and run `meteor`
* Open another command line and run `ipconfig` to know the server's IP
* After getting the IP, run `peerjs --port 9000 --path "/" --key teknoyroom`
* Clients in the same network can access the app at `<IP address>:3000`

----------------------------------

#### CHAPTER 2: System Overview

TeknoyRoom is a web application that enables teachers and students to interact
using video communication. This is made possible with the MeteorJS development
stack and Google's WebRTC for the video communication module.