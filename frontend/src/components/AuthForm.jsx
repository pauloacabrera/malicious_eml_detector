import { useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from 'react-icons/fi';

function AuthForm({ mode, onSubmit, loading }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <div className="auth-card-header">
        <p className="eyebrow">Secure Access</p>
        <h2>{mode === 'register' ? 'Create your secure workspace' : 'Welcome back'}</h2>
        <p className="muted">Access your enterprise email threat analysis portal.</p>
      </div>

      {mode === 'register' && (
        <label className="input-group">
          <FiUser />
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
        </label>
      )}

      <label className="input-group">
        <FiMail />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email address" required />
      </label>

      <label className="input-group">
        <FiLock />
        <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Password" required />
        <button type="button" className="icon-btn ghost" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </label>

      <button className="primary-btn" type="submit" disabled={loading}>
        {loading ? 'Please wait...' : mode === 'register' ? 'Register account' : 'Sign in'}
      </button>
    </form>
  );
}

export default AuthForm;
