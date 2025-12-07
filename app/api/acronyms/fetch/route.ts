import { fetchAcronyms } from "@/lib/supabase/services/supabaseService";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const result = await fetchAcronyms();
		return NextResponse.json(result);
	} catch (error) {
		console.error("API error:", error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : "Failed to fetch acronyms",
			},
			{ status: 500 },
		);
	}
}
