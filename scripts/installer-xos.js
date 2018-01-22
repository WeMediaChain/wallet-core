const createDMG = require('electron-installer-dmg'),
    fs = require('fs'),
    pkg = require('../package.json'),
    OUT_PUT = './release';

const xosOptions = {
    appPath: 'build/WMCWallet-darwin-x64/WMCWallet.app',
    name: pkg.name,
    out: OUT_PUT,
    icon: 'icons/icon.icns',
    overwrite: true,
    version: pkg.version,
};


if (!fs.existsSync(OUT_PUT)) {
    fs.mkdirSync(OUT_PUT);
}

createDMG(xosOptions, (err) => {
    if (err) {
        console.log('创建DMG文件失败', err);
    }
});
