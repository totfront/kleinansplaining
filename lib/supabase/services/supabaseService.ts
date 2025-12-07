// lib/supabaseService.ts

import { supabase } from "../supabase"; // Assuming you initialized supabase client here

/**
 * 1. Read Acronyms
 * Fetches all acronyms. RLS handles visibility (everyone can see).
 */
export async function fetchAcronyms() {
	const { data, error } = await supabase
		.from("acronyms")
		.select("id, acronym, definition, creator_id");

	if (error) {
		console.error("Error fetching acronyms:", error);
		throw new Error("Could not load acronyms data.");
	}
	return data;
}

/**
 * 2. Create Acronym
 * Inserts a new acronym. RLS ensures only authenticated users can insert.
 * The creator_id is automatically set by Supabase Auth/DB triggers.
 */
export async function addAcronym(acronym: string, definition: string) {
	const { data, error } = await supabase
		.from("acronyms")
		.insert([{ acronym, definition }])
		.select();

	if (error) {
		console.error("Error adding acronym:", error);
		throw new Error("Failed to add new acronym.");
	}
	return data;
}

/**
 * 3. Edit Acronym
 * Updates an existing acronym. RLS ensures only the creator can modify it.
 */
export async function editAcronym(id: number, definition: string) {
	const { data, error } = await supabase
		.from("acronyms")
		.update({ definition, updated_at: new Date().toISOString() })
		.eq("id", id)
		.select();

	if (error) {
		console.error("Error editing acronym:", error);
		// If the error is an RLS denial, the user will see this generic error.
		throw new Error("Failed to update acronym. Check your permissions.");
	}
	return data;
}

/**
 * 4. Delete Acronym
 * Deletes an acronym. RLS ensures only the Admin role can execute this.
 */
export async function deleteAcronym(id: number) {
	const { error } = await supabase.from("acronyms").delete().eq("id", id);

	if (error) {
		console.error("Error deleting acronym:", error);
		// If the error is an RLS denial, the user will see this generic error.
		throw new Error("Failed to delete acronym. Only admins are allowed.");
	}
	return true; // Return a simple success indicator
}
