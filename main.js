const { app, BrowserWindow } = require('electron'),
    path = require('path'),
    url = require('url');

let win;

function createWindow() {
    const DEV = process.env.NODE_ENV === 'development';
    win = new BrowserWindow({ width: 1000, height: 600, titleBarStyle: 'hidden', resizable: DEV });

    if (DEV) {
        const port = process.argv[2] || 4040;
        win.loadURL(`http://127.0.0.1:${port}/`);
        win.webContents.openDevTools();
    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist', 'index.html'),
            protocol: 'file:',
            slashes: true,
        }));
    }

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
