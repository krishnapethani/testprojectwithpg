
const express = require("express");
const { password } = require("pg/lib/defaults");
const app=express();
const client=require("./db/databasepg.js");


app.use(express.json())


app.post("/api/register",  (req,res)  => {
    console.log(req.body);
    const today = new Date();
    const birthDate = new Date(req.body.DOB);
    const age = today.getFullYear() - birthDate.getFullYear();
    console.log("today",today );
    console.log("birthDate",birthDate);
    console.log("age",age);
    if(age<=14)
    {res.send("Age should be above 14 years" )}
    else{   
         const sql= `INSERT INTO register("name","email","password","city","DOB")
    VALUES('${req.body.name}','${req.body.email}','${req.body.password}','${req.body.city}','${req.body.DOB}')
`;

client.query(sql,(err,result)=>{
 if(err) console.log(err);
res.send("data registerd")
})
    }
})

app.get('/api/read',(req,res)=>{
    let sql=`SELECT * FROM register `;
    client.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result.rows);
    });
})








app.listen(8080,()=>{
    console.log("server is running on port 8080..");
});

client.connect();