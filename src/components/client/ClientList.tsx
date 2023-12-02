"use client"

import User from "@/models/User";
import { useState } from "react";
import { deleteClient } from "@/services/actions";
import "../../styles/styles.css";

export default function ClientList({
  clients,
}: {
  clients: User[] | undefined;
}) {
  const [deletingClientId, setDeletingClientId] = useState<number | null>(null);

  const handleDeleteClick = async (clientId: number) => {
    setDeletingClientId(clientId);
    try {
      const result = await deleteClient(clientId);
      if (result.success) {
        console.log("Client deleted successfully");
      } else {
        console.error("Failed to delete client:", result.message);
      }
    } catch (error) {
      console.error("An error occurred while deleting the client:", error);
    } finally {
      setDeletingClientId(null);
    }
  };

  return (
    <div className="client-list-container">
      {clients?.length === 0 ? (
        <p>No clients available.</p>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((client) => (
              <tr key={client.userId}>
                <td>{client.firstName} {client.lastName}</td>
                <td>{client.email}</td>
                <td>
                  <button
                    onClick={() => handleDeleteClick(client.userId)}
                    disabled={deletingClientId === client.userId}
                    className="delete-button"
                  >
                    {deletingClientId === client.userId ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

