const express = require("express");
const app = express();
const mysql = require('mysql2');
const path = require('path');
const moment = require('moment');
var uniqid = require('uniqid'); 

let port = 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.urlencoded({extended:true}));

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'college',
    password: 'Ratnesh@2345',
});

let roll = "0207";
let currentyear = "2024";
let brnch = "CS";




app.listen(port, () => {
    console.log("We are on ", 4000);
})

app.get("/",(req, res)=>{
    res.render("home.ejs");
     
        
          
})

app.get("/home", (req, res)=>{
    res.render("Dashboard.ejs");
})

app.get("/sem/:sem", (req, res)=>{
    let {sem} = (req.params);
    sem = sem - 0;
    console.log(sem);

    let q = "SELECT * FROM sem_?";
console.log(typeof(sem));
        try {
            connection.query(q,sem, (err, result) => {
                if (err) throw err;
                students = result;
                console.log(result);

                res.render("sem.ejs", { students });
            })
    
        } catch (err) {
            console.log(err);
        };
   
})
app.get("/:s/student/:r", (req, res)=>{
    let {s, r} = (req.params);
    s = s-0;
       console.log(s);
       console.log(r);
    
        let q = "SELECT * FROM sem_? WHERE rollno = ?";
       
        connection.query(q, [s, r], (err, result) => {
            if(err) console.log(err);
            console.log(result);
            let student = result[0];
            res.render("detail.ejs", {student});
            }) 
})
app.get("/:s/student/:r/edit", (req, res)=>{
    let {s, r} = (req.params);
    s = s-0;
       console.log(s);
       console.log(r);
    
        let q = "SELECT * FROM sem_? WHERE rollno = ?";
       
        connection.query(q, [s, r], (err, result) => {
            if(err) console.log(err);
            console.log(result);
            console.log(result[0]);
            student = result[0];
            res.render("edit.ejs", {student});
            }) 
})
app.get("/:s/student/:r/edit", (req, res)=>{
    let {s, r} = (req.params);
    s = s-0;
       console.log(s);
       console.log(r);
    
        let q = "SELECT * FROM sem_? WHERE rollno = ?";
       
        connection.query(q, [s, r], (err, result) => {
            if(err) console.log(err);
            console.log(result);
            
           
            res.render("edit.ejs", {student});
            }) 
})
app.patch("/:s/student/:r/edit", (req, res)=>{
    let { first_name, last_name, email, phone_number, dob, address, branch}  = (req.body);
    let {s, r} = (req.params);
    s = s-0;
    // dob = new Date(dob);  

    phone_number = phone_number -0;
   
   
// console.log(first_name, last_name, email, phone_number, dob, address, sem, branch);
    
     
    
        let q = "update sem_? set first_name = ?, last_name = ?,email = ?, phone_number = ?,  address =?, branch = ? where rollno = ?";
       
        connection.query(q, [s,  first_name, last_name, email, phone_number,  address, branch, r], (err, result) => {
            if(err) console.log(err);
            console.log(result);
            
            let link = "/sem/" + s;
            
            res.redirect(link);
            }) 
})
app.get("/newstudent/:s", (req, res)=>{
    
    let {s} = (req.params);
    s = s-0;
    // console.log(s);
    res.render("newstudent.ejs", {s});
   
})
app.post("/newstudent/:s", (req, res)=>{
    let {s} = (req.params);
    s = s-0;
    console.log(s);
    let count = 0;
   
    let q = "SELECT count(rollno) as total FROM sem_?";
  try {
            connection.query(q, s, (err, result) => {
                if (err) throw err;
            //  res.send(result[0].count(rollno));
          count = +result[0].total;
           count  = count + 1;
          
        //    console.log(roll.concat(brnch.concat(count)));
                  })
    
        } catch (err) {
            console.log(err);
        };
       

    let { first_name, last_name, email, phone_number, dob, address, branch}  = (req.body);
    
   
        rollno= roll.concat(brnch.concat(count));
        first_name= req.body.first_name;
        last_name= req.body.last_name;
        dob=req.body.dob;
        branch= req.body.branch;
        sem= s;
        email= req.body.email;
        phone_number= req.body.phone_number;
        address= req.body.address;
 
    
    
         q = "INSERT INTO sem_1 (rollno, first_name, last_name, email, phone_number, dob, address, sem, branch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        connection.query(q, [rollno, first_name, last_name, email, phone_number, dob, address, sem, branch], (err, result) => {
    if (err) {
        console.log(err);
        return res.status(500).send('Error inserting student data');
    }

    console.log(result);
    res.redirect("/");
});
})



// app.get("/", (req, res) => {

//     let users = [];

//     let q = "SELECT * FROM user";

//     try {
//         connection.query(q, (err, result) => {
//             if (err) throw err;
//             users = result;
//             res.render("home.ejs", { users });
//         })

//     } catch (err) {
//         console.log(err);
//     };
// })

// app.get("/user/:id/edit", (req, res) => {

//     let {id} = (req.params);
//     console.log(id);

//     let q = "SELECT * FROM user WHERE id = ?";
   
//     connection.query(q, [id], (err, result) => {
//         if(err) console.log(err);
//         console.log(result);
//         user = result[0];
//         res.render("edit.ejs", {user : result});
//         }) 
// })
// app.post("/user/:id/edit", (req, res)=>{
//     let {id} = (req.params);
//     console.log(id);

//     let newUsername = req.body.newu;
//     console.log(newUsername);

//     let q = "UPDATE user SET username = ? WHERE id = ?";
  
//     connection.query(q, [newUsername, id], (err, result) => {
//         if(err) console.log(err);
//         console.log(result);
//         res.redirect("/");
        
//         }) 
// })
// app.delete("/user/:id/delete",(req, res)=>{

//     let {id} = (req.params);
//     console.log(id);

//     let q = "DELETE FROM user WHERE id = ?";
  
//     connection.query(q, [id], (err, result) => {
//         if(err) console.log(err);
//         console.log(result);
//         res.redirect("/");
        
//         }) 
// })

// app.get("/user/new", (req, res)=>{
//     res.render("new.ejs");
// })
// app.post("/user/new", (req, res)=>{
//     let id = uniqid();
//     console.log(id);

//     let username = req.body.username;
//     let email = req.body.email;
//     let password = req.body.password;

//     let user = {
//         username: username,
//         email: email,
//         password: password
//     }
//     console.log(user);


//     let q = "INSERT INTO user (id, username, email, password) VALUES (?,?,?,?)";
  
//     connection.query(q, [id, username, email, password], (err, result) => {
//         if(err) console.log(err);
//         console.log(result);
//         res.redirect("/");
//         }) 
// })
// app.get("/user/search", (req, res)=>{
//     let {search} = req.query;
//     console.log(search);
//     let q = "SELECT * FROM user WHERE username = ?";
  
//     connection.query(q, [search], (err, result) => {
//         if(err) console.log(err);
//         if(result.length == 0)
//         {
//             res.send("No user found");
//         }
//         else{
//             console.log(result);
//         }
        
//         res.render("result.ejs", {user: result});
        
//         }) 
// })

// app.get("/user/:id", (req, res) => {
//     let { id } = req.params;
//     console.log("User ID: ", id);

//     let q = "SELECT * FROM user WHERE id = ?";

//     connection.query(q, [id], (err, result) => {
        

//         console.log("Query Result: ", result);
//         // Send the result as JSON or render a page
//     });
// });

