import { app, shell, BrowserWindow,Menu,ipcMain  } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let newProductWindow;
let newMapwindow

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: true,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration:true,
      contextIsolation: false,
      enableRemoteModule: true,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", 'http://localhost:*'],
          scriptSrc: ["'self'", 'http://localhost:*'],
        },
      },
    }
  })

  
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
    ipcMain.on('open_map', (e,item) => {
    // newProductWindow.webContents.send('mensaje-ventana', item);
    MapWindow(item);
    console.log(item);
    // newProductWindow.webContents.send('mensaje-ventana',"camera");
  });
  const template = [
    {
      label: 'Cámaras',
      click: () => {
        mainWindow.webContents.send('menu-click', 'camera');
      },
    },
    {
      label: 'Incidencias',
      click: () => {
        mainWindow.webContents.send('menu-click', 'incidence');
      },
    },
    {
      label: 'Sensores',
      click: () => {
        mainWindow.webContents.send('menu-click', 'sensor');
      },
    },
    {
      label: 'Añadir',
      submenu:[{
        label:'Camaras',
        click: () => {
          createNewProductWindow("camera")
        },
      },
      {
        label:'Incidencias',
        click: () => {
          createNewProductWindow("incidence")
        },
      },
      {
        label:'sensores',
        click: () => {
          createNewProductWindow("meter")
        },
      }

      ],

    },
  ];
  
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

}

function createNewProductWindow(item){
  newProductWindow = new BrowserWindow({
    width:500,
    height:600,
    show: true,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration:true,
      contextIsolation: false,
      enableRemoteModule: true,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", 'http://localhost:*'],
          scriptSrc: ["'self'", 'http://localhost:*'],
        },
      },

    }
  })
  newProductWindow.on('ready-to-show', () => {
    newProductWindow.show()
    console.log(item);
    switch (item) {
      case "camera":
        newProductWindow.webContents.send('mensaje-ventana', "camera");
        break;
      case "incidence":
        newProductWindow.webContents.send('mensaje-ventana', "incidence");
        break;
      case "meter":
        newProductWindow.webContents.send('mensaje-ventana', "meter");
        break;
      default:
        break;
    }

  })

  newProductWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // newProductWindow.webContents.send('mensaje-ventana', "ferbabdi");
 
  newProductWindow.setMenu(null);

  //newProductWindow.loadFile(join(__dirname, '../../src/renderer/hola.html'))
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    const url = process.env['ELECTRON_RENDERER_URL'] + "/index2.html"
    newProductWindow.loadURL(url)

  } else {
    newProductWindow.loadFile(join(__dirname, '../renderer/index2.html'))
  }

  // ipcMain.on('mensaje', (e,item) => {
  //   newProductWindow.webContents.send('mensaje-ventana', item);

  //   console.log("item");
  //   // newProductWindow.webContents.send('mensaje-ventana',"camera");
  // });
  // newProductWindow.webContents.send('mensaje',"camera");

  // ipcMain.on('mensaje', (event, args) => {
  //   newProductWindow.webContents.send('mensaje', '¡Hola desde el proceso principal!');
  // });
}
function MapWindow(location) {
  newMapwindow = new BrowserWindow({
    width:700,
    height:470,
    show: true,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration:true,
      contextIsolation: false,
      enableRemoteModule: true,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", 'http://localhost:*'],
          scriptSrc: ["'self'", 'http://localhost:*'],
        },
      },

    }
  })
  newMapwindow.on('ready-to-show', () => {
    newMapwindow.show()
    newMapwindow.webContents.send('location', location);

  })

  newMapwindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // newProductWindow.webContents.send('mensaje-ventana', "ferbabdi");
 
  newMapwindow.setMenu(null);
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    const url2 = process.env['ELECTRON_RENDERER_URL'] + "/index3.html"
    console.log(url2);
    newMapwindow.loadURL(url2)

  } else {
    newMapwindow.loadFile(join(__dirname, '../renderer/index3.html'))
  }



}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
