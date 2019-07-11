/*
Notes:
RESTFUL-TODO-API
follow MVC-Model View Control: [DUC] - Data, UI, Code

Description: This is intended to be a basic web based ToDo application in which a user can:
    Create a To Do list item (with optional due date)
    Read from the To Do List or a item within item (Possibly organized by due date)
    Update an item within the To Do list, (resulting in an edited field)
    Delete an item from the list.
*/
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); //enable getting query from body

const tasks = [
    { id: 1, name: "task1"},
    { id: 2, name: "task2"},
    { id: 3, name: "task3"}
];

/*
Data schema:
(First just name, then implementing other features)
{
    "id": int ID
    "name" : string "name"
    "Description" : string "Description" (optional)
    "Creation date": date? "created"
    "Edited date":  date? ""(optional)
    "Due date":     date? ""(optional)
}
*/

function validateTask(task) {
    const schema = {
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3),
        due: Joi.date()
    };

    return Joi.validate(task, schema);
}

function validateJSON(json){
    /*Usage:
    const err = validateJSON(req.body)
    if(err) return res.status(400).send(err.message);
    */
    try {
        console.log("Trying!");
    JSON.parse(json);
    return;
    }    catch(err){
        console.log("Caught!");
        return err;
    }
}

app.post('/ToDo/list/', (req,res) => {
    /*
    Create -> POST /ToDo/list/
     -validate input via joi: min 3 characters, no data type besides the schema
      -on fail return 400
     -return input
    */
   /* Disabling faulty JSON validation
   const err = validateJSON(req.body);
   if(err) return res.status(400).send(err.message);
    */
    const { error: check } = validateTask(req.body);
   if (check) return res.status(400).send(check.details[0].message);
    var task = {
        id: tasks.length + 1,
        name: req.body.name
    }
    if (req.body.description) task.description = req.body.description;
    if (req.body.due) task.due = req.body.due;
    tasks.push(task);
    res.send(task);
});

app.get('/ToDo/list', (req,res)=>{
    /*
    Read List -> GET /ToDo/list/
     -validate list is not empty
      -on fail return "empty list"
     -return list
     */
    if(!tasks) return res.status(400).send("The task list is empty!");
    res.send(tasks);
});
 
app.get('/ToDo/list/:id', (req,res) => {
    /*
    Read Item -> GET /ToDo/list/#
     -validate item in list
      -on fail return "item does not exist"
     -return item
    */
   const task = tasks.find(t => t.id === parseInt(req.params.id));
   if(!task) return res.status(400).send("That id does not exist.");
   res.send(task);
});

app.put('/ToDo/list/:id', (req,res) => {
    //    Update -> Put /ToDo/list/#

    /*
     -validate input via joi: min 3 characters, no data type besides the schema (Done first b/c quicker than database access)
      -on fail return 400
    */
   /*
   const err = validateJSON(req.body);
   console.log(err);
   if(err) return res.status(400).send(err.message);
*/
    const { error: check } = validateTask(req.body);
    if (check) return res.status(400).send(check.details[0].message);

    /*
    -validate item in list
      -on fail return "item does not exist"
    */
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task) return res.status(400).send("That id does not exist.");

    /*
     -populate task with new request contents
     */
    
    if (req.body.description) task.description = req.body.description;
    if (req.body.due) task.due = req.body.due;
    task.edit = new Date();

    /*
     -return item
    */

    res.send(task);
});
    
app.delete('/ToDo/list/:id', (req,res) => {
    /*
    Delete -> Delete /ToDo/list/#
    */
    
    /*
    -validate item in list
     -on fail return "item does not exist"
    */
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task) return res.status(400).send("That id does not exist.");
    //-delete item
    const index = tasks.indexOf(task);
    tasks.splice(index,1);

    //-return item
    res.send(task);
});

//Spin up server based on Enviroment Var 'PORT' or use 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));