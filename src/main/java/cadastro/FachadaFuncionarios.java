package cadastro;

import java.util.Collection;

import basicas.Worker;
import repositorio.RepositorioFuncionariosCollection;

public class FachadaFuncionarios {

    private static final FachadaFuncionarios FACHADA;
    private final RepositorioFuncionariosCollection repositorio;

    static {
        FACHADA = new FachadaFuncionarios();
    }

    private FachadaFuncionarios() {
        repositorio = new RepositorioFuncionariosCollection();
    }

    public static FachadaFuncionarios getInstance() {
        return FACHADA;
    }

    public void inserir(Worker func) {
        repositorio.inserir(func);
    }

    public void remover(Worker func) {
        repositorio.remover(func);
    }

    public void alterar(Worker func) {
        repositorio.alterar(func);
    }

    public Worker procurarPorCodigo(int codigo) {
        return repositorio.procurarPorCodigo(codigo);
    }

    public Collection<Worker> listarTodos() {
        return repositorio.listarTodos();
    }
}
