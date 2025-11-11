const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())

const wsserver = require('./wsserver');

app.get("/", (req, res) => {
  const connected_users = wsserver.get_connected_users();
  
  res.send("<h2>Usuaris online:</h2><ul>" + connected_users.map((username) => `<li>${username}</li>`).join('') + "</ul>");
});

app.get("/time", (req, res) => {
  const server_time = new Date().toLocaleTimeString();
  res.json({ time: server_time });
});

app.post("/update_time_for_everybody", (req, res) => {
  wsserver.send_notification_to_all({ type: "update_time" });
  res.json({ msg: "Notifications sent to all connected clients." });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
