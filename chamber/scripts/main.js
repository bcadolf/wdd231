// used in footer to establish dates for copyright and when modified. 
const currentyear = document.getElementById('currentyear');
const lastModified = document.getElementById('lastModified');
const today = new Date();

currentyear.textContent = today.getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', () => {
    const navigation = document.getElementById('navigation');

    const links1 = `
    <a href="index.html">Home</a>
    <a href="#discover">Discover</a>
    <a href="directory.html">Directory</a>
    <a href="join.html">Join</a>
  `;

    const links2 = `
    <a href="index.html">Home</a>
    <a href="#about">About</a>
    <a href="#podcast">Podcast</a>
    <a href="#events">Events</a>
  `;

    navigation.innerHTML = (navigation.innerHTML === links1) ? links2 : links1
    navToggle.classList.toggle('inverse')
});



// member card for the directory and other pages
const directory = document.getElementById('directory');
const memberData = 'https://bcadolf.github.io/wdd231/chamber/data/members.json';


async function getMembersData() {
    const response = await fetch(memberData);
    const data = await response.json();

    displayMembers(data.members);
};

function createMemberCard(member) {
    return `
            <div class="card">
                <img src="${member.image}" alt="${member.name}">
                <h2>${member.name}</h2>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
            </div>
        `;
};

function createMemberList(member) {
    return `
        <div class="list">
                <h2>${member.name}</h2>
                <p><strong>Address:</strong> ${member.address} <strong>Phone:</strong> ${member.phone} <strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            </div>`
};

let cardView = true;

function displayMembers(members) {
    const membersContainer = directory;
    membersContainer.innerHTML = ''; // Clear previous content

    members.forEach(member => {
        membersContainer.innerHTML += cardView ? createMemberCard(member) : createMemberList(member);
    });
};
const grid = document.getElementById('grid');
const list = document.getElementById('list');
if (grid) {
    grid.addEventListener('click', () => {
        const members = getMembersData();
        cardView = true; // Set view to card view
        displayMembers(members); // Refresh the view
    });
};
if (list) {
    list.addEventListener('click', () => {
        const members = getMembersData();
        cardView = false; // Set view to list view
        displayMembers(members); // Refresh the view
    });
};

// Initial display
getMembersData();


// weather api 

const currentTemp = document.getElementById('currentTemp');
const weatherIcon = document.getElementById('weatherIcon');
const weatherDesc = document.querySelector('figcaption');
const urlToday = 'https://api.openweathermap.org/data/2.5/weather?lat=37.5407&lon=-77.4360&appid=5798cd2611c6e48b6ad7cedaf22ec77e&units=imperial';

async function apiWeather() {
    try {
        const response = await fetch(urlToday);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    };
};

// call api
apiWeather();
if (currentTemp) {
    function displayResults(data) {
        currentTemp.textContent = `${data.main.temp}`;
        const iconscr = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
        let desc = data.weather[0].description;
        weatherIcon.setAttribute('src', iconscr);
        weatherIcon.setAttribute('alt', iconscr);
        weatherDesc.textContent = `${desc}`;
    };

};
// const weekday = today.
// let futureTemp = document.createElement()
const url3day = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=37.5407&lon=-77.4360&appid=5798cd2611c6e48b6ad7cedaf22ec77e&cnt=3";


// join page modals

const membershipTiers = [
    {
        "name": "non-profit",
        "price": 0,
        "benefit": "Access to basic resources and networking opportunities."
    },
    {
        "name": "bronze",
        "price": 15,
        "benefit": "Includes non-profit benefits plus quarterly newsletters and event discounts."
    },
    {
        "name": "silver",
        "price": 30,
        "benefit": "Includes bronze benefits plus premium content and early event registration."
    },
    {
        "name": "gold",
        "price": 50,
        "benefit": "Includes silver benefits plus VIP event access and personalized support."
    }
];

document.querySelectorAll('.membership-btn').forEach(button => {
    button.addEventListener('click', event => {
        const membershipType = event.target.getAttribute('data-type');
        const membership = membershipTiers.find(tier => tier.name === membershipType);
        const modal = document.getElementById('membership-modal');
        const modalBody = document.getElementById('mem-body');

        modalBody.innerHTML = `
            <tr>
                <th colspan="2">${membership.name.charAt(0).toUpperCase() + membership.name.slice(1)} Membership</th>
            </tr>
            <tr>
                <td>Price:</td>
                <td>$${membership.price}</td>
            </tr>
            <tr>
                <td>Benefit:</td>
                <td>${membership.benefit}</td>
            </tr>
        `;

        modal.showModal();

        document.querySelector('.close-button').addEventListener('click', () => {
            modal.close();
        });
    });
});

