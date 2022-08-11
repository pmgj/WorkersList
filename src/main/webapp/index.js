class GUI {
    constructor() {
        this.sortingOrder = true;
    }
    insertWorker(worker) {
        let myInit = { method: 'post', body: JSON.stringify(worker), headers: new Headers({ "Content-Type": "application/json" }) };
        window.fetch("webresources/worker", myInit).then(resolve => resolve.json()).then(resolve => this.showWorkers(resolve)).catch(error => console.log(error));
    }
    updateWorker(worker) {
        let myInit = { method: 'put', body: JSON.stringify(worker), headers: new Headers({ "Content-Type": "application/json" }) };
        window.fetch("webresources/worker", myInit).then(resolve => resolve.json()).then(resolve => this.showWorkers(resolve)).catch(error => console.log(error));
    }
    removeWorker(id) {
        window.fetch(`webresources/worker/${id}`, { method: 'delete' }).then(resolve => resolve.json()).then(resolve => this.showWorkers(resolve)).catch(error => console.log(error));
    }
    listWorkers() {
        window.fetch("webresources/worker").then(resolve => resolve.json()).then(resolve => this.showWorkers(resolve)).catch(error => console.log(error));
    }
    getWorker(id, func) {
        window.fetch(`webresources/worker/${id}`).then(resolve => resolve.json()).then(resolve => func(resolve)).catch(error => console.log(error));
    }
    saveWorker(evt) {
        let elem = evt.target;
        let tr = elem.parentNode.parentNode;
        let id = elem.dataset.id;
        let name = tr.querySelector("td:nth-child(2) input").value;
        let date = tr.querySelector("td:nth-child(3) input").value;
        let salary = tr.querySelector("td:nth-child(4) input").value;
        try {
            let object = { id: parseInt(id), name: this.validateName(name), salary: this.validateSalary(salary), birthDate: this.validateDate(date) };
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
            td3.innerHTML = `<input type="date" name="birthDate" value="${new Date(func.birthDate).toISOString().split('T')[0]}" />`;
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
        let salary = tr.querySelector("td:nth-child(4) input").value;
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
    validateSalary(value) {
        let temp = parseFloat(value);
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
    showWorkers(list) {
        let tbody = document.querySelector("table tbody");
        tbody.innerHTML = "";
        if (list.length > 0) {
            let numberFormatter = new Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL'
            });
            let dateFormatter = new Intl.DateTimeFormat('pt-br');
            for (let func of list) {
                let linha = "<td>";
                linha += `<input type="button" title="Edit" value="#" data-id="${func.id}" />&nbsp;`;
                linha += `<input type="button" title="Remove" value="&ndash;" data-id="${func.id}" />`;
                linha += `</td><td>${func.name}</td><td>${dateFormatter.format(new Date(func.birthDate))}</td><td>${numberFormatter.format(func.salary)}</td>`;
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
        let tbody = document.querySelector("table tbody");
        let row = `<tr><td><input type="button" title="Store" value="S" /></td><td><input type="text" name="name" /></td><td><input type="date" name="birthDate" /></td><td><input type="number" name="salary" /></td></tr>`;
        let th = tbody.querySelector("th[colspan]");
        tbody.innerHTML = th ? row : row + tbody.innerHTML;
        this.registerEvents();
        this.enableAddWorker(false);
    }
    sort(evt) {
        window.fetch("worker").then(resolve => resolve.json()).then(list => {
            let sortByName = {
                f1: (a, b) => a["name"] > b["name"] ? 1 : a["name"] < b["name"] ? -1 : 0,
                f2: (a, b) => a["name"] < b["name"] ? 1 : a["name"] > b["name"] ? -1 : 0
            };
            let sortByDate = {
                f1: (a, b) => new Date(a["birthDate"]) - new Date(b["birthDate"]),
                f2: (a, b) => new Date(b["birthDate"]) - new Date(a["birthDate"])
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
        }).catch(error => console.log(error));
        this.sortingOrder = !this.sortingOrder;
    }
    enableAddWorker(enable) {
        let add = document.getElementById("add");
        add.onclick = enable ? this.showAddWorker.bind(this) : undefined;
    }
    addEvents() {
        this.enableAddWorker(true);
        let headers = document.querySelectorAll("thead th:not(:first-child)");
        headers.forEach(th => th.onclick = this.sort.bind(this));
        this.listWorkers();
    }
}
let gui = new GUI();
gui.addEvents();