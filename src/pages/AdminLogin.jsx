import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock authentication
        if (username === 'admin' && password === 'password123') {
            localStorage.setItem('adminToken', 'mock-token-123');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    const containerStyle = {
        maxWidth: '400px',
        margin: '100px auto',
        padding: '2rem',
        background: '#1a1a1a',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        marginBottom: '1rem',
        borderRadius: '5px',
        border: '1px solid #333',
        background: '#0a0a0a',
        color: 'white',
        boxSizing: 'border-box'
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div style={containerStyle}>
                <h2 style={{ marginBottom: '2rem' }}>Admin Login</h2>
                {error && <p style={{ color: '#ff4444', marginBottom: '1rem' }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <button type="submit" className="cta-button primary" style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
