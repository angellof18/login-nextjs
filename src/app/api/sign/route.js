
import { pool } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { nombre, ap_paterno, ap_materno, correo, usuario, password } = await request.json()
        const correoQuery = 'SELECT * FROM usuarios WHERE correo = ?'
        const usuarioQuery = 'SELECT * FROM usuarios WHERE usuario = ?'
        const insertQuery = 'INSERT INTO usuarios (nombre, ap_paterno, ap_materno, correo, usuario, password) VALUES(?,?,?,?,?,?)'

        const [correoResult] = await pool.execute(correoQuery, [correo])
        const [usuarioResult] = await pool.execute(usuarioQuery, [usuario])

        if (correoResult.length > 0) {
            return NextResponse.json(
                { message: 'El correo ya esta registrado a otra cuenta' })
        } else if (usuarioResult.length > 0) {
            return NextResponse.json({ message: 'El usuario ya existe' })
        } else {
            const [result] = await pool.execute(insertQuery, [nombre, ap_paterno, ap_materno, correo, usuario, password])
            console.log(result)
            return NextResponse.json({ message: 'Registro exitoso' })
        }

    } catch (err) {
        return NextResponse.json({ message: err.message })
    }
}