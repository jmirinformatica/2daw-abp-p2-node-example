const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())

app.get("/events", (_req, res, _next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    Connection: "keep-alive", // allowing TCP connection to remain open for multiple HTTP requests/responses
    "Content-Type": "text/event-stream", // media type for Server Sent Events (SSE)
  });
  res.flushHeaders();

  const interval = setInterval(() => {
    const msg = "El servidor a les " + new Date().toLocaleTimeString() + " envia un número aleatori entre 1 i 100: " + Math.floor(Math.random() * 100);
    res.write(`data: ${JSON.stringify({ msg: msg })}\n\n`);
  }, 1000);

  res.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
