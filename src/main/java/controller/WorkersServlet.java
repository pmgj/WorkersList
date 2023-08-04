package controller;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/workers")
public class WorkersServlet extends HttpServlet {

    private final WorkersFacade facade = WorkersFacade.getInstance();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("list", facade.listAll());
        String option = req.getParameter("option");
        String destination;
        switch (option) {
            case "0" -> {
                destination = "simple.jsp";
            }
            case "1" -> {
                destination = "classic.jsp";
            }
            default -> {
                destination = "tag.jsp";
            }
        }
        req.getRequestDispatcher("jsp/" + destination).forward(req, resp);
    }
}
