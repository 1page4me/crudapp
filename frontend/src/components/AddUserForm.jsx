import { useState } from 'react';

export default function AddUserForm({ onAdd, loading }) {
    const [name, setName] = useState('');

    return (
        <div className='form-container'>
            <input
                style={{ border: 'none', textDecoration: 'none', outline: 'none' }}
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter a name to add"
            />
            <button disabled={loading}
                onClick={() => {
                    if (name.trim()) {
                        onAdd(name)
                        setName('')
                    }
                }}
            >Add User</button>
        </div>
    )
}