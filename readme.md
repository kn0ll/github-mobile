github-mobile
===

intention
---
github-mobile is a github web app most suitable for mobile browsing. you can view a [live demo here](http://gh.nodejitsu.com/).

![screenshot 1](http://i.imgur.com/3ny4U.png) | 
![screenshot 2](http://i.imgur.com/xPabC.png)

installation
---

    $ git clone git@github.com:catshirt/github-mobile.git
    $ cd github-mobile
    $ npm install
    $ coffee app.coffee

will start a server running on [localhost:8000](http://localhost:8000).

configuration
---
if you wish to set up the application on a different server or url, you will need to modify keys.coffee to reflect your own oauth keys; the default keys should work for anyone running the application on localhost:8000.

todo
---
- publish as npm module for easy deployment (fix weird npm/coffee/require bug?)