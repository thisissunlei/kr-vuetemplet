const fs = require('fs')
const path = require('path')



function geFileList(path) {
  let filesList = [];
  readFile(path, filesList);
  return filesList;
}


//遍历读取文件
function readFile(path, filesList) {
  files = fs.readdirSync(path);//需要用到同步读取
  files.forEach(walk);
  function walk(file) {
    states = fs.statSync(path + '/' + file);
    if (states.isDirectory()) {
      readFile(path + '/' + file, filesList);
    }
    else {
      var paths = path + '/' + file;
      if (paths.indexOf('.vue') != -1) {
        filesList.push(paths);
      }

    }
  }
}

function render() {
  var components = []
  var fileList = geFileList(path.join(__dirname, '../../src/components'));
  fileList.map(function (item, index) {
    result = fs.readFileSync(item, {
      encoding: 'utf-8'
    })
   
    result = result.replace(/\s+/g,""); //去除多余空行
    result=result.replace(/^[\s　]+|[\s　]+$/g, "");//去掉全角半角空格
    result=result.replace(/[\r\n]/g,"");//去掉回车换行
    templateReg =  /(\/\*@api\*\/)((?!\/\*api@\*\/).)+(\/\*api@\*\/)/ig;
    result.replace(templateReg,function(value){
      value = value.replace('/*@api*/','');
      value =value.replace('/*api@*/','');
      let name = item;
      if(name.indexOf('/index.vue')!=-1){
        name = name.replace('/index.vue','');
      }else{
        name = name.replace('.vue','');
      }
      name = name.split('/');
      console.log( item,"kkkkkk")
      components.push('{name:"'+name[name.length-1]+'",'+datafarmat(value)+'}');

    })
  })
   var strs='module.exports=['+components+']';
    writeFile(path.join(__dirname, './js.js'),strs);
}
function datafarmat(value){
  var reg = /(type:)((?!,).)+(,)/g;
  var arrReg = /(\[)((?!\]).)+(\])/g;
  value = value.replace(arrReg,function(val){
    return "'"+val+"'"
  })
  value = value.replace(reg,function(val){
  
    if(val.indexOf('[')!=-1){
     
      return val;
    }
    console.log(val,">>>>>>>")
    val = val.replace('type:',"");
    val = val.replace(',',"");
    if(val.indexOf('}')!=-1){
      val = val.replace('}',"");
      return "type:'"+val+"'},"
    }
   
    return "type:'"+val+"',"
  })
 
  
   
  


  return value
}

//写入文件utf-8格式
function writeFile(fileName, data) {
  fs.writeFileSync(fileName, data, complete);
  function complete() {
      console.log("文件生成成功");
  }
}
render();

