package repositorio;

import java.util.ArrayList;
import java.util.Collection;

import basicas.Worker;

public class RepositorioFuncionariosCollection {

    private final Collection<Worker> repositorio = new ArrayList<>();
    private static int id = 0;

    public void inserir(Worker func) {
        func.setId(id++);
        repositorio.add(func);
    }

    public void remover(Worker func) {
        repositorio.remove(func);
    }

    public void alterar(Worker func) {
        Worker f = this.procurarPorCodigo(func.getId());
        f.setName(func.getName());
        f.setSalary(func.getSalary());
        f.setBirthDate(func.getBirthDate());
    }

    public Worker procurarPorCodigo(int codigo) {
        return repositorio.stream().filter(func -> func.getId() == codigo).findFirst().orElse(null);
    }

    public Collection<Worker> listarTodos() {
        return repositorio;
    }
}
