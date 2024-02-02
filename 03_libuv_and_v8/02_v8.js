/*

V8 and Libuv Working
    https://chaudharypulkit93.medium.com/how-does-nodejs-work-beginner-to-advanced-event-loop-v8-engine-libuv-threadpool-bbe9b41b5bdd

V8 in Depth
    https://hackernoon.com/javascript-v8-engine-explained-3f940148d4ef
    https://miro.medium.com/v2/resize:fit:720/format:webp/1*W9scwah0RjkYuUX8byiVIA.png
    

    V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++

V8 Does:
    Compiles and executes JS code
    Handling call stack — running your JS functions in some order
    Managing memory allocation for objects — the memory heap
    Garbage collection — of objects which are no longer in use
    Provide all the data types, operators, objects and functions

V8 Can:
    Provide the event loop, but this is sometimes implemented by the browser as well

V8 Doesn’t:
    Know anything about the Document Object Model (DOM) — which is provided by the browser, and 
        obviously irrelevant to Node.js for example

    V8 is a single threaded execution engine. It’s built to run exactly one thread per 
    JavaScript execution context. You can actually run two V8 engines in the same process 
    — e.g. web-workers, but they won’t share any variables or context like real threads. 
    This doesn’t mean V8 is running on a single thread, but it does mean it provides a 
    JavaScript flow of a single thread.

    On the runtime, V8 is mainly managing the heap memory allocation and the single threaded 
    call stack. The call stack is mainly a list of function to execute, by calling order. 
    Every function which calls another function will be inserted one after the other directly, 
    and callbacks will be sent to the end. This is actually why calling a function with 
    setTimeout of zero milliseconds sends it to the end of the current line and doesn’t 
    call it straight away (0 milliseconds).


JS Interpreter — Ignition & Optimization Compiler — TurboFan & Crankshaft
    V8 gets its speed from just-in-time (JIT) compilation of JavaScript to native machine code, 
    just before executing it. First of all, the code is compiled by a baseline compiler, which 
    quickly generates non-optimized machine code. On runtime, the compiled code is analyzed and 
    can be re-compiled for optimal performance. Ignition provides the first while TruboFan & 
    Crankshaft the second.

    JIT compilation result machine code can take a large amount of memory, while it might be 
    executed once. This is solved by the Ignition, which is executing code with less memory 
    overhead.

    The TurboFan project started in 2013 to improve the weakness of Crankshaft which isn't 
    optimized for some part of the JavaScript functionality e.g. error handling. It was designed 
    for optimizing both existing and future planned features at the time.

WebAssembly — Liftoff
    Achieving great performance is also key in the browser, and this is the task Liftoff 
    is used for — generating machine code. Not using the complex multi-tier compilation, 
    Liftoff is a simpler code generator, which generates code for each opcode (a single 
    portion of machine code, specifying an operation to be performed) at a time. Liftoff 
    generates code much faster than TurboFan (~10x) which is obviously less performant 
    (~50%).

Garbage Collection — Orinoco
    Running over the memory heap, looking for disconnected memory allocations is the Orinoco. 
    Implementing a generational garbage collector, moving objects within the young generation, 
    from the young to the old generation, and within the old generation. These moves leave holes, 
    and Orinoco performs both evacuation and compaction to free space for more objects.

    Another optimization performed by Orinoco is in the way it searches through the heap 
    to find all pointers that contain the old location of the objects moved and update 
    them with the new location. This is made using a data structure called remembered set.

    On top of these, black allocation is added, which basically means the garbage collection 
    process automatically marks living objects in black in order to speed up the iterative 
    marking process.
*/