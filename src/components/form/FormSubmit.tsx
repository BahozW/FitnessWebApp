import { useFormStatus } from "react-dom";

interface SubmitProps {
  state: { message: string };
}

const FormSubmit = ({ state }: SubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <div className="mb-4 text-center">
      <button
        type="submit"
        aria-disabled={pending}
        className="dashboard-link w-full" 
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
      {state.message && (
        <p aria-live="polite" className="sr-only" role="status">
          {state.message}
        </p>
      )}
    </div>
  );
};

export default FormSubmit;