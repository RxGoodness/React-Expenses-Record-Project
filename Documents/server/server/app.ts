import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs, { readFile, truncate } from "fs";
import {v4 as uuidv4} from "uuid";
import { UsersInterface } from "./interface";
/*
implement your server code here
*/

const filePath = '/Users/decagon/Documents/Week-5-Task/week-5-node-010-RxGoodness/server/server/database.json';
const dataExists = fs.existsSync(filePath)
if(dataExists === false) {
  fs.writeFileSync(filePath, '[]')
}
const idMatch = /\/api\/id\/([A-Za-z0-9]+)/

const database = JSON.parse(fs.readFileSync(filePath, "utf8"))
export const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  
    if(req.url === '/' && req.method === "GET") {
        fs.readFile(filePath, 'utf8', (err, content) => {
          let data = JSON.parse(content);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify(data, null, 2));
          res.end();
        })
    } 
    else if(req.url === '/:id' && req.method === "GET") {
      let dataExists = fs.existsSync(filePath)
      if(dataExists === true) {
        fs.readFile(filePath, "utf-8", (error, content) => {
          let data = JSON.parse(content);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify(data, null, 2))
          res.end()
        });
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify("Please enter your details and send in a post request"))
        res.end();
      }
    } 

    else if(req.url === '/api/' && req.method === "POST") {
        const data: string[] | any = [];
        const dataParsed: string[] = [];
        req.on('data', (chunk) => {
            // Storing the chunk data
            data.push(chunk);
        });
        req.on('end', () => {
          // Parsing the chunk data
          const parsedBody = Buffer.concat(data).toString();

          let pairdData = JSON.parse(parsedBody);

          let userData = {userId: uuidv4(), ...pairdData} 
          dataParsed.push(userData);

          fs.readFile(filePath, 'utf8', function(err, data){
            let readData = JSON.parse(data);
            readData.push(userData);
            fs.writeFileSync(filePath, JSON.stringify(readData, null, 2), "utf8");
          })

        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(userData, null, 2))
        res.end();
        });

    } else if(req.url?.match(idMatch) && req.method === "PUT") {
      // Update data using the dynamically generated userId
      const id: any = req.url.split("/")[3]; 
      
      const operationData: any = id;
      const data: string[] | any = [];
        const dataParsed: string[] = [];
        req.on('data', (chunk) => {
            // Storing the chunk data
            data.push(chunk);
        });
        req.on('end', () => {
          const dataUpdate = Buffer.concat(data).toString(); 
          let newDate = new Date();
          let updatedInfo = JSON.parse(dataUpdate);
          // Get the data required from the Updated info
          const {  userId, organization, createdAt, updatedAt, products, marketValue, address, country, id, noOfEmployees, employees } = updatedInfo 
          let detailsData: UsersInterface | any = {
            userId: userId || updatedInfo.userId,
            organization: organization || updatedInfo.organization,
            createdAt: createdAt || updatedInfo.createdAt,
            updatedAt: newDate.toISOString(),
            products: products || updatedInfo.products,
            marketValue: marketValue || updatedInfo.marketValue,
            address: address || updatedInfo.address,
            country: country || updatedInfo.country,
            id: id || updatedInfo.id,
            noOfEmployees: noOfEmployees || updatedInfo.noOfEmployees,
            employees: employees || updatedInfo.employees
          }
       
          database.forEach((item: { [x: string]: string; }, index: string | number) => {
            if (item['userId'] == operationData){
              database[index] = detailsData;
              fs.writeFile(filePath, JSON.stringify(database, null, 2), 'utf8', err => console.log(err));
            }
          });

        // res.setHeader('Location', '/api');
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(detailsData, null, 2))
        res.end();
        });
      
    }  else if(req.url?.match(idMatch) && req.method === "DELETE") {
      // Delete data using the dynamically generated userId
      const id: any = req.url.split("/")[3]; 
      console.log(id)
      
      const operationData: any = id;

      database.forEach((item: { [x: string]: string; }, index: string | number) => {
        if (item['userId'] == operationData){
        const detailsData = database.splice(index, 1) ;
        fs.writeFile(filePath, JSON.stringify(database, null, 2), 'utf8', err => console.log(err));
        // const detailsData = database.splice(index, 1)
      }});
      res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(database, null, 2))
        res.end()
      
        
        // JSON.stringify({message: "Data successfully deleted"}))
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "There is an error somewhere or data is not existing" }));
      }
  }
);

server.listen(3100)

