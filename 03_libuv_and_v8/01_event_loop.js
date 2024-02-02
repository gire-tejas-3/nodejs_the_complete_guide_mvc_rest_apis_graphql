const fs = require('fs');
const crypto = require('crypto');

// Understanding Event Loop in LIBUV
/**
 * V8 Engine reads through and process your JS file.
 * This includes requiring modules and executing code in it. and Immidiately start up an event loop.
 * 
 * (Event Loop is not responsible for executing code, The V8 Engine is);
 * 
 * After V8 engine also register event callbacks in (Event Queue/Job Queue/ callback Queue) in FIFO order.
 * 
 * Event loop pickup this callbacks, function from event queue and send it to V8 engine to execute it.
 * 1. Firstly it checks for expired timer callbacks and pickup from CURROSPONING QUEUE and sends to execution.
 * 2. then it checks for I/O POLLING & CALLBACK in CURROSPONING QUEUE and sends to execution.
 * 3. them it checks for setImmidiate callbacks in CURROSPONING QUEUE and sends to execution.
 * 4. then checks for all callbacks is executed or not and if not, It will continue this loop (process).
 * 5. for pending task and sends to v8 to execute it.
 * 6. After finishing V8 optimize all code simulteniously using TurboFan and CrankShaft and execute final output.
 *
 */

/**
 * Node JS Process

 * Single Thread(Sequence of instruction)
 * Initialise Program -> Execute Top Level Code -> Require Modules -> Register Events ->
 * Event Loop Started on Node Server start -> Expired Timer callbacks -> I/O polling and callbacks -> 
   setImmidiate callbacks -> close callbacks

 * This phases having own queue besides there is also two queues i.e. Process.nextTick() 
   and Microtask queue (for resolving promises). and They will Executed Right after Current Phases   

 */

//  **** Note ****
//  Node js is not Single Threaded, Event loop is Single Threaded

const start = Date.now();
console.log(Date.now() - start);

setTimeout(() => {
    console.log(Date.now() - start, 'SetTimeOut After 3Sec')
}, 3000);

setImmediate(() => {
    console.log(Date.now() - start, 'SetImmidiate called Immidiately');
});

fs.readFile('./1_understanding_basics/message.txt', 'utf-8', (error, data) => {
    if (error) console.log(error);
    console.log(Date.now() - start, "Data: " + data);

    fs.writeFile('new-message.txt', data, 'utf-8', () => {
        console.log(Date.now() - start, 'readed data writed into file')
    });

    setTimeout(() => {
        console.log(Date.now() - start, 'set time out 2sec called after reading message data')
    }, 2000);

    crypto.pbkdf2('T3ej5as96@', 'salt', 1000000, 16, 'sha512', (err, data) => {
        if (err) console.log(err);
        console.log(Date.now() - start, 'Password Hashed inside read file' + data.toString('hex'))
    });

    crypto.pbkdf2('T3ej5as96@', 'salt', 1000000, 16, 'sha512', (err, data) => {
        if (err) console.log(err);
        console.log(Date.now() - start, 'Password Hashed inside read file' + data.toString('hex'))
    });

    crypto.pbkdf2('T3ej5as96@', 'salt', 1000000, 16, 'sha512', (err, data) => {
        if (err) console.log(err);
        console.log(Date.now() - start, 'Password Hashed inside read file' + data.toString('hex'))
    });

    crypto.pbkdf2('T3ej5as96@', 'salt', 1000000, 16, 'sha512', (err, data) => {
        if (err) console.log(err);
        console.log(Date.now() - start, 'Password Hashed inside read file' + data.toString('hex'))
    });
});

setTimeout(() => {
    console.log(Date.now() - start, 'SetTimeout After 0sec')
}, 0);

fs.writeFile('new-message_1.txt', 'Buffer.concat(readData).toString()', 'utf-8', () => {
    console.log(Date.now() - start, 'new-message_1 File writed');
});

crypto.pbkdf2('T3ej5as96@', 'salt', 1000000, 16, 'sha512', (err, data) => {
    if (err) console.log(err);
    console.log(Date.now() - start, 'Password Hashed at top' + data.toString('hex'));
});

crypto.pbkdf2('T3ej5as96@', 'salt', 1000000, 16, 'sha512', (err, data) => {
    if (err) console.log(err);
    console.log(Date.now() - start, 'Password Hashed at top' + data.toString('hex'));
});

crypto.pbkdf2('T3ej5as96@', 'salt', 1000000, 16, 'sha512', (err, data) => {
    if (err) console.log(err);
    console.log(Date.now() - start, 'Password Hashed at top' + data.toString('hex'));
});

crypto.pbkdf2('T3ej5as96@', 'salt', 1000000, 16, 'sha512', (err, data) => {
    if (err) console.log(err);
    console.log(Date.now() - start, 'Password Hashed at top' + data.toString('hex'));
});

console.log(Date.now() - start, 'Top Level Code Execution');

/** Output
    0
    14 Top Level Code Execution
    49 SetTimeout After 0sec
    51 SetImmidiate called Immidiately
    3023 SetTimeOut After 3Sec
    3232 Password Hashed at top92959df966c6c64de158aa32e647feb3
    3234 new-message_1 File writed
    3236 Data: giretejas%40gmail.com&password
    3341 Password Hashed at top92959df966c6c64de158aa32e647feb3
    3375 Password Hashed at top92959df966c6c64de158aa32e647feb3
    3398 Password Hashed at top92959df966c6c64de158aa32e647feb3
    5247 set time out 2sec called after reading message data
    6353 Password Hashed inside read file92959df966c6c64de158aa32e647feb3
    6355 readed data writed into file
    6499 Password Hashed inside read file92959df966c6c64de158aa32e647feb3
    6538 Password Hashed inside read file92959df966c6c64de158aa32e647feb3
    6544 Password Hashed inside read file92959df966c6c64de158aa32e647feb3
 */