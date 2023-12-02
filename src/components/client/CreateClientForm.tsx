"use client";

import { createClient } from "@/services/actions";
import { useFormState } from "react-dom";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import "../../styles/styles.css";

export default function CreateClientForm() {
  let initialState = {
    message: "",
    success: false,
  };
  const [state, formAction] = useFormState(createClient, initialState);

  return (
    <>
      <form className="max-w-md mx-auto my-8" action={formAction}>
        <FormInput label="First Name" name="firstName" type="text" required />
        <FormInput label="Last Name" name="lastName" type="text" required />
        <FormInput label="Email" name="email" type="email" required />
        <FormInput label="Password" name="password" type="password" required />
        <FormSubmit state={state} />
      </form>
    </>
  );
}
