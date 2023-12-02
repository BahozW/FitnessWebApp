"use client";

import { useFormState } from "react-dom";
import { addExercise } from "@/services/actions";
import Exercise from "@/models/Exercise";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import WorkoutProgram from "@/models/WorkoutProgram";
import "../../styles/styles.css";

export default function AddExercise({
  workoutPrograms,
  exercises,
}: {
  workoutPrograms: WorkoutProgram[] | undefined;
  exercises: Exercise[] | undefined;
}) {
  let initialState = {
    message: "",
    success: false,
  };
  const [state, formAction] = useFormState(addExercise, initialState);

  if (state.success) {
    console.log("success");
  }

  return (
    <form className="max-w-md mx-auto mt-8 content" action={formAction}>
      <FormInput label="Name" name="name" type="text" required />
      <FormInput label="Description" name="description" type="text" required />
      <FormInput label="Sets" name="sets" type="number" min="1" required />
      <FormInput label="Repetitions" name="repetitions" type="number" min="1" />
      <FormInput label="Time" name="time" type="number" min="1" />
      
      <div className="mb-4">
        <label htmlFor="workoutProgram" className="block text-sm font-medium form-text-name">
          Select Workout Program
        </label>
        <select
          id="workoutProgram"
          name="workoutProgram"
          className="form-input"
        >
          {workoutPrograms?.map((program) => (
            <option key={program.workoutProgramId} value={program.workoutProgramId}>
              {program.name}
            </option>
          ))}
        </select>
      </div>

      <FormSubmit state={state} />
    </form>
  );
}
