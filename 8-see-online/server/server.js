const express = require('express');
const cors = require('cors')
const onlineUsers = require('./OnlineUsers');

const app = express();
app.use(cors())

app.get("/see/:name", async (req, res) => {
  res.set({
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache",
      Connection: "keep-alive", // allowing TCP connection to remain open for multiple HTTP requests/responses
      "Content-Type": "text/event-stream", // media type for Server Sent Events (SSE)
  });
  res.flushHeaders();
  
  const user_name = req.params.name;

  const sendKeepAlive = () => {
      res.write(':\n\n'); // SSE comment to keep the connection alive
  };

  const intervalId = setInterval(sendKeepAlive, 15000); // send keep-alive every 15 seconds

  const sendEvent = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  console.log(`${user_name} => online :)`);
  onlineUsers.add_user(user_name, sendEvent);

  req.on('close', () => {
      clearInterval(intervalId);
      console.log(`${user_name} => offline ;(`);
      onlineUsers.remove_user(user_name);
      res.end();
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
