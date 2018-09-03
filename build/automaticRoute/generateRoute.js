const fs = require('fs')
const nodePath = require('path')
const template = nodePath.resolve(__dirname+'/auto.router.js')
// co
//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */

function geFileList(path) {
    let filesList = [];
    readFile(path, filesList);
    return filesList;
}

//遍历读取文件
function readFile(path, filesList) {
    // path = nodePath.join(__dirname, path)
    files = fs.readdirSync(path);//需要用到同步读取
    files.forEach(walk);
    function walk(file) {
        states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) {
            readFile(path + '/' + file, filesList);
        }
        else {
            var paths = path + '/' + file;
            filesList.push(paths);
        }
    }
}

//写入文件utf-8格式
function writeFile(fileName, data) {
    fs.writeFile(fileName, data, complete);
    function complete() {
        console.log("文件生成成功");
    }
}

function formatOptimize(param){
    let result = fs.readFileSync(template, {
        encoding: 'utf-8'
    });
    
    let newRou = [];
    let pathReg = new RegExp('\\$\\{path\\}', 'ig');
    let nameReg = new RegExp('\\$\\{name\\}', 'ig');
    let componentReg = new RegExp('\\$\\{component\\}', 'ig');
    let itemParam = param.split('pages')[1];
    let switchItem = itemParam.split('.vue')[0].split('/');
    let nameStr = '';
    let pathStr='';
    let componentStr='';
      
    switchItem.map((item, index) => {
        if (item&&item!='index') {
            let middleName=item.replace('_','');
            let middlePath=item.replace('_',':');
            let renderPath=item;
            if(middlePath.indexOf(':')!=-1){
                renderPath=middlePath;
            }
            nameStr = nameStr ? nameStr + '-' + middleName : middleName;
            pathStr=pathStr?pathStr+'/'+renderPath:renderPath;
            componentStr=componentStr?componentStr+'/'+item:item;
        }
    })
    let obj = result;
    obj= obj.replace(pathReg,'/'+pathStr)
    obj= obj.replace(nameReg,nameStr)
    obj= obj.replace(componentReg,'pages/'+componentStr)  
    newRou.push(obj);
    
    return newRou
}

function render(){
    let filesList = geFileList(nodePath.join(__dirname,"../../src/pages"));
    let renderRoute=[];
    for (var i = 0; i < filesList.length; i++) {
        if(filesList[i].indexOf('/_') != -1){
            renderRoute=renderRoute.concat(formatOptimize(filesList[i]));
        }else{
            if(filesList[i].indexOf('index.vue') != -1){
                renderRoute=renderRoute.concat(formatOptimize(filesList[i]));
            }
        }
    }

    strs='export default {routes:['+renderRoute+']}';
    writeFile(nodePath.join(__dirname,"../../src/router/newRouter.js"),strs);
}

module.exports=render