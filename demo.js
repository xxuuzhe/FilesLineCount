var fs = require('fs')
var path = require('path')
var filesCount = [];
var filters = ['.js','.html','.css','.tpl']
var num = 0;
countFiles('./')
function countFiles(dic){
    function count(pathWay){
        var files = fs.readdirSync(pathWay);
        files.forEach(function(name){
            var tmpPath = pathWay +"/"+name
            var tmpFile = fs.statSync(tmpPath)
            if(tmpFile.isDirectory()){
                count(tmpPath)
            }else{
                if(filters.indexOf(path.extname(name)) >- 1 ){
                    filesCount.push(tmpPath)
                }
            }
        })
    }

    filesCount.forEach(function(file){

        var data = fs.readFileSync(file,'utf8')
        var str = data.toString('utf8')
        var res = str.match(/\r\n|\n\r|\r|\n/g)
        if(res)num+=res.length;
    })

    console.log(num)
}
