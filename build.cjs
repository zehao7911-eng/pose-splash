const fs=require('node:fs'), path=require('node:path');
const root=__dirname;
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const modules=['core.mjs','sdk.mjs','view.mjs','app.mjs'];
const code=modules.map(name=>read(name).replace(/^\s*import .+?;\r?$/gm,'').replace(/^export /gm,'')).join('\n');
const html=read('index-source.html')
 .replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+read('style.css')+'</style>')
 .replace('<script src="vendor/three.min.js"></script>',()=>'<script>'+read('vendor/three.min.js').replace(/<\/script/gi,'<\\/script')+'</script>')
 .replace('<script type="module" src="app.mjs"></script>',()=>'<script>(()=>{\n'+code+'\n})();</script>');
for(const name of ['index.html','standalone.html'])fs.writeFileSync(path.join(root,name),html);
console.log('Standalone build: '+Buffer.byteLength(html)+' bytes');

