# pinapplekat/getwebsiteimage
## Request a screenshot of a specific website and control it with typing and keybinds
### Run script
Make sure you have the lastest version of node.js installed. You can install it [here](https://nodejs.org/)  
Once you have that install all you need to do is to go to the folder within the command prompt with `cd C:\your\folder`  
Run the command `npm install` and wait for it to install dependencies.  
Or just run `npm run fresh` while in the folder, `npm run linux` on most linux devices  
Once finished, simply run `node .` and the web server will be up and ready to be connected to.
### Get screenshot
Simply making a GET request to `http://127.0.0.1:3000/url.jpg?url=your url` would return a screenshot of that website.
### Use keys & keybinds
To send a key you can send a request to `http://127.0.0.1:3000/keybind.jpg?key=A&shift=true&control=true`  
`key=` of course meaning the key that you would like to send, for example `key=v` or `key=c`.  
Set `shift=` to `true` to send the shift key, same goes for `control=`
### Send a whole string
To send a whole string all you have to do is send a get request to `http://127.0.0.1/type.jpg?text=your string`
### Request specific viewport
When sending a request you can add the paramater `viewport=` to the `/url.jpg` request.  
Example: `http://127.0.0.1/url.jpg?url=example.com&viewport=1920x1080`

![image](https://user-images.githubusercontent.com/58854416/228946407-487c88e2-5e5d-470e-ab70-c58a4ea4d272.png)

### Returning image as a byte array
To do this you simply have to add the paramater `byte=true` to the `/url.jpg` request.  
Example: `http://127.0.0.1/url.jpg?url=example.com&byte=true`

![image](https://user-images.githubusercontent.com/58854416/228943631-c0efe662-a108-4c13-b6f9-32b232d5af86.png)

## Not running?
### Linux
Run the command `sudo apt-get update` to update the dependencies then `sudo apt install libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev libatk-bridge2.0-0` to install the required dependencies to run puppeteer.  
We made this easy so you can just type `npm run linux` to fix the issue. This command will first do exactly what we did up there, then install all npm packages, the proceed to run the server on port 3000.
