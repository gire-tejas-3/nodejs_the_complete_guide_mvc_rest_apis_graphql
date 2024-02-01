/*
What is a Module in JavaScript?
    In simple terms, a module is a piece of reusable JavaScript code. It could be a .js file or a 
    directory containing .js files. You can export the content of these files and use them in other files.
    Modules help developers adhere to the DRY (Don't Repeat Yourself) principle in programming. 
    They also help to break down complex logic into small, simple, and manageable chunks.


Node.js has two module systems: 
    1. CommonJS modules  
    2. ECMAScript modules.

Node.js implements CommonJS modules standard

(Node.js also supports the ECMAScript modules standard used by browsers and other JavaScript runtimes.)

___________________________________________________________________________________________________________
CommonJs modules

    -Files with a .cjs extension
    -Files with a .js extension when the nearest parent package.json file contains a top-level 
        field "type" with a value of "commonjs".

    Calling require() always use the CommonJS module loader & module.exports or exports use 
    to export Object as module and can be used in another module(file) by calling require().

    Node.js Module Types
        Node.js includes three types of modules:
            1. Core Modules(Built-in Modules)
            2. Local Modules
            3. Third Party Modules

    1. Core Modules (Built-in Modules)
        Node.js has several modules compiled into the binary. & The core modules are defined within 
        the Node.js source and are located in the lib/ folder. Core modules can be identified using 
        the node: prefix, For instance, require('node:http') will always return the built in HTTP 
        module

        List:
            1. assert:	Provides a set of assertion tests
            2. buffer:	To handle binary data
            3. child_process: 	To run a child process
            4. cluster:	To split a single Node process into multiple processes
            5. crypto:	To handle OpenSSL cryptographic functions
            6. dgram:	Provides implementation of UDP datagram sockets
            7. dns:	To do DNS lookups and name resolution functions
            8. domain:	Deprecated. To handle unhandled errors
            9. events:	To handle events
            10. fs:	To handle the file system
            11. http:	To make Node.js act as an HTTP server
            12. https:	To make Node.js act as an HTTPS server.
            13. net:	To create servers and clients
            14. os:	Provides information about the operation system
            15. path:	To handle file paths
            16. punycode:	Deprecated. A character encoding scheme
            17. querystring:	To handle URL query strings
            18. readline:	To handle readable streams one line at the time
            19. stream:	To handle streaming data
            20. string_decoder:	To decode buffer objects into strings
            21. timers:	To execute a function after a given number of milliseconds
            22. timers:	To execute a function after a given number of milliseconds
            23. timers:	To execute a function after a given number of milliseconds
            24. tls:	To implement TLS and SSL protocols
            25. tty:	Provides classes used by a text terminal
            26. url:	To parse URL strings
            27. util:	To access utility functions
            28. v8:	To access information about V8 (the JavaScript engine)
            29. vm:	To compile JavaScript code in a virtual machine
            30. zlib:	To compress or decompress files

            ex.
            const fs = require('fs');
            fs.writeFile(`${__dirname}/reqData_or_reqBody.txt`); // async way
            fs.writeFileSync(`${__dirname}/reqData_or_reqBody.txt`); // sync way
    
    2. Local Modules
        local modules are created locally in your Node.js application by exporting them 
        using module.exports or exports.

        example

        function createLocalModule(){
            // some code
        };

        module.exports = createLocalModule;

    3. Third Party Module
        To use Third Party Packages/modules Nodejs provided npm registry (https://www.npmjs.com/)
        to install - npm install <name-of-package>

_________________________________________________________________________________________________________
ES Modules

ECMAScript modules are the official standard format to package JavaScript code for reuse
& defined using a variety of import and export statements.

    -Files with a .mjs extension

    call import() for loading ES module and export use for exporting module

*/

/**
________________________________________________________________________________________________________
________________________________________________________________________________________________________
IMP

Node js will firstly checks for core modules, if the starts with ./ or ../ it searches for local modules
, if they are not not core module or local modules it will search to third party packages.

 */