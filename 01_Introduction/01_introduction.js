/*
Introduction to Nodejs
________________________________________________________________________________________________________________
The official documentation states:
    Node.js is an open source and cross-platform JavaScript runtime built on Chrome’s V8 JavaScript engine.
    (outside of the browser. This allows Node.js to be very performant)
        
    A Node.js app runs in a SINGLE process, without creating a new thread for every request. 
    Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript 
    code from blocking and generally, libraries in Node.js are written using non-blocking paradigms, 
    making blocking behavior the exception rather than the norm.

    When Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem, 
    instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations 
    when the response comes back.

    This allows Node.js to handle thousands of concurrent connections with a single server without introducing 
    the burden of managing thread concurrency, which could be a significant source of bugs.
________________________________________________________________________________________________________________
*/