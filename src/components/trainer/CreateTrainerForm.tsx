"use client";

import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import { useFormState } from "react-dom";
import { createTrainer } from "@/services/actions";

export default function CreateTrainerForm() {
  let initialState = {
    message: "",
    success: false,
  };
  const [state, formAction] = useFormState(createTrainer, initialState);
  return (
    <form className="max-w-md mx-auto my-8" action={formAction}>
      <FormInput label="First Name" name="firstName" type="text" required />
      <FormInput label="Last Name" name="lastName" type="text" required />
      <FormInput label="Email" name="email" type="email" required />
      <FormInput label="Password" name="password" type="password" required />
      <FormSubmit state={state} />
    </form>
  );
}
