let http = require("http");
let fs = require("fs")
let nodemailer = require('nodemailer')
let {parse} = require('querystring')

let server = http.createServer((req, res) => {
    if (req.method === "POST") { 
        let encoded_url = "application/x-www-form-urlencoded"
        if (req.headers['content-type'] === encoded_url) {
            let body = "";
            req.on("data", chunk => {
                body += chunk;

            })

            req.on('end', _ => {
                res.writeHead(201, "created", { "content-type": "text/html" })
                let parsedbody = parse(body);
                let {email} = parsedbody
                let transporter = nodemailer.createTransport({
                  service: "gmail",

                  auth: {
                      user: "manihoogar328@gmail.com",
                      pass:"manijhansi@3"
                  },
                });
                const options = {
                  from: "manihoogar328@gmail.com",
                  to: `${email}`,
                  subject: "email subscription from nagamani",
                  html: `<h1>hey im nagamani</h1>
                    <p>i want to test this application so sending this</p>`,
                };

                transporter.sendMail(options, err => {
                    if (err) throw err
                    console.log("successfully mail sent")
                    res.end('<h1 style ="color:crimson;font-size:70px ;margin:100px 500px" >Thank you for subscription</h1>')
                })
            })

            
        }
        else {
            res.end(null)
        }

    }
    else {
        if (req.url === "" || req.url === "/") {
          res.writeHead(200, "ok", { "content-type": "text/html" });
          fs.createReadStream("./index.html", "utf-8").pipe(res);
        }
            else if (req.url === "/stylesheet") {
             res.writeHead(200, "ok", { "content-type": "text/css" });
            fs.createReadStream("./style.css", "utf-8").pipe(res);
        }
        else {
            res.writeHead(404, "page not found", { "content-type": "text/html" })
            res.end('<h1 style = "color:blue">page not found</h1>')
            
        }
    }
});
server.listen(4000, err => {
    if (err) throw err
    console.log('server is running.....')
})