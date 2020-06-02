  const fs=require('fs');

  const requestHandler = (req,res)=>{
  
  const url = req.url;
    const method=req.method;

    if(url=='/') {
        res.write('<html>');
        res.write('<head><title> Test routes </title></head>');
        res.write('<body>');
        res.write('<form action="/message" method = "POST"><input type="text" name="message">')
        res.write('<button type="submit">Send</button></form>')
        res.write('</body>');
        res.write('</html>');
        return res.end();
        
    }
    if(url === '/message' && method === 'POST')
    {
        const body=[]; //data chunk ke form mai aa raha wse aarrray mai daal raha
        req.on('data',(chunk)=> {
            body.push(chunk);
        });
        //data ko ab string mai convert kar raha
        req.on('end',()=> {
            const msg = Buffer.concat(body).toString();
            const finalMsg=msg.split('=')[1];
            fs.writeFile('message.txt',finalMsg,(err)=> {
            res.statusCode=302;
            res.setHeader('Location','/');
            return res.end();
            });
            

        });
        
    }
  };

 module.exports = {
     handler : requestHandler,
     text: "HArd coded text",
 };