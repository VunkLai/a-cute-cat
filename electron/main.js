import { app, BrowserWindow, Menu, Tray } from "electron";

import path from "path";

const BASE_PATH = {
  dist: path.join(__dirname, ".."),
  public: path.join(__dirname, app.isPackaged ? "../.." : "../../public"),
};

const createWindow = () => {
  const window = new BrowserWindow({
    width: 365,
    height: 365,
    webPreferences: {
      preload: "preload.js",
    },
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    show: true,
  });

  if (app.isPackaged) {
    window.loadFile(path.join(BASE_PATH.dist, "index.html"));
  } else {
    window.loadURL(process.env["VITE_DEV_SERVER_URL"]);
  }

  window.setAlwaysOnTop(true);

  return window;
};

const createTray = (window) => {
  const trayIcon = path.join(BASE_PATH.public, "cat_icon.png");
  const tray = new Tray(trayIcon);
  tray.setToolTip("this is a small cat");
  const contextMenu = Menu.buildFromTemplate([
    { label: "show", click: () => window.show() },
    { label: "hide", click: () => window.hide() },
    {
      label: "close",
      click: () => {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);

  tray.on("click", () => window.show());

  return tray;
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  const window = createWindow();
  createTray(window);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
