import './App.css'
import UserRow from './components/UserRow';
import AddUserForm from './components/AddUserForm';
import { useUsers } from './hooks/useUsers';

function App() {
  const { usersQuery, createMutation, deleteMutation, updateMutation
  } = useUsers()

  if (usersQuery.isLoading) return <p> Loading</p>
  if (usersQuery.isError) return <p> Error loading users</p>
  return (
    <div
      className="main-container"
    >
      <h2>Users</h2>
      <AddUserForm onAdd={createMutation.mutate} loading={createMutation.isLoading} />
      {usersQuery.data.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          onDelete={deleteMutation.mutate}
          onUpdate={(id, name) => updateMutation.mutate({ id, name })}
          loading={updateMutation.isLoading || deleteMutation.isLoading}
        />
      ))}
    </div>
  )
}

export default App