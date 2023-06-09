# pinapplekat/getwebsiteimage
## Get Started
### Run script
Make sure you have the lastest version of node.js installed. You can install it [here](https://nodejs.org/)  
Once you have that installed all you need to do is to go to the folder within the command prompt with `cd C:\your\folder`  
Run the command `npm install` and wait for it to install dependencies.  
Or just run `npm run fresh` while in the folder, `npm run linux` on most linux devices  
Once finished, simply run `node .` and the web server will be up and ready to be connected to.
### Go to website
Simply making a GET request to `http://localhost:3000/url.jpg?url=your url` would return a screenshot of that website.
### Use keys & keybinds
To send a key you can send a request to `http://localhost:3000/keybind.jpg?key=A&shift=true&control=true`  
`key=` meaning the character that you would like to send, for example `key=v` or `key=c`.  
Set `shift=` to `true` to send the shift key, same goes for `control=`
### Send a whole string
To send a whole string all you have to do is send a get request to `http://localhost:3000/type.jpg?text=your string`
### Request a screenshot of whatevers on the screen right now
Simply make a request to `http://localhost:3000/screenshot.jpg`
### Request specific viewport
When sending a request you can add the paramater `viewport=` to any request.  
There are no limits to the size of the viewport  
Example: `http://localhost:3000/url.jpg?url=example.com&viewport=1920x1080`  

![image](https://user-images.githubusercontent.com/58854416/228946407-487c88e2-5e5d-470e-ab70-c58a4ea4d272.png)  

### Returning image as a byte array
To do this you simply have to add the paramater `byte=true` to any request.  
Example: `http://localhost:3000/url.jpg?url=example.com&byte=true`  

![image](https://user-images.githubusercontent.com/58854416/228943631-c0efe662-a108-4c13-b6f9-32b232d5af86.png)  

## Not running?
### Linux
Run the command `sudo apt-get update` to update the dependencies then `sudo apt install libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev libatk-bridge2.0-0` to install the required dependencies to run puppeteer.  
We made this easy so you can just type `npm run linux` to fix the issue. This command will first do exactly what we did up there, then install all npm packages, the proceed to run the server on port 3000.
### Windows/Mac
Make sure you have the latest version of [node.js](https://nodejs.org/) installed.  
If you do, make sure you have updated and installed the packages. You can quickly do this by running the script: `npm run fresh` or `npm run fresh-dev`   
## Developer
Running `npm run dev` will start a nodemon process to automatically refresh the server for easy development.  
You can quickly run dev from any other command by adding `-dev` at the end. Example: `npm run linux-dev` or `npm run fresh-dev`
