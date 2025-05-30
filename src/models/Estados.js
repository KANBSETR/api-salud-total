import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";


// ARCHIVO SOLO PAR EFECTOS DE PRUEBAS, NO VAMOS A RECUPERAR DATOS DE LA TABLA ESTADOS
//
//
// ARCHIVO SOLO PAR EFECTOS DE PRUEBAS, NO VAMOS A RECUPERAR DATOS DE LA TABLA ESTADOS
//
//
// ARCHIVO SOLO PAR EFECTOS DE PRUEBAS, NO VAMOS A RECUPERAR DATOS DE LA TABLA ESTADOS





// Tabla Estados
/*
CREATE TABLE estados (
    id_estado SERIAL PRIMARY KEY,
    estado VARCHAR(200) NOT NULL
);
*/

export const Estados = sequelize.define('estados', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    estado: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
},{
    tableName: 'estados',
    timestamps: false // Para no crear los campos createdAt y updatedAt
})

