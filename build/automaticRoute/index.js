const render = require('./generateRoute');
const chokidar = require('chokidar');
const path = require('path');
const templateFile = chokidar.watch(path.join(__dirname, '../../pages'));

function auto() {
    render()
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
    })

}
module.exports = auto;