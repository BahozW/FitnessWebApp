import CreateTrainerForm from "@/components/trainer/CreateTrainerForm";
import { checkSession } from "@/services/actions";
import { redirect } from "next/navigation";

export default async function ManagerPage() {
  const session = await checkSession();
  if (session?.role?.toLowerCase() !== "manager") {
    redirect("/dashboard/" + session?.role?.toLowerCase());
  }
  return (
    <main className="clients-page-container">
    <div className="section-container">
      <h2 className="section-title">
            Create a personal trainer
          </h2>
          <CreateTrainerForm />
        </div>
    </main>
  );
}