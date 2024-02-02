/*
Application Programming Interface
    API stands for application programming interface refers to any software with distinct 
    function and interface can be throughout of as a contract of service between two applications 
    this contract defines how to communicate with each other using the request & response

Some API types:
    1. RPC (remote procedural call)
    2. Soap (simple object access protocol)
    3. Rest (representational state transfer)
    4. GraphQL

    1. RPC (remote procedural call):
        It is an inter process communication technique used for client server based application.
        A client has a request message that the RPC translate and sends to server 
        (this may be procedure or function call) when server received request it send required 
        response back to the client. The client is blocked while server is processing and only 
        resume after exhibition is finished.

        Client                                          Server
        |    |                                          |    |
        Client Functions                                Server Functions
        |    |                                          |    |
        Client Stub                                     Server Stub
        |    |                                          |    |
        RPC Runtime    ==========================       RPC Runtime


    2. Soap (simple object access protocol):
        Soap is a protocol for exchange of information in distributed environment. Soap message 
        and encode as a XML document and can be exchange using various underlaying protocol.

        Service Requester  -Bind--> Service Provider
            \                               /
             \                             /
           Find    Service Registry    Publish

        * Publish: 
            When service registry used, A service provider publishes it's service description 
            in a service registry for the service requester to find

        * Find:
            When service registry use a service request finds the service description in a 
            registry

        * Bind: 
            Service request uses service description to find with service provider at interact 
            with web services

    3. REST(Representational state transfer): 
        -First define in 2000 by Dr.Roy
        REST is a set of a architectural constraints not any protocol or standard

        When client request is made via restful API transfer a representation of the state 
        of resource to request on end point. This information is delivered in one of several 
        formats via: http, JSON, HTML, XML, XLT, python or a plain text 

        In restful API heaters and parameters are also important in the http method, request 
        as to contain information as they request's, metadata, authorization uniform resource 
        locator URL caching cookies and more

    4. GraphQL
        GraphQL is a query language for your API, and a server-side runtime for executing queries 
        using a type system you define for your data. GraphQL isn't tied to any specific database 
        or storage engine and is instead backed by your existing code and data.

        A GraphQL service is created by defining types and fields on those types, then providing 
        functions for each field on each type.

        After a GraphQL service is running (typically at a URL on a web service), it can 
        receive GraphQL queries to validate and execute. The service first checks a query to 
        ensure it only refers to the types and fields defined, and then runs the provided 
        functions to produce a result.

        
*/
