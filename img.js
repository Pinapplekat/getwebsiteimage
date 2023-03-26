var fs = require("fs");

function getByteArray(filePath) {
  let fileData = fs.readFileSync(filePath).toString("hex");
  let result = [];
  for (var i = 0; i < fileData.length; i += 2)
    result.push("0x" + fileData[i] + "" + fileData[i + 1]);
  return result;
}
var page
var browser
const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = 3000;
async function start() {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://google.com/', { waitUntil: "networkidle0" });
}
start()
app.get("/url.jpg", async (req, res) => {
  console.log("REQUEST RECIEVED");
  var { url } = req.query;
  url = 'https://' + url
  console.log(url)
  await page.setViewport({ width: 2560, height: 1440 });
  await page.goto(url, { waitUntil: "networkidle0" });
  var scrnsht = await page.screenshot({
    path: "screenshot.jpg",
  });

  const byteFile = getByteArray(__dirname + "/screenshot.jpg");
  res.sendFile(__dirname + "/screenshot.jpg");
  // res.json(byteFile)
  console.log("sent");
  // browser.close();
});
app.get("/key.jpg", async (req, res) => {
  var { keycode } = req.query
  await page.keyboard.press(keycode, { waitUntil: "networkidle0" })
  var scrnsht = await page.screenshot({
    path: "screenshot.jpg",
  });

  const byteFile = getByteArray(__dirname + "/screenshot.jpg");
  res.sendFile(__dirname + "/screenshot.jpg");
})
app.get("/type.jpg", async (req, res) => {
  var { text } = req.query
  await page.keyboard.type(text, { waitUntil: "networkidle0" })
  var scrnsht = await page.screenshot({
    path: "screenshot.jpg",
  });

  const byteFile = getByteArray(__dirname + "/screenshot.jpg");
  res.sendFile(__dirname + "/screenshot.jpg");
})
app.get("/keybind.jpg", async (req, res) => {
  var { key, shift, control } = req.query
  console.log(shift,control)
  if (shift == "true") {
    await page.keyboard.down("ShiftLeft")
    console.log("SHIFT")
  }
  if (control == "true") {
    await page.keyboard.down("ControlLeft")
    console.log("CTRL")
  }
  
  await page.keyboard.press(`Key${key.toUpperCase()}`)
  if (shift == "true") {
    await page.keyboard.up("ShiftLeft")
  }
  if (control == "true") {
    await page.keyboard.up("ControlLeft")
  }
  var scrnsht = await page.screenshot({
    path: "screenshot.jpg",
  });

  const byteFile = getByteArray(__dirname + "/screenshot.jpg");
  res.sendFile(__dirname + "/screenshot.jpg");
})
app.get("/screenshot.jpg", async (req, res) => {
  var scrnsht = await page.screenshot({
    path: "screenshot.jpg",
  });

  const byteFile = getByteArray(__dirname + "/screenshot.jpg");
  res.sendFile(__dirname + "/screenshot.jpg");
})
app.get("/close", (req, res) => {
  browser.close()
})
app.get("/test", (req, res) => {
  res.send("TEST");
});
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
