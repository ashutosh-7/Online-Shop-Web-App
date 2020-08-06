# Live Running on - https://eshop6777.herokuapp.com/

# Running Locally
Make sure you have Node.js and the Heroku CLI installed.
Setup MonngoDB connection URI in app.js and set up sendgrid api key in auth.js controller.
```
  $ https://github.com/ashutosh-7/Online-Shop-Web-App.git # or clone your own fork
  $ cd E-coaching
  $ npm install
  $ npm start

```




# Deploying to Heroku 
``` 
  $ heroku login    
  $ heroku create
  $ git push heroku master
  $ heroku open
```


$ git rm --cached FILENAME or foldername how to untrack any previous tracked files.
heroku logs --app app_name -> how to check logs on heroku 
Remember about Procfile and nodemon error while deploying on heroku.
