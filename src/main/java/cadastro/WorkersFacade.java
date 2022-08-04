package cadastro;

import java.util.Collection;

import basicas.Worker;
import repositorio.RepositorioFuncionariosCollection;

public class WorkersFacade {

    private static final WorkersFacade FACHADA;
    private final RepositorioFuncionariosCollection repository;

    static {
        FACHADA = new WorkersFacade();
    }

    private WorkersFacade() {
        repository = new RepositorioFuncionariosCollection();
    }

    public static WorkersFacade getInstance() {
        return FACHADA;
    }

    public void inserir(Worker func) {
        repository.insert(func);
    }

    public void remover(Worker func) {
        repository.remove(func);
    }

    public void alterar(Worker func) {
        repository.update(func);
    }

    public Worker procurarPorCodigo(int codigo) {
        return repository.searchById(codigo);
    }

    public Collection<Worker> listarTodos() {
        return repository.listAll();
    }
}
