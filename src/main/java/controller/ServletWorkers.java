package controller;

import java.io.IOException;
import java.util.stream.Collectors;
import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.Worker;

@WebServlet(name = "ServletWorkers", urlPatterns = {"/worker"})
public class ServletWorkers extends HttpServlet {

    private final WorkersFacade fachada = WorkersFacade.getInstance();

    private void listAll(HttpServletResponse response) throws IOException {
        String json = JsonbBuilder.create().toJson(fachada.listarTodos());
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(json);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String code = request.getParameter("id");
        if (code != null) {
            int id = Integer.parseInt(code);
            Worker f = fachada.procurarPorCodigo(id);
            String json = JsonbBuilder.create().toJson(f);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(json);
        } else {
            listAll(response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String requestData = request.getReader().lines().collect(Collectors.joining());
        Worker func = JsonbBuilder.create().fromJson(requestData, Worker.class);
        fachada.inserir(func);
        listAll(response);
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String id = request.getParameter("id");
        int codigo = Integer.parseInt(id);
        Worker func = fachada.procurarPorCodigo(codigo);
        fachada.remover(func);
        listAll(response);
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String requestData = request.getReader().lines().collect(Collectors.joining());
        Worker func = JsonbBuilder.create().fromJson(requestData, Worker.class);
        fachada.alterar(func);
        listAll(response);
    }
}
