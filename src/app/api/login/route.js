
import { pool } from "@/libs/mysql"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { usuario, password } = await request.json()
        const [result] = await pool.execute('SELECT * FROM usuarios WHERE usuario = ?', [usuario])

        if (result.length > 0) {
            if (result[0].password == password) {
                return NextResponse.json({ message: 'SESION CORRECTA' })
            }
            return NextResponse.json({ message: 'Las contraseña es incorrecta' })
        }
        return NextResponse.json({ message: `El usuario:${usuario} no existe` })

    } catch (err) {
        return NextResponse.json({
            message: err.message
        })
    }
}