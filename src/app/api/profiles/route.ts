import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const profiles = await db.collection("stp_profiles").find({}, { projection: { _id: 0 } }).sort({ profileName: 1 }).toArray();
    return NextResponse.json({ profiles });
  } catch (error) {
    return NextResponse.json({ error: "MongoDB connection failed. Check .env.local and make sure MongoDB is running." }, { status: 503 });
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.profileName?.trim()) return NextResponse.json({ error: "Profile Name is required." }, { status: 400 });
    const db = await getDb();
    const profile = {
      profileName: String(body.profileName).trim(),
      stpName: String(body.stpName || ""),
      occupation: String(body.occupation || ""),
      address: String(body.address || ""),
      phone: String(body.phone || ""),
      accountName: String(body.accountName || ""),
      accountNumber: String(body.accountNumber || ""),
      bankName: String(body.bankName || ""),
      branchName: String(body.branchName || ""),
      routingNumber: String(body.routingNumber || ""),
      updatedAt: new Date().toISOString()
    };
    await db.collection("stp_profiles").updateOne({ profileName: profile.profileName }, { $set: profile }, { upsert: true });
    return NextResponse.json({ ok: true, profile });
  } catch {
    return NextResponse.json({ error: "Could not save profile. Check MongoDB configuration." }, { status: 503 });
  }
}
export async function DELETE(request: Request) {
  try {
    const { profileName } = await request.json();
    const db = await getDb();
    await db.collection("stp_profiles").deleteOne({ profileName: String(profileName || "") });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not delete profile. Check MongoDB configuration." }, { status: 503 });
  }
}
