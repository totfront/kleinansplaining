import { deleteAcronym } from "@/lib/supabase/services/supabaseService";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
	try {
		const body = await request.json();
		const { id } = body;

		if (!id) {
			return NextResponse.json({ error: "ID is required" }, { status: 400 });
		}

		await deleteAcronym(id);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("API error:", error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : "Failed to delete acronym",
			},
			{ status: 500 },
		);
	}
}
