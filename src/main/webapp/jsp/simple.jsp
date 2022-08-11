<%@ taglib prefix="custom" uri="http://br.edu.ifpe/dsw2" %>
    <%@page contentType="text/html" pageEncoding="UTF-8" %>
        <!DOCTYPE html>
        <html>

        <head>
            <meta charset="UTF-8" />
            <title>Workers List</title>
            <link rel="icon" type="image/icon" href="favicon.ico" />
            <link rel="stylesheet" type="text/css" href="index.css" />
        </head>

        <body>
            <custom:simple list="${list}" item="worker">
                <tr>
                    <td>${worker.name}</td>
                    <td>${worker.salary}</td>
                    <td>${worker.birthDate}</td>
                </tr>
            </custom:simple>
        </body>

        </html>