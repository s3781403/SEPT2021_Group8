# RMIT SEPT 2021 Major Project

# Group 8 - 10:30

## Members
* s3788894 - Kartik Kumar
* s3840619 - Aaron Fisher
* s3805530 - Shrestha Ghosh
* s3781403 - Oliver Hale

## Records

* GitHub repository : https://github.com/s3781403/SEPT2021_Group8 
* jira Board : https://sept-group8.atlassian.net/jira/software/projects/SG/boards/1
	
## Code documentation - Release 0.1.0 - 25/09/2021

* App allows users to login
* App allows users to register new accounts
* App allows users to view books stored on the app database
* App allows users to add books to cart
* App allows admin users to add books to the database
* App allows admin users to edit books within the database
* App allows admin users to delete books from the database
* App allows users to search for books by isbn, Name, Author, Category etc.
* App database running within a MySQL instance using Amazon RDS
* App images stored within an Amazon S3 Bucket and dynamically loaded into the site
* App runs entirely out of docker container

To run the application locally :
1) cd into the SEPT2021_Group8 Directory
2) run the command docker-compose up -d
3) The app should now be running within a docker container and can be visited on localhost:3000



