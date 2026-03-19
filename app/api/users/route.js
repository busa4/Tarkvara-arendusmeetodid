import { NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import path from "path";

export async function GET() {
    try {
        const dbPath = path.resolve(process.cwd(), "autoosad.db");
        const db = new sqlite3(dbPath);

        const users = db.prepare("SELECT id, name, email, password, role, phone FROM users").all();
        
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: "Ошибка БД" }, { status: 500 });
    }
}