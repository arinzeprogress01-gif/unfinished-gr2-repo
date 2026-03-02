console.log("ROUTER IS ACTIVE");

import express from "express";
import studentsList from '../stu-list-db.js';
const router = express.Router();

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
    const newStudent = { id: studentsList.length + 1, ...req.body }

    if (!newStudent.Name || !newStudent.Class || newStudent.payment === undefined) {
        return res.status(400).json({ "Error": "Missing required fields" });
    }
    studentsList.push(newStudent);
    res.status(201).json(newStudent);
});




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

    if (!req.body.Name || !req.body.Class || req.body.payment === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    };

    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

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
