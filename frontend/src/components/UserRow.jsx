import { useState, useEffect, memo } from 'react';

export default function UserRow({ user, onDelete, onUpdate, loading }) {

    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(user.name)
    useEffect(() => {
        setName(user.name)
    }, [user.name])

    return (
        <div className="user-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 6,
            minHeight: 36,
        }}>
            {editing ? (
                <>
                    <input value={name}
                        style={{
                            flex: 1,
                            marginRight: 10,
                        }}
                        onChange={e => setName(e.target.value)} />
                    <button disabled={loading} onClick={() => { onUpdate(user.id, name); setEditing(false) }}>
                        Update
                    </button>
                    <button disabled={loading} onClick={() => setEditing(false)}>Cancel</button>
                </>
            ) : (<>
                <span>{user.name}</span>
                <div className="user-actions">
                    <button disabled={loading} onClick={() => setEditing(true)}>Edit </button>
                    <button disabled={loading} onClick={() => onDelete(user.id)}>Delete</button>
                </div>

            </>)}
        </ div>
    )
}