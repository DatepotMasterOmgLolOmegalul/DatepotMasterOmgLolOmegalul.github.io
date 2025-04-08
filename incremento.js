let users = [];
let currentUser = null;

function setCurrentUser() {
    const username = document.getElementById('username').value.trim().toLowerCase();
    if (username) {
        currentUser = username;
        alert(`Usuário definido como: ${currentUser}`);
        document.getElementById('username').value = '';
    } else {
        alert("Por favor, insira um nome válido!");
    }
}

function addName() {
    const newUser = document.getElementById('newUser').value.trim().toLowerCase();
    if (newUser && !users.some(user => user.name === newUser)) {
        users.push({ name: newUser, hearts: [] });
        displayUsers();
        document.getElementById('newUser').value = '';
    } else {
        alert("Nome já existe ou está vazio!");
    }
}

function displayUsers() {
    const nameList = document.getElementById('nameList');
    nameList.innerHTML = '<h3>Usuários na Sala</h3>';
    
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('name-item');
        
        const userName = document.createElement('span');
        userName.textContent = capitalize(user.name);
        
        const heartButton = document.createElement('button');
        heartButton.textContent = '❤️';
        heartButton.onclick = () => clickHeart(user.name);

        userElement.appendChild(userName);
        userElement.appendChild(heartButton);
        
        nameList.appendChild(userElement);
    });
}

function clickHeart(targetName) {
    if (currentUser === null) {
        alert("Por favor, defina seu nome para começar.");
        return;
    }

    const targetUser = users.find(user => user.name === targetName);
    const user = users.find(user => user.name === currentUser);

    if (user && targetUser) {
        if (!user.hearts.includes(targetName)) {
            user.hearts.push(targetName);
            checkDatepot(targetUser, user);
        } else {
            alert("Você já clicou no coração dessa pessoa.");
        }
    }
}

function checkDatepot(targetUser, user) {
    if (targetUser.hearts.includes(user.name)) {
        const jackpotMessage = document.getElementById('jackpotMessage');
        const jackpotNames = document.getElementById('jackpotNames');
        jackpotMessage.style.display = 'flex';
        jackpotNames.textContent = `${capitalize(user.name)} e ${capitalize(targetUser.name)}`;
    }
}

function closeJackpot() {
    const jackpotMessage = document.getElementById('jackpotMessage');
    jackpotMessage.style.display = 'none';
}

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
