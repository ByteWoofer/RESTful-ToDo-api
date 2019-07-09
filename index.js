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

app.post('/ToDo/list/', (req,res) => {
    /*
    Create -> POST /ToDo/list/
     -validate input via joi: min 3 characters, no data type besides the schema
      -on fail return 400
     -return input
    */
});

app.get('/ToDo/list', (req,res)=>{
    /*
    Read List -> GET /ToDo/list/
     -validate list is not empty
      -on fail return "empty list"
     -return list
     */
});

app.get('/ToDo/list/:id', (req,res) => {
    /*
    Read Item -> GET /ToDo/list/#
     -validate item in list
      -on fail return "item does not exist"
     -return item
    */
});

app.put('/ToDo/list/:id', (req,res) => {
    /*
    Update -> Put /ToDo/list/#
     -validate input via joi: min 3 characters, no data type besides the schema (Done first b/c quicker than database access)
      -on fail return 400
     -validate item in list
      -on fail return "item does not exist"
     -Add to list
     -return item
    */
});
    
app.delete('/ToDo/list/:id', (req,res) => {
    /*
    Delete -> Delete /ToDo/list/#
    -validate item in list
     -on fail return "item does not exist"
    -delete item
    -return item
    */
});

//Spin up server based on Enviroment Var 'PORT' or use 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));