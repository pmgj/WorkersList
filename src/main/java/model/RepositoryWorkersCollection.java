package model;

import java.util.ArrayList;
import java.util.Collection;

public class RepositoryWorkersCollection {

    private final Collection<Worker> repository = new ArrayList<>();
    private static int id = 0;

    public void insert(Worker w) {
        w.setId(id++);
        repository.add(w);
    }

    public void remove(Worker w) {
        repository.remove(w);
    }

    public void update(Worker w) {
        Worker f = this.searchById(w.getId());
        f.setName(w.getName());
        f.setSalary(w.getSalary());
        f.setBirthDate(w.getBirthDate());
    }

    public Worker searchById(int id) {
        return repository.stream().filter(func -> func.getId() == id).findFirst().orElse(null);
    }

    public Collection<Worker> listAll() {
        return repository;
    }
}
