<div align="center">
  
  # Hooked Tic-Tac-Toe
  
  ### A Tic-Tac-Toe game using React Hooks

</div>
  
  <br>
  <br>
  <br>

## This project was crafted with:
 
1. MySQL Database (or any which accepts SQL queries)
2. Node.js
3. React.js
4. Bootstrap
5. Docker (optional, but I used Docker as my database container)


## Running this project

You can run this project on your machine by following these steps:

1. Installing [Git](https://git-scm.com/downloads) then:
    
    ```bash
    git clone https://github.com/git-BR/hooked-tic-tac-toe
    ```
    
    You could just extract the zip folder downloaded from my [GitHub](https://github.com/git-BR/hooked-tic-tac-toe) as well.
    
2. Install [Node.js](https://nodejs.org/en/download/) from their official website or from the command:
    
    ### Arch Linux
    
    Node.js and npm packages are available in the Community Repository.
    
    ```bash
    pacman -S nodejs npm
    
    ```
    
    ### CentOS, Fedora and Red Hat Enterprise Linux
    
    Node.js is available as a module called `nodejs` in CentOS/RHEL 8 and Fedora.
    
    ```bash
    dnf module install nodejs:<stream>
    
    ```
    
    where `<stream>` corresponds to the major version of Node.js. To see a list of available streams:
    
    ```bash
    dnf module list nodejs
    
    ```
    
    For example, to install Node.js 12:
    
    ```bash
    dnf module install nodejs:12
    ```
    
3. Install [MySQL](https://www.mysql.com/downloads/) (you could use [Docker](https://www.docker.com/get-started) too with their official [image](https://hub.docker.com/_/mysql))
4. Integrate [Bootstrap](https://getbootstrap.com/docs/5.1/getting-started/download/) choosing one of their install options (I attached on HTML `<head>`)
5. You need to create a `.env` file inside the server folder to hide sensitive information and add these variables names and values:
    
    ```bash
    DB_HOST=localhost # localhost used because the db is running locally
    DB_PORT=3306 # default MySQL port
    DOCKER_DATABASE=THE_NAME_YOU_CHOSE_FOR_YOUR_DB 
    DB_USER=root # default use
    DB_PASS=THE_PASSWORD_YOU_CHOSE
    NODE_PORT=3001 # default Node port
    ```
    
6. This project has two folders `client` and `server`  so let's choose `client` first and run a terminal pointing to it:
    
    > this will install dependencies:
    > 
    
    ```bash
    npm i
    ```
    
    > this will start the project and launch a browser:
    > 
    
    ```bash
    npm start
    ```
    
    > now let's point to the root of the `server` folder and install dependencies again:
    > 
    
    ```bash
    npm i
    ```
    
    > and finally, let's start the server + database:
    > 
    
    ```bash
    npm run dev:server
    ```
    

If the database was successfully started you will see a message in `console` saying `Database OK` and `Table OK` . This will create the database right after you load the page on your browser.

<br>

<div align="center">

  # Have fun!🎉
  
</div>
