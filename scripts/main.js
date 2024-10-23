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


function buttons(course, index) {
    const button = document.createElement('button');
    button.innerHTML = `${course.subject} ${course.number}`;
    button.classList.add(course.completed ? 'done' : 'need');
    button.classList.add('modalButton');
    button.setAttribute('data-id', index);
    return button;
}

function loadButtons(filter) {
    const div = document.getElementById('courses');
    div.innerHTML = "";
    let num = 0;

    courses
        .filter(filter)
        .forEach((course, index) => {
            const createButton = buttons(course, index);
            div.appendChild(createButton);
            if (course.completed) {
                num += course.credits;
            }
        });

    const creditCount = document.getElementById('creditCount');
    if (creditCount) {
        creditCount.textContent = num;
    }


    document.querySelectorAll('.modalButton').forEach(button => {
        button.addEventListener('click', event => {
            const courseId = event.target.getAttribute('data-id');
            const course = courses[courseId];
            const modal = document.querySelector('.modal');
            const modalBody = document.getElementById('modal-body');

            function createModal(course) {
                modalBody.innerHTML = `
                    <tr>
                        <th colspan="2">${course.title}</th>
                    </tr>
                    <tr>
                        <td colspan="2">${course.subject} ${course.number}</td>
                    </tr>
                    <tr>
                        <td>Credits:</td>
                        <td>${course.credits}</td>
                    </tr>
                    <tr>
                        <td>Certificate:</td>
                        <td>${course.certificate}</td>
                    </tr>
                    <tr>
                        <td colspan="2">${course.description}</td>
                    </tr>
                    <tr>
                        <td>Programming Language(s) Used:</td>
                        <td>${course.technology}</td>
                    </tr>`;
            }

            createModal(course);
            modal.showModal();

            document.querySelector('.close-button').addEventListener('click', () => {
                modal.close();
            });
        });
    });
}

document.getElementById('all').addEventListener('click', () => loadButtons(() => true));
document.getElementById('cse').addEventListener('click', () => loadButtons(course => course.subject === 'CSE'));
document.getElementById('wdd').addEventListener('click', () => loadButtons(course => course.subject === 'WDD'));
loadButtons(() => true);
