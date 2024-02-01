/*
Node.js can be installed in different ways. This post highlights the most 
common and convenient ones. Official packages for all the major platforms 
are available at https://nodejs.org/download/.

One very convenient way to install Node.js is through a package manager. 
In this case, every operating system has its own. Other package managers for 
MacOS, Linux, and Windows are listed in https://nodejs.org/download/package-manager/

Installing Node.js via package manager

    - Alpine Linux
        apk add nodejs npm
        apk add nodejs-current

    - Android
        pkg install nodejs
    
    - CentOS, Fedora and Red Hat Enterprise Linux
        dnf module install nodejs:<stream>
        dnf module list nodejs
        dnf module install nodejs:18/common

    - macOS
        curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > 
        "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"

        brew install node
        Using MacPorts:
            port install nodejs<major version> 
            
    - Windows
        winget install OpenJS.NodeJS
        winget install OpenJS.NodeJS.LTS

        Using Chocolatey:
            cinst nodejs
            cinst nodejs.install
        
        Using Scoop:
            scoop install nodejs
            scoop install nodejs-lts


*/