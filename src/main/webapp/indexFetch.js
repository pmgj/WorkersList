function GUI() {
    let form = document.getElementById("form");
    function mostrarLista(ok) {
        let tabela = document.getElementById("lista");
        if (ok) {
            tabela.style.display = "table";
            form.style.display = "none";
        } else {
            tabela.style.display = "none";
            form.style.display = "block";
        }
    }
    function mostrarListaFuncionarios() {
        mostrarLista(true);
        let lista = document.querySelector("table#lista tbody");
        lista.innerHTML = "";
    }
    function mostrarAlterar() {
        window.fetch(`funcionario?codigo=${this.dataset.id}`).then(resolve => resolve.json()).then(func => {
            form.nome.value = func.nome;
            form.dataNascimento.value = func.dataNascimento;
            form.salario.value = func.salario;
            form.codigo.value = func.codigo;
            form.submeter.value = "Alterar";
            mostrarLista(false);
        }).catch(error => console.log(error));
    }
    function remover() {
        window.fetch(`funcionario?codigo=${this.dataset.id}`, {method: 'delete'}).then(resolve => resolve.json()).then(resolve => tratarColecao(resolve)).catch(error => console.log(error));
    }
    function registerEvents() {
        let alterar = document.querySelectorAll("input[title='Alterar']");
        alterar.forEach(a => a.onclick = mostrarAlterar);
        let excluir = document.querySelectorAll("input[title='Remover']");
        excluir.forEach(a => a.onclick = remover);
    }
    function tratarColecao(lista) {
        mostrarListaFuncionarios();
        let tbody = document.querySelector("table#lista tbody");
        if (lista.length > 0) {
            let numberFormatter = new Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL'
            });
            let dateFormatter = new Intl.DateTimeFormat('pt-br');
            for (let func of lista) {
                let data = new Date(func.dataNascimento + "T00:00:00");
                let linha = `<td>
                <input type='button' title='Alterar' value='#' data-id='${func.codigo}' />
                <input type='button' title='Remover' value='-' data-id='${func.codigo}' />
                </td><td>${func.nome}</td><td>${dateFormatter.format(data)}</td><td>${numberFormatter.format(func.salario)}</td>`;
                let newChild = document.createElement("tr");
                tbody.appendChild(newChild);
                newChild.innerHTML = linha;
            }
        } else {
            tbody.innerHTML = "<tr><th colspan='4'>N&atilde;o existem funcion&aacute;rios cadastrados.</th></tr>";
        }
        registerEvents();
    }
    function listarFuncionarios() {
        window.fetch("funcionario").then(resolve => resolve.json()).then(resolve => tratarColecao(resolve));
    }
    function mostrarInserir() {
        mostrarLista(false);
        form.reset();
    }
    function submeter(evt) {
        evt.preventDefault();
        let object = formToObj(new FormData(form));
        let myInit;
        if (form.submeter.value === "Alterar") {
            myInit = {method: 'put', body: JSON.stringify(object)};
        } else {
            delete object.codigo;
            myInit = {method: 'post', body: JSON.stringify(object)};
        }
        window.fetch("funcionario", myInit).then(resolve => resolve.json()).then(resolve => tratarColecao(resolve)).catch(error => console.log(error));
        form.submeter.value = "Inserir";
    }
    function formToObj(formData) {
        let object = {};
        formData.forEach((value, key) => object[key] = value);
        return object;
    }
    function addEvents() {
        listarFuncionarios();
        let inserir = document.getElementById("inserir");
        inserir.onclick = mostrarInserir;
        form.onsubmit = submeter;
    }
    return {addEvents};
}
let gui = new GUI();
gui.addEvents();