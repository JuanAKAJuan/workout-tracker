import { SQLiteDatabase } from "expo-sqlite";

export interface Workout {
  workout_id?: number;
  workout_name?: string;
  notes?: string;
  duration?: number;
  is_completed?: number;
  created_at?: string;
  updated_at?: string;
}

// CREATE - Add a new workout
export const createWorkout = async (
  db: SQLiteDatabase,
  workout: Workout,
): Promise<number> => {
  try {
    const result = await db.runAsync(
      `INSERT INTO workouts (workout_name, notes, duration, is_completed)
      VALUES (?, ?, ?, ?)`,
      [
        workout.workout_name || null,
        workout.notes || null,
        workout.duration || null,
        workout.is_completed || 0,
      ],
    );

    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error creating workout:", error);
    throw error;
  }
};

// READ - Get all workouts
export const getAllWorkouts = async (
  db: SQLiteDatabase,
): Promise<Workout[]> => {
  try {
    const result = await db.getAllAsync<Workout>(
      `SELECT * FROM workouts ORDER BY created_at DESC`,
    );

    return result;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    throw error;
  }
};

// READ - Get a single workout by ID
export const getWorkoutById = async (
  db: SQLiteDatabase,
  workoutId: number,
): Promise<Workout | null> => {
  try {
    const result = await db.getFirstAsync<Workout>(
      `SELECT * FROM workouts WHERE workout_id = ?`,
      [workoutId],
    );

    return result || null;
  } catch (error) {
    console.error(`Error fetching workout with ID ${workoutId}:`, error);
    throw error;
  }
};

// UPDATE - Update an existing workout
// DELETE - Delete a workout
// UTILITY - Toggle workout completion status
