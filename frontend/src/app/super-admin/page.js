"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api-client";

export default function SuperAdminPage() {
  const [admins, setAdmins] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/admin/list").then(res => setAdmins(res.data));
    api.get("/admin/requests").then(res => setRequests(res.data));
  }, []);

  const approve = async (id) => {
    await api.post(`/admin/approve/${id}`);
    setRequests(r => r.filter(u => u._id !== id));
  };

  return (
    <main style={{ padding: 20 }}>
      <h2>Admins</h2>
      {admins.map(a => (
        <div key={a._id}>{a.email}</div>
      ))}

      <h2>Admin Requests</h2>
      {requests.map(u => (
        <div key={u._id}>
          {u.email}
          <button onClick={() => approve(u._id)}>Approve</button>
        </div>
      ))}
    </main>
  );
}
