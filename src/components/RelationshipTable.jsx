import { Table } from "reactstrap";

const RelationshipTable = ({ relationships, onRowClick }) => {
    return (
        <Table striped className="mt-3">
            <thead>
                <tr>
                    <th>Creación</th>
                    <th>Nota</th>
                    <th>Postre</th>
                </tr>
            </thead>
            <tbody>
                {relationships.map((rel) => {
                    let rowClass =
                        rel.estatus === "Good" ? "table-success" :
                        rel.estatus === "Regular" ? "table-warning" :
                        "table-danger";

                    return (
                        <tr key={rel.id} className={rowClass} onClick={() => onRowClick(rel.id)}>
                            <td>{rel.create}</td>
                            <td>{rel.note || "Sin nota"}</td>
                            <td>{rel.dessert ? "Sí" : "No"}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default RelationshipTable;
