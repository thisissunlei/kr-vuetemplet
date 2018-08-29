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
            autoRoute();
        });
        templateFile.on('unlink', (path) => {
            autoRoute();
        });
        templateFile.on('addDir', (path) => {
            autoRoute();
        });
        templateFile.on('unlinkDir', (path) => {
            autoRoute();
        });
        templateFile.on('change', (path) => {
            autoRoute();
        });
    })

}
module.exports = auto;