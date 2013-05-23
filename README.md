PortJS
======

PortJS is not and will never be another JavaScript loader and module dependency solution, because [Sea.js](http://seajs.org) just did a great job on this. Sea.js is the best script loader I've ever seen and used. I think you should try it, too.

Unfortunately, if you can't read Chinese, you will find it's difficult to use Sea.js because It don't even has a English document! Therefore Sea.js is barely used outside of China despite how popular it is in Chinese web development community.

So here I am. I'll write a [connect](http://www.senchalabs.org/connect/) middleware to show you my best practice of using Sea.js in node.js project and I'll talk about it on JSConfCN 2013, the 京JS conf which will be hold in Beijing this summer.

Sea.js In Short
---------------

Sea.js is a script loader implemented [CMD](http://wiki.commonjs.org/wiki/Modules/Wrappings) ... Well, I'll add this section in the future.

The RDD Strategy of PortJS
--------------------------

Right now I'm developing PortJS using a [Readme-Driven Development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html) strategy. So everything you read below, is my current focus and will be done in my next git push.

Planning v0.0.1
---------------

Just make a working [MVP](http://en.wikipedia.org/wiki/Minimum_viable_product).

Usage
-----

It's recommended to use PortJS in a new project, so let's just start one:

    npm install -g express # if you didn't before
    express example
    cd example
    npm install
    npm install --save portjs

add a file public/javascripts/string.js:

    exports.eeoo = function (str) {
      return str.replace(/EE/g, 'OO');
    }

and public/javascripts/beepboop.js:

    var str = require('string');
    console.log(str.eeoo('BEEP'));
    exports.more = function () {
      console.log(str.eeoo('BEEP BOP BEEP'));
    }

modify app.js to use portjs:

    // ...
    var portjs = require('portjs');
    var app = express();
    // ...
    app.use(app.router);
    app.use(portjs());
    app.use(express.static(path.join(__dirname, 'public')));

one more thing, add some lines in views/layout.jade:

    app.use(app.router);
    app.use(portjs());
    app.use(express.static(path.join(__dirname, 'public')));

now run `node app.js` and visit [http://127.0.0.1:3000/](http://127.0.0.1:3000/) and open Developer Tools in your browser, you should see output like:

    BOOP
    BOOP BOP BOOP

Also, as you can see, `string.js` and `beepboop.js` is totally compatible with node.js, so you can use it in node.js directly, just try it yourself.

How It Works
------------

Sorry, not today. I'll write it down after v0.0.1 published.
