import { conn } from "@/libs/mysql"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { usuario } = await request.json()
        const result = await conn.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario])
        return NextResponse.json(result)
    } catch (err) {
        return NextResponse.json({
            message: err.message
        })
    }
}