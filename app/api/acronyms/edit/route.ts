import { editAcronym } from "@/lib/supabase/services/supabaseService";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
	try {
		const body = await request.json();
		const { id, definition } = body;

		if (!id || !definition) {
			return NextResponse.json(
				{ error: "ID and definition are required" },
				{ status: 400 },
			);
		}

		const result = await editAcronym(id, definition);
		return NextResponse.json(result);
	} catch (error) {
		console.error("API error:", error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : "Failed to update acronym",
			},
			{ status: 500 },
		);
	}
}
