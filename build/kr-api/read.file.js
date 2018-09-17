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
          filesList.push(paths);
      }
  }
}