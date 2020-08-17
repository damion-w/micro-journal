# Reflective
*Looking back to move forward*

## Introduction
A good life is a series of mistakes in which you’ve learned from.  Due to the fast pace of life and large number of distractions around us, we rarely learn from most of our mistakes.  This leads to feeling “stuck”, or even worse, looking back 5 years from now and asking, “How come I haven’t made any progress?”.

The way to learn from our mistakes is to reflect on them when they happen.  One of the ways to do this is by journaling.  Since most people don’t have the time or desire to do this, micro journaling was invented.  Micro journaling is unstructured and meant to take less time and effort to do.  However, reflection is hard, and this is where [Reflective](https://stark-headland-00691.herokuapp.com/) can help.

This app (name TBD) will allow a user to enter:
1. 3 things that occurred during the day to “keep”
1. 3 things to “throw away”
1. 1 random thing worth noting

## Technologies used
### User authentication
Users are able to login and see only their journal entries.  This is achieved by using 
* [Passport-local](https://www.npmjs.com/package/passport-local) to authenticate users using username and passowrd 
* [Passport](https://www.npmjs.com/package/passport) to authenticate requests
* [Bcryptjs](https://www.npmjs.com/package/bcryptjs) to salt passwords

### Handling dates
[Moment.js](https://momentjs.com/) was used to simplify storing and displaying dates.

## User stories
1. As a user, I can enter three things I did today that I want to keep doing
1. As a user, I can enter three things I did today that I want to stop doing
1. As a user, I can enter one random thing from the day that is worth noting

## Wireframes
### Login page
![Log In](/wireframes/index.png)

### New user registration
![Register](/wireframes/register.png)

### Journal entries
![Index](/wireframes/index.png)

### Add entry
![Add entry](/wireframes/new.png)

## Code snippet
I had trouble keeping track of all the console logging I was doing, so I created this function to make to more readable, and, pretty.

```javascript
function prettyLog(title, str) {
    if (process.env.NODE_ENV === 'dev') {
        console.log(`\n************************************************************`);
        console.log(title)
        console.log(`************************************************************`);
        if (str) {
            console.log(str)
            console.log(`------------------------------------------------------------`);
        }
    }
}

module.exports = prettyLog
````

It made my logs readable, as opposed to the jumbled mess it was.
![Pretty Log](/wireframes/pretty-log.png)

## Future additions
Here’s a list of things I wanted to do but ended up cutting due to running out of time:
1. Separate fields for keep and throw away
1. Supplemental information when I enter an item I want to stop doing
1. Add a page that shows all entries with the same tag

## Running locally
Once you clone this repo to your local repository and install the dependent NPM packages, you'll need to create a .env file in the root of the repository with this value 

    NODE_ENV='dev'
    SECRET_KEY=[your secret key here]

`NODE_ENV='dev'` will provide enhanced console logging, and `SECRET_KEY` is used by [express-session](https://www.npmjs.com/package/express-session) to sign the session ID cookie.
