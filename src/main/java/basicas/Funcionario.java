package basicas;

public class Funcionario {

    private int codigo;
    private String nome;
    private double salario;
    private String dataNascimento;

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getSalario() {
        return salario;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }

    public void setSalario(String salario) {
        double temp = Double.parseDouble(salario);
        this.setSalario(temp);
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    @Override
    public boolean equals(Object o) {
        if (o instanceof Funcionario) {
            Funcionario f = (Funcionario) o;
            return f.getCodigo() == this.codigo;
        }
        return false;
    }
}
