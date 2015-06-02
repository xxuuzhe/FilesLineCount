/*param dic 需要查找的目录
 *
 *
 *return lines
 *return files
 *return directory
 *return filters
*/
var fs = require('fs')
var path = require('path')

var filters = ['.js','.html','.css','.tpl','.jpg']
var num = 0,
    files = [],
    directory = [];

function countFiles(dic){
    count(dic);
    function count(pathWay){
        var aFiles = fs.readdirSync(pathWay);
        aFiles.forEach(function(fileName){
            var tmpPath = (pathWay +"/"+fileName).replace(/(\/)+/g,"/");
            var tmpFile = fs.statSync(tmpPath)
            if(tmpFile.isDirectory()){
                directory.push(tmpPath);
                count(tmpPath);
            }else{
                if(filters.indexOf(path.extname(fileName)) >- 1 ){
                    files.push(tmpPath)
                }
            }
        })
    }

    files.forEach(function(file){
        var data = fs.readFileSync(file,'utf8')
        var str = data.toString('utf8')
        var res = str.match(/\r\n|\n\r|\r|\n/g)
        if(res)num+=res.length;
    });

    return {
        "lines":num,
        "files":files,
        "directory":directory,
        "filters":filters
    }
}
console.log(countFiles("/Users/David/Desktop/"))
