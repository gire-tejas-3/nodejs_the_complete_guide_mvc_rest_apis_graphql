/*
REPL (node:repl) - Read, Evaluate, Print, Loop

https://nodejs.org/docs/latest/api/repl.html#repl
    
    Node REPL is a computer environment similar to Shell and command prompt. Node comes with the REPL 
    environment when it is installed. 

    The node:repl module exports the repl.REPLServer class. While running, instances of repl.REPLServer 
    will accept individual lines of user input, evaluate those according to a user-defined evaluation 
    function, then output the result. 

    To enter in repl environment
        Type "node" in command prompt, and hit enter 
        > perform actions here like 4 + 2

        > can run js file in repl env
            type node filename.js , it will print results on console

    The following special commands are supported by all REPL instances:
        .break: Abort multiline inputting or processing expression
        .clear: Resets the REPL context to an empty object and clears any multi-line expression being input.
        .exit: Close the I/O stream, causing the REPL to exit.
        .help: Show this list of special commands.
        .save: Save the current REPL session to a file: > .save ./file/to/save.js
        .load: Load a file into the current REPL session. > .load ./file/to/load.js
        .editor: Enter editor mode (Ctrl+D to finish, Ctrl+C to cancel).
*/