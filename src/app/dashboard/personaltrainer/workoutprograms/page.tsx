import WorkoutProgramList from "@/components/workout_program/WorkoutProgramList";
import CreateWorkoutProgram from "@/components/workout_program/CreateWorkoutProgram";
import AddExercise from "@/components/exercise/AddExercise";
import {
  checkSession,
  getAllClients,
  getAllExercises,
  getTrainerWorkoutPrograms,
} from "@/services/actions";

export default async function WorkoutProgramsPage() {
  const session = await checkSession();
  const workoutPrograms = await getTrainerWorkoutPrograms();
  const exercises = await getAllExercises();
  const clients = await getAllClients();

  return (
    <main className="clients-page-container">
      <div className="section-container">
          <h2 className="section-title">
            Create Program
          </h2>
          <CreateWorkoutProgram clients={clients.data} />
          <h2 className="section-title">
            Add Exercise To Workout Program
          </h2>
          <AddExercise
            workoutPrograms={workoutPrograms.data}
            exercises={exercises.data}
          />
          <h2 className="section-title">
             Workout Programs
          </h2>
          <WorkoutProgramList workoutPrograms={workoutPrograms.data} />
      </div>
    </main>
  );
}

