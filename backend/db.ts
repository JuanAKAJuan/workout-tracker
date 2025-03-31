import * as SQLite from "expo-sqlite";
const db = await SQLite.openDatabaseAsync("workout-tracker");

await db.execAsync(`
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS workouts (
  workout_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	workout_name TEXT NOT NULL,
	notes TEXT,
	duration INTEGER,
	is_completed INTEGER DEFAULT 0,
	created_at TEXT NOT NULL DEFAULT (datetime('now')),
	updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS exercises (
	exercise_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	exercise_name TEXT NOT NULL,
	muscle_group TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS workout_exercises (
	workout_exercise_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	workout_id INTEGER NOT NULL,
	exercise_id INTEGER NOT NULL,
	sequence_number INTEGER NOT NULL,
	FOREIGN KEY (workout_id) REFERENCES workouts(workout_id) ON DELETE CASCADE,
	FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sets (
	set_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	workout_exercise_id INTEGER NOT NULL,
	reps INTEGER NOT NULL,
	weight REAL NOT NULL,
	is_completed INTEGER DEFAULT 0,
	FOREIGN KEY (workout_exercise_id) REFERENCES workout_exercises(workout_exercise_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mesocycles (
	mesocycle_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	name TEXT NOT NULL,
	duration TEXT NOT NULL,
	created_at TEXT NOT NULL DEFAULT (datetime('now')),
	updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS mesocycle_workouts (
	mesocycle_workout_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	mesocycle_id INTEGER NOT NULL,
	workout_id INTEGER NOT NULL,
	sequence_number INTEGER NOT NULL,
	FOREIGN KEY (mesocycle_id) REFERENCES mesocycles(mesocycle_id) ON DELETE CASCADE,
	FOREIGN KEY (workout_id) REFERENCES workouts(workout_id) ON DELETE CASCADE
);
`);
