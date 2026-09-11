import { useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { users as initialUsers } from "@/data/users";

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [toDelete, setToDelete] = useState(null);

  const confirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== toDelete.id));
    setToDelete(null);
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal">Users</h1>

      <div className="mt-8 bg-white border border-line rounded-xl overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-line text-left text-charcoal-soft">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Joined Date</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-line last:border-0">
                <td className="px-5 py-3 text-charcoal">{user.name}</td>
                <td className="px-5 py-3 text-charcoal-soft">{user.email}</td>
                <td className="px-5 py-3 text-charcoal-soft">{user.joinedDate}</td>
                <td className="px-5 py-3">
                  <span className="text-xs bg-gold-soft text-charcoal px-2 py-0.5 rounded-md">{user.role}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-3 text-sm">
                    <button className="text-charcoal-soft hover:text-charcoal">View</button>
                    <button onClick={() => setToDelete(user)} className="text-red hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title="Delete user?">
        <p className="text-sm text-charcoal-soft">
          Are you sure you want to delete <span className="text-charcoal font-medium">{toDelete?.name}</span>?
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
          <Button variant="secondary" onClick={() => setToDelete(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
