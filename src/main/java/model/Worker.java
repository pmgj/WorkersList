package model;

public class Worker {

    private int id;
    private String name;
    private double salary;
    private String birthDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public void setSalary(String salary) {
        double temp = Double.parseDouble(salary);
        this.setSalary(temp);
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    @Override
    public boolean equals(Object o) {
        if (o instanceof Worker) {
            Worker f = (Worker) o;
            return f.getId() == this.id;
        }
        return false;
    }

    @Override
    public String toString() {
        return String.format("(%d, %s, %f, %s)", id, name, salary, birthDate);
    }
}
