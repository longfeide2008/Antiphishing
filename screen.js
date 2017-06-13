/**
 * Created by liuju on 2017/5/12.
 */
// a phantomjs example, saved as img
var page = require('webpage').create();
var fs = require('fs');
var system = require('system');
if(system.args.length == 1){
   console.log('command line arguments is not enough');
	phantom.exit();
}
else
{
   var url = system.args[1];
   // 如果不是http开头start
//    var fdStart = url.indexOf("http");
// if(fdStart == 0){
//    console.log('url begins with http');
// }
// else if(fdStart == -1) {
//     console.log('url does not begin with http');
//      var head = 'http://' ;
//    url = head.concat(url);
//    console.log('url after concatenate', url);
// }
// 如果不是http开头end

   var path = system.args[2];

if(fs.makeDirectory(path))
  console.log('"'+path+'" was created.');

page.open(url, function(status) {
   var filename = url.replace(/[^a-z]+/ig,"");
   if ( status === "success" ) {
      console.log('page title'+ page.title);
      console.log(path+'/'+filename+'.jpg');
      page.render(path+'/'+filename+'.jpg');
   } else {
      console.log("Page failed to load.");
   }
   phantom.exit(0);
});
}
