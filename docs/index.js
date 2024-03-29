class GUI {
    constructor() {
        this.db = null;
        this.STORE_NAME = "workers";
        this.sortingOrder = true;
    }
    databaseUpgrade(e) {
        let stores = e.target.result;
        stores.createObjectStore(this.STORE_NAME, { keyPath: 'code', autoIncrement: true });
    }
    requestError(e) {
        console.error("Error", e.target.error);
    }
    insertWorker(worker) {
        let transaction = this.db.transaction(this.STORE_NAME, "readwrite");
        let store = transaction.objectStore(this.STORE_NAME);
        let request = store.add(worker);
        request.onsuccess = this.listWorkers.bind(this);
        request.onerror = this.requestError;
    }
    updateWorker(worker) {
        let transaction = this.db.transaction(this.STORE_NAME, "readwrite");
        let store = transaction.objectStore(this.STORE_NAME);
        let request = store.put(worker);
        request.onsuccess = this.listWorkers.bind(this);
        request.onerror = this.requestError;
    }
    removeWorker(id) {
        let transaction = this.db.transaction(this.STORE_NAME, "readwrite");
        let store = transaction.objectStore(this.STORE_NAME);
        let request = store.delete(id);
        request.onsuccess = this.listWorkers.bind(this);
        request.onerror = this.requestError;
    }
    listWorkers() {
        let transaction = this.db.transaction(this.STORE_NAME, "readonly");
        let store = transaction.objectStore(this.STORE_NAME);
        let request = store.getAll();
        request.onsuccess = e => this.showWorkers(e.target.result);
        request.onerror = this.requestError;
    }
    getWorker(id, func) {
        let transaction = this.db.transaction(this.STORE_NAME, "readonly");
        let store = transaction.objectStore(this.STORE_NAME);
        let request = store.get(id);
        request.onsuccess = e => func(e.target.result);
        request.onerror = this.requestError;
    }
    saveWorker(evt) {
        let elem = evt.target;
        let tr = elem.parentNode.parentNode;
        let code = elem.dataset.id;
        let name = tr.querySelector("td:nth-child(2) input").value;
        let date = tr.querySelector("td:nth-child(3) input").value;
        let salary = tr.querySelector("td:nth-child(4) input").value;
        try {
            let object = { code: parseInt(code), name: this.validateName(name), salary: this.validateSalary(salary), birthDate: this.validateDate(date) };
            this.updateWorker(object);
            this.enableAddWorker(true);
        } catch (ex) {
            alert(ex.message);
        }
    }
    editWorker(evt) {
        let elem = evt.target;
        this.getWorker(parseInt(elem.dataset.id), func => {
            this.enableAddWorker(false);
            elem.onclick = this.saveWorker.bind(this);
            elem.title = "Store";
            elem.value = "S";
            elem.nextElementSibling.style.display = "none";
            let td1 = elem.parentNode;
            let td2 = td1.nextSibling;
            td2.innerHTML = `<input type="text" name="name" value="${func.name}" />`;
            let td3 = td2.nextSibling;
            td3.innerHTML = `<input type="date" name="birthDate" value="${func.birthDate.toISOString().split('T')[0]}" />`;
            let td4 = td3.nextSibling;
            td4.innerHTML = `<input type="number" name="salary" value="${func.salary}" />`;
        });
    }
    remove(evt) {
        this.removeWorker(parseInt(evt.target.dataset.id));
    }
    addWorker(evt) {
        let tr = evt.target.parentNode.parentNode;
        let name = tr.querySelector("td:nth-child(2) input").value;
        let date = tr.querySelector("td:nth-child(3) input").value;
        let salary = tr.querySelector("td:nth-child(4) input").valueAsNumber;
        try {
            let object = { name: this.validateName(name), salary: this.validateSalary(salary), birthDate: this.validateDate(date) };
            this.insertWorker(object);
        } catch (ex) {
            alert(ex.message);
        }
        this.enableAddWorker(true);
    }
    validateName(value) {
        if (value.length < 4) {
            throw new Error("Name must have at least four characters.");
        }
        return value;
    }
    validateDate(value) {
        const re = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
        if (!re.test(value)) {
            throw new Error("Date format incorrect.");
        }
        let temp = new Date(value + "T00:00:00.000000");
        let isValidDate = d => d instanceof Date && !isNaN(d);
        if (!isValidDate(temp)) {
            throw new Error("Invalid date.");
        }
        let prior = new Date();
        prior.setFullYear(new Date().getFullYear() - 18);
        if (temp.getTime() > prior.getTime()) {
            throw new Error("The worker must be at least 18 years old.");
        }
        return temp;
    }
    validateSalary(temp) {
        if (isNaN(temp)) {
            throw new Error("Salary must be a number.");
        }
        if (temp < 1212) {
            throw new Error("Salary must not be below the minimum.");
        }
        return temp;
    }
    registerEvents() {
        let edit = document.querySelectorAll("input[type='button'][title='Edit']");
        edit.forEach(a => a.onclick = this.editWorker.bind(this));
        let rem = document.querySelectorAll("input[type='button'][title='Remove']");
        rem.forEach(a => a.onclick = this.remove.bind(this));
        let save = document.querySelectorAll("input[type='button'][title='Store']");
        save.forEach(a => a.onclick = this.addWorker.bind(this));
    }
    showWorkers(lista) {
        let tbody = document.querySelector("table#list tbody");
        tbody.innerHTML = "";
        if (lista.length > 0) {
            let numberFormatter = new Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL'
            });
            let dateFormatter = new Intl.DateTimeFormat('pt-br');
            for (let func of lista) {
                let linha = `<td class="align-middle">`;
                linha += `<input type="button" title="Edit" value="#" data-id="${func.code}" class="btn btn-primary" />&nbsp;`;
                linha += `<input type="button" title="Remove" value="&ndash;" data-id="${func.code}" class="btn btn-primary" />`;
                linha += `</td><td class="align-middle">${func.name}</td><td class="align-middle">${dateFormatter.format(func.birthDate)}</td><td class="align-middle">${numberFormatter.format(func.salary)}</td>`;
                let newChild = document.createElement("tr");
                tbody.appendChild(newChild);
                newChild.innerHTML = linha;
            }
        } else {
            tbody.innerHTML = `<tr><th colspan="4">No workers stored.</th></tr>`;
        }
        this.registerEvents();
        this.enableAddWorker(true);
    }
    showAddWorker() {
        let tbody = document.querySelector("table#list tbody");
        let row = `<tr scope="row"><td><input type="button" title="Store" value="S" class="btn btn-primary" /></td><td><input type="text" name="name" class="form-control" /></td><td><input type="date" name="birthDate" class="form-control" /></td><td><input type="number" name="salary" class="form-control" /></td></tr>`;
        let th = tbody.querySelector("th[colspan]");
        tbody.innerHTML = th ? row : row + tbody.innerHTML;
        this.registerEvents();
        this.enableAddWorker(false);
    }
    sort(evt) {
        let transaction = this.db.transaction(this.STORE_NAME, "readonly");
        let store = transaction.objectStore(this.STORE_NAME);
        let request = store.getAll();
        request.onsuccess = e => {
            let list = e.target.result;
            let sortByName = {
                f1: (a, b) => a["name"] > b["name"] ? 1 : a["name"] < b["name"] ? -1 : 0,
                f2: (a, b) => a["name"] < b["name"] ? 1 : a["name"] > b["name"] ? -1 : 0
            };
            let sortByDate = {
                f1: (a, b) => a["birthDate"] - b["birthDate"],
                f2: (a, b) => b["birthDate"] - a["birthDate"]
            };
            let sortBySalary = {
                f1: (a, b) => a["salary"] - b["salary"],
                f2: (a, b) => b["salary"] - a["salary"]
            };
            let functions = [null, sortByName, sortByDate, sortBySalary];
            let field = functions[evt.target.cellIndex];
            let sf = this.sortingOrder ? field.f1 : field.f2;
            list.sort(sf);
            this.showWorkers(list);
        };
        request.onerror = this.requestError;
        this.sortingOrder = !this.sortingOrder;
    }
    enableAddWorker(enable) {
        let add = document.getElementById("add");
        add.onclick = enable ? this.showAddWorker.bind(this) : undefined;
    }
    addEvents() {
        let openRequest = window.indexedDB.open(this.STORE_NAME, 1);
        openRequest.onupgradeneeded = this.databaseUpgrade.bind(this);
        openRequest.onerror = this.requestError;
        openRequest.onsuccess = e => {
            this.db = e.target.result;
            this.listWorkers();
        };
        this.enableAddWorker(true);
        let headers = document.querySelectorAll("thead th:not(:first-child)");
        headers.forEach(th => th.onclick = this.sort.bind(this));
    }
}
let gui = new GUI();
gui.addEvents();