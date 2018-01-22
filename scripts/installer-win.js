const { createWindowsInstaller } = require('electron-winstaller'),
    fs = require('fs'),
    pkg = require('../package.json'),
    OUT_PUT = './release';

const winOptions = {
    appDirectory: '',
    outputDirectory: OUT_PUT,
    authors: 'MiRinZhang',
    exe: `${pkg.name}.exe`,
};


if (!fs.existsSync(OUT_PUT)) {
    fs.mkdirSync(OUT_PUT);
}

createWindowsInstaller(winOptions).then(_ => {
    console.log('创建EXE文件成功');
}, err => {
    console.error('创建EXE文件失败', err);
});
