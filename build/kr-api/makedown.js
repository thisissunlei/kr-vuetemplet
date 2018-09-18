const fs = require('fs')
const path = require('path')
const components =require('./js');
var summarys = '';
components.map((item,index)=>{
  var strs='|api|type|default|\n|------|------| ------|\n';
  for(let key in item.props){
    strs+='|'+key+'|'+setShowValue(item.props[key].type)+'|'+setShowValue(item.props[key].default)+'| \n';
  }
  summarys+="* ["+item.name+"](api/"+item.name+".md)\n";
  writeFile(path.join(__dirname, './make/apis/'+item.name+'.md'),strs);
})  
writeFile(path.join(__dirname, './make/SUMMARY.md'),summarys);

function writeFile(fileName, data) {
  fs.writeFileSync(fileName, data, complete);
  function complete() {
      console.log("文件生成成功");
  }
}
function setShowValue(value){
  if(value===undefined){
    return '-'
  }
  if((typeof value) == 'function'){
    return JSON.stringify(value());
  }
  return value;
}

function summaryRender(){

}

