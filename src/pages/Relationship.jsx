import { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { getCSRFToken } from "../services/csrf";
import { fetchRelationships, postRelationship } from "../services/relationshipService";
import RelationshipTable from "../components/RelationshipTable";
import RelationshipModal from "../components/RelationshipModal";

const Relationship = () => {
    const [modal, setModal] = useState(false);
    const [relationships, setRelationships] = useState([]);
    const [streak, setStreak] = useState({});
    const [formData, setFormData] = useState({
        estatus: "Good",
        note: "",
        dessert: false,
        username: localStorage.getItem("username"),
        create: new Date().toISOString().split('T')[0],
    });

    const username = localStorage.getItem("username");

    useEffect(() => {
        loadRelationships();
    }, []);

    const loadRelationships = async () => {
        const data = await fetchRelationships(username);
        if (data) {
            setRelationships(data.relationships);
            setStreak(data.streak);
        }
    };

    const toggle = async (relationshipId = null) => {
        if (relationshipId) {
            const relation = await fetchRelationships(username, relationshipId);
            if (relation) {
                setFormData({
                    ...relation,
                    create: relation.create.split('-').reverse().join('-'),
                });
            }
        } else {
            setFormData({
                estatus: "Good",
                note: "",
                dessert: false,
                username,
                create: new Date().toISOString().split('T')[0],
            });
        }
        setModal(!modal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = await getCSRFToken();
        if (await postRelationship(csrfToken, formData)) {
            toggle();
            loadRelationships();
        }
    };

    return (
        <div>
            <h2>Relaciones {username}</h2>
            <Button color="primary" onClick={() => toggle()}>Agregar Relación</Button>
            <h3>Racha: {streak.streak || 0} día(s)</h3>
            <RelationshipTable relationships={relationships} onRowClick={toggle} />
            <RelationshipModal isOpen={modal} toggle={toggle} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
        </div>
    );
};

export default Relationship;
