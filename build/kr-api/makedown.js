const fs = require('fs')
const path = require('path')
const components =require('./js');

components.map((item,index)=>{
  var strs='|api|type|default|\n|------|------| ------|\n';
  for(let key in item.props){
    strs+='|'+key+'|'+(item.props[key].type||'-')+'|'+(item.props[key].default||'-')+'| \n';
  }
  writeFile(path.join(__dirname, './make/'+item.name+'.md'),strs);
})  

function writeFile(fileName, data) {
  fs.writeFileSync(fileName, data, complete);
  function complete() {
      console.log("文件生成成功");
  }
}