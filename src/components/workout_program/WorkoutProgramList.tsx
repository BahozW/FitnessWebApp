"use client";
import WorkoutProgram from "@/models/WorkoutProgram";
import WorkoutProgramDetails from "@/components/workout_program/WorkoutProgramDetails";
import { useState } from "react";
import { deleteWorkoutProgram, deleteExercise } from '@/services/actions';
import "../../styles/styles.css";


export default function WorkoutProgramList({ workoutPrograms, userRole }: { workoutPrograms: WorkoutProgram[] | undefined, userRole: string }) {
  const [deletingWorkoutProgramId, setDeletingWorkoutProgramId] = useState<number | null>(null);
  const [deletingExerciseId, setDeletingExerciseId] = useState<number | null>(null);

  const handleDeleteWorkoutProgram = async (workoutProgramId: number) => {
    setDeletingWorkoutProgramId(workoutProgramId);
    try {
      const result = await deleteWorkoutProgram(workoutProgramId);
      if (result.success) {
        console.log("Workout program deleted successfully");
      } else {
        console.error("Failed to delete workout program:", result.message);
      }
    } catch (error) {
      console.error("An error occurred while deleting the workout program:", error);
    } finally {
      setDeletingWorkoutProgramId(null);
    }
  };

  const handleDeleteExercise = async (exerciseId: number) => {
    setDeletingExerciseId(exerciseId);
    try {
      const result = await deleteExercise(exerciseId); 
      if (result.success) {
        console.log("Exercise deleted successfully");
      } else {
        console.error("Failed to delete exercise:", result.message);
      }
    } catch (error) {
      console.error("An error occurred while deleting the exercise:", error);
    } finally {
      setDeletingExerciseId(null);
    }
  };

  return (
    <div className="workout-program-list-container">
      {workoutPrograms?.length === 0 ? (
        <p>No workout programs available.</p>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Program Name</th>
              <th>Description</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workoutPrograms?.map((workoutProgram) => (
              <tr key={workoutProgram.workoutProgramId}>
                <td>{workoutProgram.name}</td>
                <td>{workoutProgram.description}</td>
                <td>
                  <WorkoutProgramDetails
                    workoutProgram={workoutProgram}
                    onDeleteExercise={handleDeleteExercise}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteWorkoutProgram(workoutProgram.workoutProgramId)}
                    disabled={deletingWorkoutProgramId === workoutProgram.workoutProgramId}
                    className="delete-button"
                  >
                    {deletingWorkoutProgramId === workoutProgram.workoutProgramId ? "Deleting..." : "Delete"}
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
