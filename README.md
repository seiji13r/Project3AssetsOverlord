# Assets Overlord <!-- Omit in toc -->

- [Overview](#overview)
- [Application Workflow](#application-workflow)
- [Notes](#notes)
  - [Server Dependencies](#server-dependencies)
  - [Git Notes](#git-notes)
  - [Heroku](#heroku)

# Overview

Assets Overlord is an automated inventory system using RFID infrastructure. This type of system provides a 98% accuracy on inventory, as opposed to 65% when using bar codes. In addition to that, this also saves a lot of days of man-hours of inventory inspection. Knowing in real time the product availability, helps boost sales (around an 8% bump). And last but not least, theft prevention is also a very important factor in low-trust environments like Mexico.

[Live Demo](https://project3-assets-overlord.herokuapp.com/)

# Application Workflow

The Web Application displays the Product and Last location Information according to the Automated EPC registration read by the RFID Antennas.

* An EPC is near an antenna tag reader.
* The tag reader triggers a POST request to the application, sending and saving the EPC tag Id, the sensor ID and the time-stamp of the event.
* A user registers the product information and its corresponding EPC tag.
* A user registers the reader information such as reader ID and Location.
* The application joins the database tables to display the last location of the Products via the EPC tag.
* The user has the option to visualize this information in different formats (Graphs and/or Tables).



# Notes

## Server Dependencies

```javascript
"axios": "^0.18.0",
"bcryptjs": "^2.4.3",
"connect-session-sequelize": "^6.0.0",
"dotenv": "^6.2.0",
"express": "^4.16.3",
"express-session": "^1.15.6",
"if-env": "^1.0.4",
"mongojs": "^2.6.0",
"mongoose": "^5.3.16",
"mysql2": "^1.6.4",
"passport": "^0.4.0",
"passport-local": "^1.0.0",
"sequelize": "^4.42.0"
```

``` console
npm install axios passport passport-local mysql2 sequelize bcryptjs connect-session-sequelize express-session mongojs mongoose
```

## Git Notes

* Create New Branch
`git checkout -b [New Branch]`

* List Remote Branches
`git branch -va`

* Bring All Branch Names
```
git fetch
git pull
```

* Change To a Branch
```
git checkout [remote_branch]
```

## Heroku

* Deploy Master
  `git push heroku master`

* Deploy a Branch
  `git push heroku testbranch:master`

* Clear Cache Data

```console
heroku plugins:install heroku-repo
heroku repo:purge_cache -a project3-assets-overlord
git commit --allow-empty -m "Purge cache"
git push heroku master
```