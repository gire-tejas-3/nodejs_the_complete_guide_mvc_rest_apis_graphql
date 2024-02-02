/**
Express is a minimal and flexible Nodejs framework that provides a robust set of a features
for web and mobile application

Install express
    npm install express 

uninstall express
    npm un express
 */

    const express = require('express');

    console.log("Express: " + express);
    /**
    Output
       require('express') return express object that contains createApplication() return express application
    
       function createApplication() {
           
           var app = function(req, res, next) {
               app.handle(req, res, next);
           };
    
           mixin(app, EventEmitter.prototype, false);
           mixin(app, proto, false);
    
           // expose the prototype that will get set on requests
           app.request = Object.create(req, {
               app: { configurable: true, enumerable: true, writable: true, value: app }
           })
    
           // expose the prototype that will get set on responses
           app.response = Object.create(res, {
               app: { configurable: true, enumerable: true, writable: true, value: app }
           })
    
           app.init();
           return app;
       }
     */
    
    const app = express();
    
    console.log("App: " + app);
    app.listen(process.env.PORT, process.env.HOSTNAME);
    /*
    Output 
        App: function(req, res, next) {
            app.handle(req, res, next);
        }
    
    */