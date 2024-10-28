
    
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sEndereco = document.querySelector('#m-endereco');
const sSalario = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');

let itens;
let id;

function openModal(edit = false, index = 0) {
    modal.classList.add('active');

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active');
        }
    };

    if (edit) {
        sNome.value = itens[index].nome;
        sEndereco.value = itens[index].endereco;
        sSalario.value = itens[index].salario;
        id = index;
    } else {
        sNome.value = '';
        sEndereco.value = '';
        sSalario.value = '';
    }
}

function editItem(index) {
    openModal(true, index);
}

function deleteItem(index) {
    itens.splice(index, 1);
    setItensBD();
    loadItens();
}

function insertItem(item, index) {
    let tr = document.createElement('tr');

    const dica = getDicaConsumo(item.salario);

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.endereco}</td>
        <td>R$ ${item.salario}</td>
        <td>${dica}</td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class='bx bx-edit'></i>Editar</button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i>Excluir</button>
        </td>
    `;
    tbody.appendChild(tr);
}

function getDicaConsumo(salario) {
    if (salario < 50) {
        return "Consumo baixo - Continue assim!";
    } else if (salario >= 50 && salario <= 100) {
        return "Consumo moderado - Verifique possíveis vazamentos.";
    } else if (salario > 100 && salario <= 200) {
        return "Consumo alto - Reduza o tempo de banho e reutilize água.";
    } else {
        return "Consumo muito alto - Considere instalar redutores de vazão.";
    }
}

btnSalvar.onclick = e => {
    if (sNome.value === '' || sEndereco.value === '' || sSalario.value === '') {
        return;
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = sNome.value;
        itens[id].endereco = sEndereco.value;
        itens[id].salario = sSalario.value;
    } else {
        itens.push({'nome': sNome.value, 'endereco': sEndereco.value, 'salario': sSalario.value});
    }

    setItensBD();
    modal.classList.remove('active');
    loadItens();
    id = undefined;
}

function loadItens() {
    itens = getItensBD();
    tbody.innerHTML = '';
    itens.forEach((item, index) => {
        insertItem(item, index);
    });
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

loadItens();



let ul = document.querySelector('nav .ul');

function openMenu(){
    ul.classList.add('open');

}

function closeMenu(){
    ul.classList.remove('open');

}

function enviarFormulario() {
    // Captura os valores do formulário
    var nome = document.getElementById("nome1").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var valorAgua = document.getElementById("valor-agua").value;

    // Redireciona para o outro arquivo com os dados na URL
    window.location.href = "perfil.html";
}

let count = 1;
document.getElementById('radio1').checked = true;

setInterval(function(){
    nextImage();
},5000);

function nextImage(){
   count++;
   if(count>4){
        count = 1;
   }

   document.getElementById('radio'+count).checked = true;

}

function changeUsername() {
        var novoNome = prompt("Por favor, insira o novo nome:");
        if (novoNome) {
            document.getElementById("username").innerText = novoNome;
        }
    }
