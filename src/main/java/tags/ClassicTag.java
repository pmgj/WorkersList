package tags;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.jsp.JspException;
import jakarta.servlet.jsp.JspWriter;
import jakarta.servlet.jsp.tagext.BodyTagSupport;
import model.Worker;

public class ClassicTag extends BodyTagSupport {

    private JspWriter out;
    private List<Worker> list;
    private String item;
    private int index;

    public void setList(List<Worker> colecao) {
        this.list = colecao;
    }

    public void setItem(String item) {
        this.item = item;
    }

    @Override
    public int doStartTag() throws JspException {
        index = 0;
        out = pageContext.getOut();
        try {
            out.println("<table><caption>Workers List</caption><thead><tr><th>Name</th><th>Birth Date</th><th>Salary</th></tr></thead><tbody>");
        } catch (IOException ex) {
            throw new JspException("IOException- " + ex.toString());
        }
        pageContext.setAttribute(item, this.list.get(index));
        return EVAL_BODY_INCLUDE;
    }

    @Override
    public int doEndTag() throws JspException {
        out = pageContext.getOut();
        try {
            out.println("</tbody></table>");
        } catch (IOException ex) {
            throw new JspException("IOException- " + ex.toString());
        }
        return EVAL_PAGE;
    }

    @Override
    public int doAfterBody() throws JspException {
        if (++index < this.list.size()) {
            pageContext.setAttribute(item, this.list.get(index));
            return EVAL_BODY_AGAIN;
        } else {
            return SKIP_BODY;
        }
    }
}
