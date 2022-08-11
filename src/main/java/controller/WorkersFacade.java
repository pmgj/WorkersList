package controller;

import java.util.Collection;

import model.RepositoryWorkersCollection;
import model.Worker;

public class WorkersFacade {

    private static final WorkersFacade FACHADA;
    private final RepositoryWorkersCollection repository;

    static {
        FACHADA = new WorkersFacade();
    }

    private WorkersFacade() {
        repository = new RepositoryWorkersCollection();
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
