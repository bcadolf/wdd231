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
    <a href="#join">Join</a>
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
}

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
}

function createMemberList(member) {
    return `
        <div class="list">
                <h2>${member.name}</h2>
                <p><strong>Address:</strong> ${member.address} <strong>Phone:</strong> ${member.phone} <strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            </div>`
}
let cardView = true;

function displayMembers(members) {
    const membersContainer = directory;
    membersContainer.innerHTML = ''; // Clear previous content

    members.forEach(member => {
        membersContainer.innerHTML += cardView ? createMemberCard(member) : createMemberList(member);
    });
}

document.getElementById('grid').addEventListener('click', () => {
    const members = getMembersData();
    cardView = true; // Set view to card view
    displayMembers(members); // Refresh the view
});

document.getElementById('list').addEventListener('click', () => {
    const members = getMembersData();
    cardView = false; // Set view to list view
    displayMembers(members); // Refresh the view
});

// Initial display
getMembersData();
