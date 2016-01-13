# MEAN application using passport login and Node JS API #

"Its my personal portal application which i am using for providing training to other people , it has everything in it clinet side code and server side code which is deployed on heroku and using mongolab for mongo DB.

The application allows you to browse through a list of available courses and also provide you the platform to learn new things.

REST API developed in Node and Angular is consuming those services.


## To run the application on your own Heroku account:##

1. Install the [Heroku Toolbelt](http://toolbelt.heroku.com)

2. [Sign up](http://heroku.com/signup) for a Heroku account

3. Login to Heroku from the `heroku` CLI:

        $ heroku login

4. Create a new app on Heroku:

        $ heroku create

5. Add the [MongoLab Heroku Add-on](http://addons.heroku.com/mongolab)

        $ heroku addons:add mongolab

6. Upload the app to Heroku:

        $ git push heroku master

7. Open the app in your browser:

        $ heroku open
