const createDMG = require('electron-installer-dmg'),
    fs = require('fs'),
    pkg = require('../package.json');

const options = {
    appPath: 'build/WMCWallet-darwin-x64/WMCWallet.app',
    name: pkg.name,
    out: './release',
    icon: 'assets/icons/icon.icns',
    overwrite: true,
};

if (!fs.existsSync('./release')) {
    fs.mkdirSync('./release');
}

createDMG(options, (err) => {
    if (err) {
        console.log('创建DMG文件失败', err);
    }
});
