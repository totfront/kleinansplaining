import { addAcronym } from "@/lib/supabase/services/supabaseService";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { acronym, definition } = body;

		if (!acronym || !definition) {
			return NextResponse.json(
				{ error: "Acronym and definition are required" },
				{ status: 400 },
			);
		}

		const result = await addAcronym(acronym, definition);
		return NextResponse.json(result);
	} catch (error) {
		console.error("API error:", error);
		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : "Failed to add acronym",
			},
			{ status: 500 },
		);
	}
}
