var fs = require("fs");

function getByteArray(filePath) {
  let fileData = fs.readFileSync(filePath).toString("hex");
  let result = [];
  for (var i = 0; i < fileData.length; i += 2)
    result.push("0x" + fileData[i] + "" + fileData[i + 1]);
  return result;
}

const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = 3000;
var browser_sessions = [];
app.get("/url", async (req, res) => {
  console.log("REQUEST RECIEVED");
  var { url } = req.query;
  url = 'https://'+url
  console.log(url)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(url, { waitUntil: "networkidle0" });
  var scrnsht = await page.screenshot({
    path: "screenshot.jpg",
  });

  const byteFile = getByteArray(__dirname + "/screenshot.jpg");
  // res.sendFile(__dirname + "/screenshot.jpg");
  res.json(byteFile)
  console.log("sent");
  browser.close();
});
app.get("/test", (req, res) => {
  res.send("TEST");
});
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
