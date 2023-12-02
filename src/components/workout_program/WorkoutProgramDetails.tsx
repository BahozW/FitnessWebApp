import WorkoutProgram from "@/models/WorkoutProgram";
import {useState} from "react";

interface WorkoutProgramDetailsProps {
  workoutProgram: WorkoutProgram;
  onDeleteExercise: (exerciseId: number) => Promise<void>;
}

export default function WorkoutProgramDetails({
  workoutProgram,
  onDeleteExercise,
}: WorkoutProgramDetailsProps) {
  const [deletingExerciseId, setDeletingExerciseId] = useState<number | null>(null);
  const exerciseCount = workoutProgram.exercises.length;

  const handleDeleteExercise = async (exerciseId: number) => {
    setDeletingExerciseId(exerciseId); 
    try {
      await onDeleteExercise(exerciseId); 
    } finally {
      setDeletingExerciseId(null); 
    }
  };

  return (
    <div className="pt-2">
      <h2 className="text-md font-bold mb-4">
        Workout Details ({exerciseCount} {exerciseCount === 1 ? "exercise" : "exercises"})
      </h2>
      {workoutProgram.exercises.map((exercise, index) => (
        <div
          key={exercise.exerciseId}
          className={`mb-4 p-4 bg-white rounded shadow ${index > 0 ? "mt-4" : ""}`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-bold mb-2">
                Exercise: <span className="font-normal">{exercise.name}</span>
              </h3>
              <p className="text-md mb-2">
                <strong>Description: </strong>
                <span className="font-normal">{exercise.description}</span>
              </p>
              <p className="text-md mb-2">
                <strong>Sets: </strong>
                <span className="font-normal">{exercise.sets || "N/A"}</span>
              </p>
              <p className="text-md mb-2">
                <strong>Repetitions: </strong>{" "}
                <span className="font-normal">{exercise.repetitions || "N/A"}</span>
              </p>
              <p className="text-md">
                <strong>Time: </strong>
                <span className="font-normal">
                  {exercise.time ? `${exercise.time} minutes` : "N/A"}
                </span>
              </p>
            </div>
            <button
              onClick={() => handleDeleteExercise(exercise.exerciseId)}
              className="delete-button"
              aria-label={`Delete ${exercise.name}`}
              disabled={deletingExerciseId === exercise.exerciseId} 
            >
              {deletingExerciseId === exercise.exerciseId ? "Deleting..." : "Delete"}
            </button>
          </div>
          {exerciseCount > 1 && index < exerciseCount - 1 && (
            <hr className="my-4 border-t border-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
}