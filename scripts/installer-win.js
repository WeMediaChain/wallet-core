const { createWindowsInstaller } = require('electron-winstaller'),
    fs = require('fs'),
    pkg = require('../package.json'),
    OUT_PUT = './release';

const winOptions = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    appDirectory: 'build/WMCWallet-win32-x64',
    iconUrl: 'icons/icon.ico',
    setupIcon: 'icons/icon.ico',
    outputDirectory: OUT_PUT,
    authors: 'MiRinZhang',
    exe: `${pkg.name}.exe`,
};


if (!fs.existsSync(OUT_PUT)) {
    fs.mkdirSync(OUT_PUT);
}

createWindowsInstaller(winOptions).then(_ => {
    console.log('创建安装文件成功');
}, err => {
    console.error('创建安装文件失败', err);
});
