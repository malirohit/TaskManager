// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import React from 'react';

// const Login = () => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         try {
//             console.log('Starting login process...');
//             const result = await login(email, password);
//             console.log('Login result:', result);

//             if (result.success) {
//                 console.log('Login successful, preparing to navigate...');
//                 // Force a state update before navigation
//                 await new Promise(resolve => setTimeout(resolve, 0));
//                 console.log('Navigating to home page...');
//                 navigate('/', { replace: true });
//             } else {
//                 console.log('Login failed:', result.error);
//                 setError(result.error);
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             setError('An error occurred during login');
//         }
//     };

//     return (
//         <div className="auth-container">

//             <h2>Login</h2>

//             {/* If error in login, show error message */}
//             {error && <div className="error-message">{error}</div>}

//             {/* Login form */}
//             <form onSubmit={handleSubmit} className="auth-form">


//                 <div className="form-group">
//                     <label htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>

//                 {/* Password input */}
//                 <div className="form-group">
//                     <label htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>

//                 {/* Login button */}
//                 <button type="submit" className="submit-button">Login</button>
                
//             </form>

//         </div>
//     );
// };

// export default Login; 

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React from 'react';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            console.log('Starting login process...');
            const result = await login(email, password);
            console.log('Login result:', result);

            if (result.success) {
                console.log('Login successful, preparing to navigate...');
                await new Promise(resolve => setTimeout(resolve, 0));
                console.log('Navigating to home page...');
                navigate('/', { replace: true });

                // Force a page refresh after navigating
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } else {
                console.log('Login failed:', result.error);
                setError(result.error);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login');
        }
    };

    return (
        <div className="auth-container">

            <h2>Login</h2>

            {/* If error in login, show error message */}
            {error && <div className="error-message">{error}</div>}

            {/* Login form */}
            <form onSubmit={handleSubmit} className="auth-form">

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Login</button>
                
            </form>

        </div>
    );
};

export default Login;
