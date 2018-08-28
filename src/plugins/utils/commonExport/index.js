  /*导出*/
  function commonExport(props,url){
    var where=[];
    for(var item in props){
        if(props.hasOwnProperty(item)){
            where.push(`${item}=${props[item]}`);
        }
    }
   
    var url = `${url}?${where.join('&')}`
    window.location.href = url;
}
export default commonExport;