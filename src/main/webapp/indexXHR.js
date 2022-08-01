function GUI() {
    let xhr = new XMLHttpRequest();
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
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let func = JSON.parse(xhr.responseText);
                form.nome.value = func.nome;
                form.dataNascimento.value = func.dataNascimento;
                form.salario.value = func.salario;
                form.codigo.value = func.codigo;
                form.submeter.value = "Alterar";
                mostrarLista(false);
            }
        };
        xhr.open("get", `funcionario?codigo=${this.dataset.id}`);
        xhr.send();
    }
    function remover() {
        xhr.onreadystatechange = tratarColecao;
        xhr.open("delete", `funcionario?codigo=${this.dataset.id}`);
        xhr.send();
    }
    function registerEvents() {
        let alterar = document.querySelectorAll("input[title='Alterar']");
        alterar.forEach(a => a.onclick = mostrarAlterar);
        let excluir = document.querySelectorAll("input[title='Remover']");
        excluir.forEach(a => a.onclick = remover);
    }
    function tratarColecao() {
        if (xhr.readyState === 4) {
            mostrarListaFuncionarios();
            let tbody = document.querySelector("table#lista tbody");
            let lista = JSON.parse(xhr.responseText);
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
    }
    function listarFuncionarios() {
        xhr.onreadystatechange = tratarColecao;
        xhr.open("get", "funcionario");
        xhr.send();
    }
    function mostrarInserir() {
        mostrarLista(false);
        form.reset();
    }
    function submeter(evt) {
        evt.preventDefault();
        let object = formToObj(new FormData(form));
        xhr.onreadystatechange = tratarColecao;
        if (form.submeter.value === "Alterar") {
            xhr.open("put", "funcionario");
        } else {
            delete object.codigo;
            xhr.open("post", "funcionario");
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(object));
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