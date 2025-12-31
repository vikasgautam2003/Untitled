"use client";

import React from "react";
import AdminProblemList from "./components/AdminProblemList";

function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <AdminProblemList />
    </div>
  );
}

export default AdminPage;
