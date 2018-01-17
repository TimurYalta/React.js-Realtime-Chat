# React.js-Realtime-chat
	Simple chat made with React.js/Socket.IO-client on frontend and Node.js/Express/Socket.IO on backend. 
	At the present moment chat has such functions:
		1) Login with unique name.
		2) Sending message with address to user.
		3) Outputting 10 last messages in the chat.
		4) Outputting all users currently online. 
		5) And stuff.
	
	To start:
		1) npm install
		2) npm start
		3) Open "http://localhost:3000/" in browser.
		4) Optionally change the port variable in server.js.

	To rebuild/change build properties of frontend:
		1) cd client
		2) npm install
		3) change webpack.config.js
		3) npm run build

	All already built files are present in "client/build"