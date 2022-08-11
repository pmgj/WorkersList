<%@tag import="java.util.List,model.Worker" body-content="scriptless" description="put the tag description here" pageEncoding="UTF-8"%>
<%@attribute name="list" rtexprvalue="true" required="true" type="List<Worker>"%>
<%@attribute name="item" rtexprvalue="false" required="true" %>

<table>
        <caption>Workers List</caption>
        <thead>
            <tr>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Salary</th>
            </tr>
        </thead>
        <tbody>
    <% 
        for (int i = 0; i < list.size(); i++) {
            request.setAttribute(item, list.get(i)); %>
    <jsp:doBody />
    <% }%>
    </tbody>
</table>