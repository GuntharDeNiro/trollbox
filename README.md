To run the chatbox standalone:

### `npm i`
### `node server.js`
### `node start`


Embedding the Chatbox UI into Any Webpage
Follow the steps below to integrate the chatbox into any HTML webpage:

### `npm run build`

This will produce a build folder containing the optimized and minified production version of your app.


Copy the main JavaScript and CSS files from the build/static directory. Let's assume they are named main.xxxxxx.js and main.xxxxxx.css.


Embed the CSS and JS into the <head> of your HTML webpage:

### `<link rel="stylesheet" href="path_to_your_css/main.xxxxxx.css">`

And embed the JS script just before the closing </body> tag:

### `<script src="path_to_your_js/main.xxxxxx.js"></script>`

Add a root div where the React chat component will be mounted, typically:

### `<div id="root"></div>`

In the App.js modify the render/mount code:

### `ReactDOM.render(`
###  `<React.StrictMode>`
###  `  <ChatComponent />`
###  `</React.StrictMode>,`
###  `document.getElementById('chat-root') // Note the change here`
### `);`

In your HTML webpage, you'd then have:

### `<div id="chat-root"></div>`


CORS:
If your chat backend is on a different domain or subdomain from where you're embedding the frontend, ensure you handle CORS appropriately.




