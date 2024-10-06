// used in footer to establish dates for copyright and when modified. 
const currentyear = document.getElementById('currentyear');
const lastModified = document.getElementById('lastModified');
const today = new Date();

currentyear.textContent = today.getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

// member card for the directory and other pages
const directory = document.getElementById('directory');
const gridType = document.createElement('button');
const memberData = 'https://bcadolf.github.io/wdd231/chamber/data/members.json';


async function getMembersData() {
    const response = await fetch(memberData);
    const data = await response.json();
    console.table(data.members);

    // displayMembers(data.members)
}

getMembersData()

function createCard(data) {
    const memberCard = document.createElement('div')
    memberCard.classList.add = 'card'

    memberCard.innerHTML = ``
}

const memberList = document.createElement('div')

memberList.classList.add = 'list'