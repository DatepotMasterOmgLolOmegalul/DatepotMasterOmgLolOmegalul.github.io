let usuarios = [];
let usuarioAtual = null;

const shineAudio = new Audio('shine.mp3');
const jackpotAudio = new Audio('jackpot.mp3');
const som1Audio = new Audio('som1.mp3');

function definirUsuario() {
    const nome = document.getElementById('username').value.trim().toLowerCase();
    if (nome) {
        usuarioAtual = nome;
        alert(`Usuário definido como ${usuarioAtual}`);
        document.getElementById('username').value = '';
        som1Audio.play();
    } else {
        alert("Por favor, insira um nome válido");
    }
}

function adionadordenome() {
    const novoNome = document.getElementById('newUser').value.trim().toLowerCase();
    if (novoNome && !usuarios.some(u => u.nome === novoNome)) {
        usuarios.push({ nome: novoNome, coracoes: [] });
        mostrarUsuarios();
        document.getElementById('newUser').value = '';
    } else {
        alert("Nome já existe ou está vazio");
    }
}

function mostrarUsuarios() {
    const listaUsuarios = document.getElementById('nameList');
    listaUsuarios.innerHTML = '<h3>Usuários na Sala</h3>';
    
    usuarios.forEach(usuario => {
        const elemento = document.createElement('div');
        elemento.classList.add('name-item');
        
        const nomeSpan = document.createElement('span');
        nomeSpan.textContent = capitalizar(usuario.nome);
        
        const botaoCoracao = document.createElement('button');
        botaoCoracao.textContent = '❤️';
        botaoCoracao.onclick = () => clicarCoracao(usuario.nome);

        elemento.appendChild(nomeSpan);
        elemento.appendChild(botaoCoracao);
        
        listaUsuarios.appendChild(elemento);
    });
}

function clicarCoracao(nomeAlvo) {
    if (usuarioAtual === null) {
        alert("Por favor, defina seu nome para começar");
        return;
    }

    const alvo = usuarios.find(u => u.nome === nomeAlvo);
    const usuario = usuarios.find(u => u.nome === usuarioAtual);

    if (usuario && alvo) {
        if (!usuario.coracoes.includes(nomeAlvo)) {
            usuario.coracoes.push(nomeAlvo);
            verificarDatepot(alvo, usuario);
            shineAudio.play();
        } else {
            alert("Você já clicou no coração dessa pessoa");
        }
    }
}

function verificarDatepot(alvo, usuario) {
    if (alvo.coracoes.includes(usuario.nome)) {
        const mensagem = document.getElementById('jackpotMessage');
        const nomes = document.getElementById('jackpotNames');
        mensagem.style.display = 'flex';
        nomes.textContent = `${capitalizar(usuario.nome)} e ${capitalizar(alvo.nome)}`;
        jackpotAudio.play();
    }
}

function fecharDatepot() {
    const mensagem = document.getElementById('jackpotMessage');
    mensagem.style.display = 'none';
}

function capitalizar(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
}
