"use client";
import { useFormState } from "react-dom";
import { createWorkoutProgram } from "@/services/actions";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import { User } from "@/models/User";
import "../../styles/styles.css";

export default function CreateWorkoutProgram({
  clients,
}: {
  clients: User[] | undefined;
}) {
  let initialState = {
    message: "",
    success: false,
  };
  const [state, formAction] = useFormState(createWorkoutProgram, initialState);
  if (state.success) {
    console.log("success");
  }

  return (
    <form className="max-w-md mx-auto mt-8 content" action={formAction}>
      <FormInput label="Name" name="name" type="text" required />
      <FormInput label="Description" name="description" type="text" required />
      {}
      <div className="mb-4">
        <label htmlFor="clientDropdown" className="block text-sm font-medium form-text-name">
          Select Client
        </label>
        <select
          id="clientId"
          name="clientId"
          className="form-input"
        >
          {clients?.map((client) => (
            <option key={client?.userId} value={client?.userId}>
              {client?.firstName}
            </option>
          ))}
        </select>
      </div>
      <FormSubmit state={state} />
    </form>
  );
}
