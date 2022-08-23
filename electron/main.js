import { app, BrowserWindow } from "electron";

import path from "path";

const BASE_PATH = {
  dist: path.join(__dirname, ".."),
  public: path.join(__dirname, app.isPackaged ? "../.." : "../../public"),
};

const createWindow = () => {
  const window = new BrowserWindow({
    // icon: path.join(BASE_PATH.public, "vite.svg"),
    title: "Cat",
  });

  if (app.isPackaged) {
    window.loadFile(path.join(BASE_PATH.dist, "index.htm"));
  } else {
    window.loadURL(process.env["VITE_DEV_SERVER_URL"]);
  }
};

app.on("window-all-closed", () => {
  app.quit();
});

app.whenReady().then(createWindow);
