import CreateClientForm from "@/components/client/CreateClientForm";
import ClientList from "@/components/client/ClientList";
import { checkSession, getAllClients } from "@/services/actions";

export default async function ClientsPage() {
  const clients = await getAllClients();
  const session = await checkSession();
  
  return (
<main className="clients-page-container">
  <div className="section-container">
    <h2 className="section-title">
      Create Client
    </h2>
    <CreateClientForm />
    <h2 className="section-title">
      Clients
    </h2>
    <ClientList clients={clients?.data} />
  </div>
</main>
  );
}
