const { createWindowsInstaller } = require('electron-winstaller'),
    { MSICreator } = require('electron-wix-msi'),
    fs = require('fs'),
    pkg = require('../package'),
    OUT_PUT = './release';

const winOptions = {
        appDirectory: 'build/WMCWallet-win32-x64',
        iconUrl: 'https://nzsjtzs2b.qnssl.com/icon.ico',
        setupIcon: 'icons/icon.ico',
        outputDirectory: OUT_PUT,
        exe: 'WMCWallet.exe',
    },
    msiOptions = {
        appDirectory: 'build/WMCWallet-win32-x64',
        outputDirectory: OUT_PUT,
        description: pkg.description,
        exe: pkg.name,
        name: pkg.name,
        manufacturer: 'We Media Chain Wallet',
        version: pkg.version,
    };


if (!fs.existsSync(OUT_PUT)) {
    fs.mkdirSync(OUT_PUT);
}

(async () => {
    const msiCreator = new MSICreator(msiOptions);
    
    await msiCreator.create();
    await msiCreator.compile();
})();

// createWindowsInstaller(winOptions).then(_ => {
//     console.log('创建安装文件成功');
// }, err => {
//     console.error('创建安装文件失败', err);
// });
