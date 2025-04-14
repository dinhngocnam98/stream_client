import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {useState} from "react";
import LoginAPI from "../../api/LoginAPI";
import {toast} from "react-toastify";
import {saveDataWithExpiry} from "../../utils/LocalStorage";
import {useNavigate} from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {email, password};

    try {
      const response = await LoginAPI.login(user);
      if (!response.data) {
        toast.error("Password is incorrect");
      } else {
        saveDataWithExpiry("user", {email});
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-md-center align-items-center vh-100">
        <Col xs={12} md={6} className="shadow p-5 bg-white rounded">
          <h2 className="text-center mb-4 text-primary">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-2"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-2"
              />
            </Form.Group>

            <Button title="login" aria-label="login" variant="primary" type="submit" className="w-100 py-2">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
