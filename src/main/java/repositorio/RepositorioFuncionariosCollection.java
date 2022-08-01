package repositorio;

import java.util.ArrayList;
import java.util.Collection;

import basicas.Funcionario;

public class RepositorioFuncionariosCollection {

    private final Collection<Funcionario> repositorio = new ArrayList<>();
    private static int id = 0;

    public void inserir(Funcionario func) {
        func.setCodigo(id++);
        repositorio.add(func);
    }

    public void remover(Funcionario func) {
        repositorio.remove(func);
    }

    public void alterar(Funcionario func) {
        Funcionario f = this.procurarPorCodigo(func.getCodigo());
        f.setNome(func.getNome());
        f.setSalario(func.getSalario());
        f.setDataNascimento(func.getDataNascimento());
    }

    public Funcionario procurarPorCodigo(int codigo) {
        return repositorio.stream().filter(func -> func.getCodigo() == codigo).findFirst().orElse(null);
    }

    public Collection<Funcionario> listarTodos() {
        return repositorio;
    }
}
