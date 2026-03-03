console.log("ROUTER IS ACTIVE");

import express from "express";
import studentsList from '../stu-list-db.js';

const router = express.Router(); // This line creates a new router object using the Router() method from the Express library. The router object is used to define routes for handling HTTP requests.

router.get("/studentsList", (req, res) => {
    res.status(200).json(studentsList);
}); 


router.get("/studentsList/:id", (req, res) => {
    const student = studentsList.find(s => s.id === parseInt(req.params.id));
    if (!student)
        return res.status(404).json({"Error": "NOT ON THE LIST"});
    res.status(200).json(student);
});



router.post("/studentsList", (req, res) => {
    const newStudent = { id: studentsList.length + 1, ...req.body };
    if (!newStudent.Name || !newStudent.Class || newStudent.payment === undefined || typeof newStudent.payment !== "boolean" /*!=="boolean" is used to check if the payment value is not a boolean. This ensures that the payment field must be either true or false, and prevents invalid data from being added to the studentsList.*/ ){
        return res.status(400).json({ "Error": "Missing required fields or invalid payment value" });
    } //
    studentsList.push(newStudent);
    res.status(201).json(newStudent);
});



//patch is used to update specific fields of a student, while put is used to replace the entire student object. In the patch route, we use Object.assign() to update only the fields provided in the request body, while in the put route, we create a new student object with all the required fields and replace the existing student in the studentsList array. Additionally, the put route checks for missing required fields and returns a 400 status code if any are missing, while the patch route does not have this validation since it allows for partial updates.
router.patch("/studentsList/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = studentsList.find(student => student.id === id);
    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }

    Object.assign(student, req.body);

    res.status(200).json(student);
});




router.put("/studentsList/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = studentsList.findIndex(student => student.id === id);
//findIndex is used to find the index of the student in the studentsList array based on the provided id. This allows us to update the specific student at that index with the new data from the request body. If the student is not found, it returns a 404 status code with an error message. If the required fields are missing or if the payment value is not a boolean, it returns a 400 status code with an error message. Otherwise, it updates the student and returns the updated student object with a 200 status code.
    if (!req.body.Name || !req.body.Class || req.body.payment === undefined || typeof req.body.payment !== "boolean") {
        return res.status(400).json({ error: "Missing required fields or invalid payment value" });
    };

    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }
//index === -1 is used to check if the student with the specified id was found in the studentsList array. If findIndex returns -1, it means that no student with the given id exists in the array, and we return a 404 status code with an error message indicating that the student was not found. If the student is found, we proceed to update the student's information with the new data from the request body.
    studentsList[index] = {
        id: id,
        Name: req.body.Name,
        Class: req.body.Class,
        payment: req.body.payment
    };

    res.status(200).json(studentsList[index]);
});




router.delete("/studentsList/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = studentsList.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    studentsList.splice(index, 1);
    res.status(200).json({ message: "Student deleted successfully" });
}); 

export default router;

