const allParams= require('./params');
const render = require('./generateRoute');
function compareParams(items){
    let params=items?items:{};
    for(let item in allParams){
        if(!params[item]&&typeof(params[item])!='boolean'){
          params[item]=allParams[item];
        }
     }
     return params;
}
let params=compareParams();
render(params);
