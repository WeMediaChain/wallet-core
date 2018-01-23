const { createWindowsInstaller } = require('electron-winstaller'),
    fs = require('fs'),
    path = require('path'),
    pkg = require('../package'),
    OUT_PUT = './release';

const winOptions = {
    appDirectory: path.normalize(path.join('./build/WMCWallet-win32-x64')),
    iconUrl: 'https://nzsjtzs2b.qnssl.com/icon.ico',
    setupIcon: path.normalize(path.join('./resources/icons/icon.ico')),
    outputDirectory: OUT_PUT,
    exe: `${pkg.name}.exe`,
    noMsi: true,
    setupExe: 'WeMediaChain Wallet.exe',
};


if (!fs.existsSync(OUT_PUT)) {
    fs.mkdirSync(OUT_PUT);
}

createWindowsInstaller(winOptions).then(_ => {
    console.log('创建安装文件成功');
}, err => {
    console.error('创建安装文件失败', err);
});
