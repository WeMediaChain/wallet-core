const { createWindowsInstaller } = require('electron-winstaller'),
    fs = require('fs'),
    OUT_PUT = './release';

const winOptions = {
    appDirectory: 'build/WMCWallet-win32-x64',
    iconUrl: 'https://nzsjtzs2b.qnssl.com/icon.ico',
    setupIcon: 'icons/icon.ico',
    outputDirectory: OUT_PUT,
    exe: 'WMCWallet.exe',
};


if (!fs.existsSync(OUT_PUT)) {
    fs.mkdirSync(OUT_PUT);
}

createWindowsInstaller(winOptions).then(_ => {
    console.log('创建安装文件成功');
}, err => {
    console.error('创建安装文件失败', err);
});
