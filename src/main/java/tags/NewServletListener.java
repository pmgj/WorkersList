package tags;

import controller.WorkersFacade;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import model.Worker;

@WebListener
public class NewServletListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        WorkersFacade facade = WorkersFacade.getInstance();
        Worker f;
        f = new Worker();
        f.setName("Aline Almeida");
        f.setSalary(1234);
        f.setBirthDate("1990-12-01");
        facade.insert(f);
        f = new Worker();
        f.setName("Bruno Barros");
        f.setSalary(4321);
        f.setBirthDate("1991-11-11");
        facade.insert(f);
        f = new Worker();
        f.setName("Carlos Carvalho");
        f.setSalary(1928);
        f.setBirthDate("1992-02-22");
        facade.insert(f);
        f = new Worker();
        f.setName("Daniela Dantas");
        f.setSalary(9182);
        f.setBirthDate("1993-05-31");
        facade.insert(f);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
    }
}
