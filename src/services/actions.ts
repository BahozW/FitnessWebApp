"use server";

import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import WorkoutProgram from "@/models/WorkoutProgram";
import Exercise from "@/models/Exercise";
import User from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { redirect } from "next/navigation";

export async function getAllClients() {
  const session = await getServerSession(authOptions);
  const url = "https://afefitness2023.azurewebsites.net/api/Users/Clients";
  try {
    const response = await fetch(url, {
      next: { tags: ["clients"] },
      method: "GET",
      headers: { Authorization: `Bearer ${session?.user?.token}` },
    });

    const data: User[] = await response.json();
    return { data };
  } catch (error) {
    return { error: error };
  }
}

export async function getTrainerWorkoutPrograms() {
  try {
    const session = await getServerSession(authOptions);
    const url =
      "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/trainer/";
    const response = await fetch(url, {
      next: { tags: ["trainerWorkoutPrograms"] },
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const data: WorkoutProgram[] = await response.json();
    return { data };
  } catch (error) {
    return { error: Error };
  }
}

export async function getClientWorkoutPrograms() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const url =
      "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/client/" +
      userId;
    const response = await fetch(url, {
      next: { tags: ["clientWorkoutPrograms"] },
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const data: WorkoutProgram[] = await response.json();
    return { data };
  } catch (error) {
    return { error: Error };
  }
}

export async function getAllExercises() {
  try {
    const session = await getServerSession(authOptions);
    const url = "https://afefitness2023.azurewebsites.net/api/Exercises/";
    const response = await fetch(url, {
      next: { tags: ["exercises"] },
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const data: Exercise[] = await response.json();
    return { data };
  } catch (error) {
    return { error: Error };
  }
}

export async function createClient(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const newClient = {
      userId: 0,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      personalTrainerId: Number(session?.user?.id),
      accountType: "Client",
    };
    const url = "https://afefitness2023.azurewebsites.net/api/Users";
    await axios.post(url, newClient, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
        Accept: "application/json",
      },
    });
    revalidateTag("clients");
    return { message: "Client created successfully", success: true };
  } catch (error) {
    return { message: `Failed with error: ${error}`, success: false };
  }
}

export async function deleteClient(clientId: number) {
  try {
    const session = await getServerSession(authOptions);
    const url = `https://afefitness2023.azurewebsites.net/api/Users/${clientId}`;
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    revalidateTag("clients");
    return { message: "Client deleted successfully", success: true };
  } catch (error) {
    return { message: `Failed to delete client with error: ${error}`, success: false };
  }
}

export async function addExercise(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const exerciseToAdd = {
      name: formData.get("name"),
      description: formData.get("description"),
      sets: Number(formData.get("sets")),
      repetitions: Number(formData.get("repetitions")),
      time: formData.get("time"),
    };
    const url =
      "https://afefitness2023.azurewebsites.net/api/Exercises/Program/" +
      formData.get("workoutProgram");
    const response = await axios.post(url, exerciseToAdd, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
        Accept: "application/json",
      },
    });
    console.log(response);
    revalidateTag("trainerWorkoutPrograms");
    revalidateTag("clientWorkoutPrograms");
    return { message: "Exercise added successfully", success: true };
  } catch (error) {
    console.log(error);
    return { message: `Failed with error: ${error}`, success: false };
  }
}

export async function deleteExercise(exerciseId: number) {
  const session = await getServerSession(authOptions);
  const url = `https://afefitness2023.azurewebsites.net/api/Exercises/${exerciseId}`;
  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    revalidateTag("exercises"); 
    revalidateTag("trainerWorkoutPrograms"); 
    revalidateTag("clientWorkoutPrograms");
    return { message: "Exercise deleted successfully", success: true };
  } catch (error) {
    return { message: `Failed to delete exercise with error: ${error}`, success: false };
  }
}

export async function createWorkoutProgram(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const newWorkoutProgram = {
      workoutProgramId: 0,
      name: formData.get("name"),
      description: formData.get("description"),
      exercises: [],
      personalTrainerId: Number(session?.user?.id),
      clientId: Number(formData.get("clientId")),
    };
    const url = "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms";
    await axios.post(url, newWorkoutProgram, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
        Accept: "application/json",
      },
    });
    revalidateTag("trainerWorkoutPrograms");
    revalidateTag("clientWorkoutPrograms");
    return { message: "Workout program created successfully", success: true };
  } catch (error) {
    return { message: `Failed with error: ${error}`, success: false };
  }
}

export async function deleteWorkoutProgram(workoutProgramId: number) {
  try {
    const session = await getServerSession(authOptions);
    const url = `https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/${workoutProgramId}`;
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    revalidateTag("trainerWorkoutPrograms"); 
    revalidateTag("clientWorkoutPrograms"); 
    return { message: "Workout program deleted successfully", success: true };
  } catch (error) {
    return { message: `Failed to delete workout program with error: ${error}`, success: false };
  }
}

export async function createTrainer(
  prevState: any,
  formData: FormData,
) {
  const url = "https://afefitness2023.azurewebsites.net/api/Users";
  const session = await getServerSession(authOptions);
  const newPersonalTrainer = {
    userId: 0,
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    accountType: "PersonalTrainer",
  };

  try {
    await axios.post(url, newPersonalTrainer, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    revalidateTag("clients");
    return { message: "Personal Trainer created successfully", success: true };
  } catch (error) {
    return { message: `Failed with error: ${error}`, success: false };
  }
}

export async function checkSession() {
  const session = await getServerSession(authOptions);
  if (session === null || session === undefined) redirect("/api/auth/signin");
  return { role: session?.user?.role, name: session?.user?.name };
}

