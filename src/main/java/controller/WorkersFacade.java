package controller;

import java.util.Collection;

import model.RepositoryWorkersCollection;
import model.Worker;

public class WorkersFacade {

    private static final WorkersFacade FACADE;
    private final RepositoryWorkersCollection repository;

    static {
        FACADE = new WorkersFacade();
    }

    private WorkersFacade() {
        repository = new RepositoryWorkersCollection();
    }

    public static WorkersFacade getInstance() {
        return FACADE;
    }

    public void insert(Worker worker) {
        repository.insert(worker);
    }

    public void remove(Worker worker) {
        repository.remove(worker);
    }

    public void update(Worker worker) {
        repository.update(worker);
    }

    public Worker searchById(int id) {
        return repository.searchById(id);
    }

    public Collection<Worker> listAll() {
        return repository.listAll();
    }
}
