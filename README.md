# Project3AssetsOverlord

RFID Visualization Tracking System

[Live Demo](https://project3-assets-overlord.herokuapp.com/)

# Notes

## Server Dependencies

"bcryptjs": "^2.4.3",
"connect-mongo": "^2.0.3",
"connect-session-sequelize": "^6.0.0",
"express": "^4.16.4",
"express-session": "^1.15.6",
"if-env": "^1.0.4",
"mongoose": "^5.4.7",
"mysql2": "^1.6.4",
"passport": "^0.4.0",
"passport-local": "^1.0.0",
"sequelize": "^4.42.0"

npm install passport passport-local mysql2 sequelize bcryptjs connect-session-sequelize express-session mysql2

## Git

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