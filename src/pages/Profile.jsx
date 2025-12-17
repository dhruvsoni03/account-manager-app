import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, updateProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '' // Optional: allow password update
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                password: user.password || ''
            });
        }
    }, [user, navigate]);

    if (!user) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (!formData.name || !formData.email || !formData.password) {
            setMessage({ type: 'danger', text: 'All fields are required.' });
            return;
        }

        // Call update context function
        const result = updateProfile(formData);

        if (result.success) {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setIsEditing(false);
        } else {
            setMessage({ type: 'danger', text: result.message || 'Failed to update profile.' });
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white">
                            <h4 className="mb-0">My Profile</h4>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {message.text && <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>{message.text}</Alert>}

                            <Form onSubmit={handleUpdate}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    // Note: Changing email might require complex validation usually
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text" // Showing as text for "Simple" visibility in this demo, or 'password'
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    {!isEditing && <Form.Text className="text-muted">Password is hidden for security (click Edit to view/change)</Form.Text>}
                                </Form.Group>

                                <div className="d-flex justify-content-end gap-2">
                                    {!isEditing ? (
                                        <Button variant="primary" onClick={() => setIsEditing(true)}>
                                            Edit Profile
                                        </Button>
                                    ) : (
                                        <>
                                            <Button variant="secondary" onClick={() => {
                                                setIsEditing(false);
                                                setFormData({ ...user }); // Reset to current user data
                                                setMessage({ type: '', text: '' });
                                            }}>
                                                Cancel
                                            </Button>
                                            <Button variant="success" type="submit">
                                                Save Changes
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
