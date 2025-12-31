"use client";

export default function AdminProblemRow({ problem, onDeleted }) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${problem.title}"?\nThis action is irreversible.`
    );

    if (!confirmed) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/problems/${problem._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!res.ok) {
      alert("Failed to delete problem");
      return;
    }

    onDeleted(problem._id);
  };

  return (
    <tr className="border-b">
      <td className="py-2">{problem.title}</td>
      <td>{problem.topic}</td>
      <td>{problem.difficulty}</td>
      <td className="text-right">
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
