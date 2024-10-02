import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MainComponent() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ id: "", title: "", description: "" });
    const [newIssue, setNewIssue] = useState({ id: "", title: "", description: "" });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/issues');
                setIssues(response.data);
                setLoading(false);
            } catch (err) {
                showError('Error fetching issues');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleNewIssueChange = (e) => {
        const { name, value } = e.target;
        setNewIssue({ ...newIssue, [name]: value });
    };
    const handleEdit = (issue) => {
        setEditingId(issue.id);
        setFormData({ id: issue.id, title: issue.title, description: issue.description });
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/issues/${id}`, formData);
            setIssues(issues.map(issue => issue.id === id ? formData : issue));
            setEditingId(null);
        } catch (err) {
            showError('Error saving issue');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/issues/${id}`);
            setIssues(issues.filter(issue => issue.id !== id));
        } catch (err) {
            showError('Error deleting issue');
        }
    };

    const handleAddIssue = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/issues', newIssue);
            setIssues([...issues, response.data]);
            setNewIssue({ id: "", title: "", description: "" });
        } catch (err) {
            showError('Error creating new issue');
        }
    };

    const showError = (message) => {
        alert(message);
    };

    if (loading) {
        return <p>Loading issues...</p>;
    }

    return (
        <div>
            <h2>Add New Issue</h2>
            <div>
                <input
                    type="text"
                    name="id"
                    placeholder="ID"
                    value={newIssue.id}
                    onChange={handleNewIssueChange}
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newIssue.title}
                    onChange={handleNewIssueChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newIssue.description}
                    onChange={handleNewIssueChange}
                />
                <button onClick={handleAddIssue}>Add Issue</button>
            </div>

            <h2>Issue List</h2>
            {issues.length === 0 ? (
                <p>No issues found</p>
            ) : (
                <ul>
                    {issues.map((issue) => (
                        <li key={issue.id}>
                            {editingId === issue.id ? (
                                <div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                    <button onClick={() => handleSave(issue.id)}>Save</button>
                                    <button onClick={handleCancel}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <p>id: {issue.id}</p>
                                    <p>title: {issue.title}</p>
                                    <p>description: {issue.description}</p>
                                    <button onClick={() => handleEdit(issue)}>Edit</button>
                                    <button onClick={() => handleDelete(issue.id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
