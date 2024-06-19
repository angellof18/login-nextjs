import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const data = await request.json()

        await conn.query('START TRANSACTION');

        const correo = await conn.query('SELECT * FROM usuarios WHERE correo = ?', [data.correo])
        const usuario = await conn.query('SELECT * FROM usuarios WHERE usuario = ?', [data.usuario])

        if (correo.length > 0) {
            await conn.query('ROLLBACK');
            return NextResponse.json({ message: 'El correo ya esta registrado a otra cuenta' })
        } else if (usuario.length > 0) {
            await conn.query('ROLLBACK');
            return NextResponse.json({ message: 'El usuario ya existe' })
        } else {
            await conn.query('INSERT INTO usuarios SET ?', [data])
            await conn.query('COMMIT');
            return NextResponse.json({ message: 'Registro exitoso' })
        }

    } catch (err) {
        await conn.query('ROLLBACK');
        return NextResponse.json({
            message: err.message
        })
    } finally {
        // Finalizar la conexión después de cada uso
        await conn.end();
    }
}