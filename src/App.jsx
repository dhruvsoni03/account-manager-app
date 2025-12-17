import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MyNavbar from './components/MyNavbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container className="text-center mt-5">
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm border">
        <h1 className="display-4 fw-bold text-primary">Welcome to AccountManager</h1>
        <p className="lead my-4">
          This is a simple React application compliant with the assignment requirements.
          It uses React 18, Bootstrap 5, and LocalStorage for data persistence.
        </p>
        <hr className="my-4" />
        <p>Get started by accessing your account or creating a new one.</p>
        <div className="d-flex justify-content-center gap-3">
          <Button variant="primary" size="lg" as={Link} to="/login">Login</Button>
          <Button variant="outline-primary" size="lg" as={Link} to="/register">Register</Button>
        </div>
      </div>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-vh-100 bg-light">
          <MyNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
