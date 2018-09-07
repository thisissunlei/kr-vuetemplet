const render = require('./generateRoute');
const chokidar = require('chokidar');
const path = require('path');
const templateFile = chokidar.watch(path.join(__dirname, '../../pages'));
const env = process.env.NODE_ENV 
function auto() {
    render()
    if(env === 'production'){
        return ;
    }
    templateFile.on('ready', () => {
        templateFile.on('add', (path) => {
            render();
        });
        templateFile.on('unlink', (path) => {
            render();
        });
        templateFile.on('addDir', (path) => {
            render();
        });
        templateFile.on('unlinkDir', (path) => {
            render();
        });
    })

}
module.exports = auto;