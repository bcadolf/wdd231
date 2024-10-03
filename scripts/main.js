// used in footer to establish dates for copyright and when modified. 
const currentyear = document.getElementById('currentyear');
const lastModified = document.getElementById('lastModified');
const today = new Date();

currentyear.textContent = today.getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

// navigation button in mobile view toggle to view/hide
const hamMenu = document.getElementById('hamMenu');
const navdiv = document.getElementById('navdiv');

hamMenu.addEventListener('click', () => {
    navdiv.classList.toggle('open');
});


// copied content for course array as part of class assignment
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]
// end of copied content

// course cards creation
function courseCard(courses) {
    const table = document.createElement('table');

    table.innerHTML = ` <tr>
            <th colspan="2">${courses.title}</th>
            </tr>
            <tr>
                <td colspan="2">${courses.subject} ${courses.number}</td>
            </tr>
            <tr>
                <td>Credits:</td>
                <td>${courses.credits}</td>
            </tr>
            <tr>
                <td>Certificate:</td>
                <td>${courses.certificate}</td>
            </tr>
            <tr>
                <td colspan="2">${courses.description}</td>
            </tr>
            <tr>
                <td>Programming Language(s) Used:</td>
                <td>${courses.technology}</td>
            </tr>`;


    return table
};

// create course buttons and load them to the page with the options to dynaicmally filter which are displayed.
function buttons(courses) {
    const button = document.createElement('button');
    button.innerHTML = `${courses.subject} ${courses.number}`;
    if (courses.completed) {
        button.classList.add('done');
    } else if (!courses.completed) {
        button.classList.add('need');
    };
    button.id = courses.number
    return button
};



function loadButtons(filter) {
    const div = document.getElementById('courses')

    div.innerHTML = "";
    let num = 0
    courses
        .filter(filter)
        .forEach(button => {
            const createButton = buttons(button);
            div.appendChild(createButton);

            if (button.completed) {
                num = num + button.credits;
            };

        });
    const creditCount = document.getElementById('creditCount');
    creditCount.textContent = num
};

// script used to listen for which buttons to load based on user selection and also the default load option
document.getElementById('all').addEventListener('click', () => loadButtons(() => true));
document.getElementById('cse').addEventListener('click', () => loadButtons(courses => courses.subject == 'CSE'));
document.getElementById('wdd').addEventListener('click', () => loadButtons(courses => courses.subject == 'WDD'));
loadButtons(() => true)

// total up the visible courses credits


// script to load detailed course cards upon button selection.
// document.getElementById('110').addEventListener('click', () => courseCard(courses => courses.number == 110));
