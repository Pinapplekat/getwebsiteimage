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
async function start(url, viewport) {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  openurl(url, viewport)
}
async function changeViewport(viewport) {
  if (typeof viewport == 'string') {

  }
  await page.setViewport(viewport);
}
async function openurl(url, viewport, res, byte) {
  try {
    if (!viewport) viewport = "1920x1080"
    viewport = {
      width: parseInt(viewport.split("x")[0]),
      height: parseInt(viewport.split("x")[1])
    }
    if (!viewport.width || !viewport.height) {
      var err = "Not a valid viewport property, it should look like 'WIDTHxHEIGHT'"
      res.status(400).send(err)
      throw new Error(err)
    }
    console.log(viewport)
    await page.setViewport(viewport);
    if (url) {
      if (!url.startsWith("http")) url = 'https://' + url
      await page.goto(url, { waitUntil: "networkidle0" })
    };
    var scrnsht = await page.screenshot({
      path: "screenshot.jpg",
    });
    if (byte?.toLowerCase() == "true") {
      const byteFile = getByteArray(__dirname + "/screenshot.jpg");
      if (res) return res.send(byteFile)
    }
    if (res) {
      res.sendFile(__dirname + "/screenshot.jpg");
    }
  } catch (err) {
    console.error(err)
  }
}
start('https://google.com/', "1920x1080")
app.get("/url.jpg", async (req, res) => {
  console.log("REQUEST RECIEVED");
  var { url, viewport, byte } = req.query;

  openurl(url, viewport, res, byte)
  // else res.sendFile(__dirname + "/screenshot.jpg");
  // res.json(byteFile)
  console.log("sent");
  // browser.close();
});
app.get("/key.jpg", async (req, res) => {
  try {
    var { keycode, byte, viewport } = req.query
    await page.keyboard.press(keycode, { waitUntil: "networkidle0" })

    openurl(url=null, viewport=viewport, res=res, byte=byte)
  } catch (err) {
    console.error(err)
    res.send(err)
  }
})
app.get("/type.jpg", async (req, res) => {
  var { text, byte, viewport } = req.query
  await page.keyboard.type(text, { waitUntil: "networkidle0" })
  openurl(url=null, viewport=viewport, res=res, byte=byte)
})
app.get("/keybind.jpg", async (req, res) => {
  try {
    var { key, shift, control, byte, viewport } = req.query
    console.log(shift, control)
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
    openurl(url=null, viewport=viewport, res=res, byte=byte)

  } catch (err) {
    console.error(err)
    res.send(err)
  }
})
app.get("/screenshot.jpg", async (req, res) => {
  var { byte, viewport } = req.query
  openurl(url=null, viewport=viewport, res=res, byte=byte)
})
app.get("/close", (req, res) => {
  browser.close()
  res.send("Closed the browswer.")
})
app.get("/", (req, res) => {
  res.send('use /url.jpg or other. \n visit <a href="https://github.com/pinapplekat/getwebsiteimage/">the github</a> for more information');
});
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
