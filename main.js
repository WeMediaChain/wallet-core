const { app, BrowserWindow, Menu } = require('electron'),
    path = require('path'),
    url = require('url'),
    template = [
        {
            label: '编辑',
            submenu: [
                {
                    label: '撤销',
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo',
                },
                {
                    type: 'separator',
                },
                {
                    label: '剪贴',
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut',
                },
                {
                    label: '复制',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy',
                },
                {
                    label: '粘贴',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste',
                },
                {
                    label: '全选',
                    accelerator: 'CmdOrCtrl+A',
                    role: 'selectall',
                }
            ],
        },
    ];

let win;

function createWindow() {
    const DEV = process.env.NODE_ENV === 'development';
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        titleBarStyle: 'hidden',
        show: false,
        resizable: DEV,
        fullscreen: false,
        backgroundColor: '#F9F9F9',
    });
    
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
    
    win.on('ready-to-show', () => {
        win.show();
    });
    
    win.on('closed', () => {
        win = null;
    });
}

// Handling Squirrel Events
if (handleSquirrelEvent()) {
    return;
}

function handleSquirrelEvent() {
    if (process.argv.length === 1) {
        return false;
    }
    
    const ChildProcess = require('child_process'),
        appFolder = path.resolve(process.execPath, '..'),
        rootAtomFolder = path.resolve(appFolder, '..'),
        updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe')),
        exeName = path.basename(process.execPath);
    
    const spawn = (command, args) => {
        let spawnedProcess;
        
        try {
            spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
        } catch (error) {
            console.log(error);
        }
        
        return spawnedProcess;
    };
    
    const spawnUpdate = (args) => spawn(updateDotExe, args),
        squirrelEvent = process.argv[1];
    
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            spawnUpdate(['--createShortcut'], exeName);
            setTimeout(app.quit, 1000);
            return true;
        case '--squirrel-uninstall':
            spawnUpdate(['--removeShortcut'], exeName);
            setTimeout(app.quit, 1000);
            return true;
        case '--squirrel-obsolete':
            app.quit();
            return true;
    }
}

app.on('ready', () => {
    createWindow();
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

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
