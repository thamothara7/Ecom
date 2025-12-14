import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/userStore';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        try {
            registerUser({ name, email, password });
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '14px',
        marginBottom: '1rem',
        borderRadius: '8px',
        border: '1px solid #333',
        background: 'rgba(255, 255, 255, 0.05)',
        color: 'white',
        boxSizing: 'border-box',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s'
    };

    return (
        <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div style={{
                background: '#1a1a1a',
                padding: '3rem',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '400px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                <h1 className="section-title" style={{ marginBottom: '0.5rem', textAlign: 'left' }}>Create Account</h1>
                <p style={{ color: '#888', marginBottom: '2rem' }}>Join us to start shopping.</p>

                {error && <div style={{ color: '#ff4444', marginBottom: '1rem', padding: '10px', background: 'rgba(255, 68, 68, 0.1)', borderRadius: '6px' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontSize: '0.9rem' }}>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontSize: '0.9rem' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', fontSize: '0.9rem' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <button type="submit" className="cta-button primary" style={{ width: '100%', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                        Sign Up
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '600' }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
