1.  - run `npm init` to create a package.json with manual values like package name, version, description, entry point, git repo, keyword, author, and license
    **OR** 
    - run `npm init -y` to create one with default values.

2.  - In the package.json add `"type" : "module"` and change the 
        ```
        "scripts": {
            "test" : "some code"
        }
        ``` 
        to 
        ```
        "scripts": {
            "start" : "node index.js"
        }
        ```
        (you can change the index.js to anything you link to in the package.json).

3.  - run `npm install express` 
    **OR** 
    - run `npm i express` 
    to install the express package.

4.  - run `npm i -D nodemon` to install the nodemon package that will run the server in the background and restart the server when you make changes to the code automatically.
    - and you can add another script to the package.json like 
        ```
        "scripts": {
            "start": "node index.js",
            "dev": "nodemon index.js"
        }
        ```
    - after the changes are made you can run `npm run start` to run the server without automatic reload **OR** `npm run dev` to run the server with automatic reload.

5.  - run `npm i dotenv` to install the dotenv package and add `require('dotenv').config()` **OR** `import 'dotenv/config'` to the top of the index.js. This will allow you to access the environment variables in the .env file. You can add the environment variables in the .env file like `PORT=3000`. You can access the environment variables in the index.js like `process.env.PORT`.

6.  - run `npm i winston morgan` to install the winston and morgan packages which are used as loggers.