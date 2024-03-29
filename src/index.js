const express = require("express");
const Joi = require('joi');
const app = express();
app.use(express.json());

const courses = [
  { id : 1, name :'PHP'},
  { id : 2, name : 'MYSQL'},
  { id : 3, name : 'REACT'},
  { id : 4, name : 'EXPRESS'},
  { id : 5, name : 'NODE JS'},
]
app.get("/",(req, res) => {
  res.send("Hello World");
});


app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {

  // validate
  // If Invalid Return 400- Bad request
  const { error } = validateCourse(req.body); //result.error
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name : req.body.name
  };

  courses.push(course);
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with the given id not found.');
  res.send(course);
});

app.get('/api/cources/:year/:month', (req, res) => {
   res.send(req.params);
  // res.send(req.query);
});

app.put('/api/courses/:id', (req, res) => {

   // look up the courses
   // if not existing return 404
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('The course with the given id not found.');

   // validate
   // If Invalid Return 400- Bad request
   const { error } = validateCourse(req.body); //result.error
   if(error){
     res.status(400).send(error.details[0].message);
     return;
   }

   // Update course
   // Return Updated Course
   course.name = req.body.name;
   res.send(course);
});

function validateCourse(course){
  const schema = {name : Joi.string().min(3).required()};
  return Joi.validate(course, schema);
}


app.delete('/api/courses/:id', (req, res) => {

   // look up the courses
   // if not existing return 404
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('The course with the given id not found.');

   // delete
   const index = courses.indexOf(course);
   courses.splice(index, 1);

   res.send(courses);

});

function validateCourse(course){
  const schema = {name : Joi.string().min(3).required()};
  return Joi.validate(course, schema);
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening port ${port}"));
