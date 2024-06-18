import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const data = await request.json()
        const correo = await conn.query('SELECT * FROM usuarios WHERE correo = ?', [data.correo])
        const usuario = await conn.query('SELECT * FROM usuarios WHERE usuario = ?', [data.usuario])

        if (correo.length > 0) {
            return NextResponse.json('El correo ya esta registrado a otra cuenta')
        } else if (usuario.length > 0) {
            return NextResponse.json('El usuario ya existe')
        } else {
            await conn.query('INSERT INTO usuarios SET ?', [data])
            return NextResponse.json('Registro exitoso')
        }

    } catch (err) {
        return NextResponse.json({
            message: err.message
        })
    }
}