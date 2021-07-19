import os 

lang = input("语言:")
title = input("标题:")

html = os.open("index.html",os.O_CREAT|os.O_WRONLY)
htm = '''<!DOCTYPE html>
<html lang="'''+lang+'''">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>'''+title+'''</title>
        <link rel="stylesheet" href="style.css" />
        <script src="index.js"></script>
    </head>
    <body>
        
    </body>
</html>
'''
ret = os.write(html,bytes(htm, 'UTF-8'))
os.close(html)

c = os.open("style.css",os.O_CREAT|os.O_WRONLY)
css = '''* {
    padding: 0;
    margin: 0;
    line-height: 1em;
}
'''
ret = os.write(c,bytes(css, 'UTF-8'))
os.close(c)

j = os.open("index.js",os.O_CREAT|os.O_WRONLY)
js = '''
let a = function() {

};

a();
'''
ret = os.write(j,bytes(js, 'UTF-8'))
os.close(j)
print("创建成功")