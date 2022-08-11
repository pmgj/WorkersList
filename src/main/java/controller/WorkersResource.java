package controller;

import java.util.Collection;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import model.Worker;

@Path("/worker")
public class WorkersResource {
    private final WorkersFacade facade = WorkersFacade.getInstance();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Worker> listEmployees() {
        return facade.listAll();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Worker> createEmployee(Worker f) {
        facade.insert(f);
        return facade.listAll();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Worker> updateEmployee(Worker f) {
        facade.update(f);
        return facade.listAll();
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Worker> deleteEmployee(@PathParam("id") int id) {
        Worker func = facade.searchById(id);
        facade.remove(func);
        return facade.listAll();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Worker getEmployee(@PathParam("id") int id) {
        return facade.searchById(id);
    }
}
