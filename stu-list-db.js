let studentsList = [
    { id: 1, Name: 'Elizabeth Jess', Class: 'apple1', payment: false  },
    { id: 2, Name: 'Lizzy John', Class: 'apple2', payment: false },
    { id: 3, Name: 'Zion Taddy', Class: 'apple3', payment: false },
    { id: 4, Name: 'Kevin Trap', Class: 'apple4', payment: false },
    { id: 5, Name: 'Higgs Naiomi', Class: 'apple5', payment: false },
    { id: 6, Name: 'joyce Page', Class: 'apple6', payment: false }
];

export default studentsList;

/*export default means that this module (file) will export the studentsList variable as the default export. This allows other files to import this list of students using an import statement without needing to specify a named export. For example, another file could import this list using: import studentsList from './stu-list-db.js';*/