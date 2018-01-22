const createDMG = require('electron-installer-dmg'),
    { createWindowsInstaller } = require('electron-winstaller'),
    fs = require('fs'),
    pkg = require('../package.json'),
    OUT_PUT = './release';

const xosOptions = {
        appPath: 'build/WMCWallet-darwin-x64/WMCWallet.app',
        name: pkg.name,
        out: OUT_PUT,
        icon: 'assets/icons/icon.icns',
        overwrite: true,
    },
    winOptions = {
        appDirectory: '',
        outputDirectory: OUT_PUT,
        authors: 'MiRinZhang',
        exe: `${pkg.name}.exe`,
    };


if (!fs.existsSync(OUT_PUT)) {
    fs.mkdirSync(OUT_PUT);
}

createDMG(xosOptions, (err) => {
    if (err) {
        console.log('创建DMG文件失败', err);
    }
});

createWindowsInstaller(winOptions).then(_ => {
    console.log('创建EXE文件成功');
}, err => {
    console.error('创建EXE文件失败', err);
});
