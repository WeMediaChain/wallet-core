const createDMG = require('electron-installer-dmg'),
    fs = require('fs'),
    path = require('path'),
    pkg = require('../package.json'),
    OUT_PUT = './release';

const xosOptions = {
    appPath: `build/WMCWallet-darwin-x64/${pkg.name}.app`,
    name: pkg.name,
    out: OUT_PUT,
    icon: 'resources/icons/icon.icns',
    background: 'resources/background.jpg',
    overwrite: true,
    version: pkg.version,
    contents: [
        {
            x: 140,
            y: 240,
            type: 'file',
            path: path.join(__dirname, '../', `build/WMCWallet-darwin-x64/${pkg.name}.app`),
        },
        {
            x: 500,
            y: 240,
            type: 'link',
            path: '/Applications',
        },
    ]
};


if (!fs.existsSync(OUT_PUT)) {
    fs.mkdirSync(OUT_PUT);
}

createDMG(xosOptions, (err) => {
    if (err) {
        console.log('创建DMG文件失败', err);
    }
});
