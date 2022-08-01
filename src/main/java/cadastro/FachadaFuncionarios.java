package cadastro;

import java.util.Collection;

import basicas.Funcionario;
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

    public void inserir(Funcionario func) {
        repositorio.inserir(func);
    }

    public void remover(Funcionario func) {
        repositorio.remover(func);
    }

    public void alterar(Funcionario func) {
        repositorio.alterar(func);
    }

    public Funcionario procurarPorCodigo(int codigo) {
        return repositorio.procurarPorCodigo(codigo);
    }

    public Collection<Funcionario> listarTodos() {
        return repositorio.listarTodos();
    }
}
