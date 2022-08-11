package tags;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.jsp.JspException;
import jakarta.servlet.jsp.JspWriter;
import jakarta.servlet.jsp.tagext.SimpleTagSupport;
import model.Worker;

public class SimpleTag extends SimpleTagSupport {

    private List<Worker> list;
    private String item;

    public void setList(List<Worker> colecao) {
        this.list = colecao;
    }

    public void setItem(String item) {
        this.item = item;
    }

    @Override
    public void doTag() throws JspException, IOException {
        JspWriter out = getJspContext().getOut();
        out.println("<table><caption>Workers List</caption><thead><tr><th>Name</th><th>Birth Date</th><th>Salary</th></tr></thead><tbody>");
        for (var worker : this.list) {
            getJspContext().setAttribute(item, worker);
            getJspBody().invoke(null);
        }
        out.println("</tbody></table>");
    }
}
