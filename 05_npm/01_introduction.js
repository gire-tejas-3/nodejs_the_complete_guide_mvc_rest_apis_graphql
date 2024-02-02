/*
    npm is node package manager for javascript language maintain by npm.inc and 
it is default package manager for nodejs and included as recommanded features for node js.

* Use npm to . . .
    Adapt packages of code for your apps, or incorporate packages as they are.
    Download standalone tools you can use right away.
    Run packages without downloading using npx.
    Share code with any npm user, anywhere.
    Restrict code to specific developers.
    Create organizations to coordinate package maintenance, coding, and developers.
    Form virtual teams by using organizations.
    Manage multiple versions of code and code dependencies.
    Update applications easily when underlying code is updated.
    Discover multiple ways to solve the same puzzle.
    Find other developers who are working on similar problems and projects.
______________________________________________________________________________________

    ***    Importan Commands    ***
______________________________________________________________________________________
1. Update to Latest version  
    npm install npm@latest -g

2. check version 
    npm version
    npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]

alias: verison

3. install specific package- 
    npm install [<package-spec> ...]
    aliases: add, i, in, ins, inst, insta, instal, isnt, isnta, isntal, isntall

4. check all install packages 
    npm ls 
    npm ls <package-spec>
    alias: list

5. Uninstall packages
    npm uninstall <Package Name>
    alias - uninstall/un/r/rm/remove/unlink

6. start server
    npm start [...args]

7. stop server
    npm stop  [...args]

8. update Specific Package
    npm update <Package Name>
    alias - update/up/upgrade

9. npm-config
    Manage the npm configuration files

    npm config set <key>=<value> [<key>=<value> ...]
    npm config get [<key> [<key> ...]]
    npm config delete <key> [<key> ...]
    npm config list [--json]
    npm config edit
    npm config fix

    alias: c
10. npm-explain
    Explain installed packages
    npm explain <package-spec>
    alias: why

11. npm-pkg
    Manages your package.json
    npm pkg set <key>=<value> [<key>=<value> ...]
    npm pkg get [<key> [<key> ...]]
    npm pkg delete <key> [<key> ...]
    npm pkg set [<array>[<index>].<key>=<value> ...]
    npm pkg set [<array>[].<key>=<value> ...]
    npm pkg fix
________________________________________________________________________________________

________________________________________________________________________________________    
* npx(execute)
    Run a command from local or remote npm package 
    eg. npx create-react-app Myapp [,Options]

* npm-exec
    Run a command from a local or remote npm package
    npm exec -- <pkg>[@<version>] [args...]
    npm exec --package=<pkg>[@<version>] -- <cmd> [args...]
    npm exec -c '<cmd> [args...]'
    npm exec --package=foo -c '<cmd> [args...]'
    alias: x

* npm init 
    Add package.json file to your project to make it easy to manage & install

    npm init <package-spec> (same as `npx <package-spec>`)
    npm init <@scope> (same as `npx <@scope>/create`)
    aliases: create, innit

    package.json example
    {
        "name": "basal_v2",
        "version": "0.2.0",
        "private": true,
        "scripts": {
            "dev": "next dev",
            "build": "next build",
            "start": "next start",
            "lint": "next lint"
        },
        "dependencies": {
            "aws-sdk": "^2.1394.0",
            "axios": "^1.4.0",
            "js-cookie": "^3.0.5",
            "moment": "^2.29.4",
            "mongodb": "^5.6.0",
            "mongoose": "^7.2.2",
            "next": "13.4.2",
            "react": "18.2.0",
            "react-dom": "18.2.0",
            "react-intersection-observer": "^9.4.3",
            "react-moment": "^1.1.3",
            "react-reveal": "^1.2.2",
            "slugify": "^1.6.6"
        },
        "devDependencies": {
            "sass": "^1.62.1"
        }
    }
*/