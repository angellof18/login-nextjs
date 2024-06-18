import { conn } from "@/libs/mysql"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { usuario } = await request.json()
        const result = await conn.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario])
        if (result.length > 0) {
            return NextResponse.json(result)
        }
        return NextResponse.json('Usuario no encontrado')

    } catch (err) {
        return NextResponse.json({
            message: err.message
        })
    }
}