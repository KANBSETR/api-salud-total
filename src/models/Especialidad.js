import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

// Modelo Especialidades
/*
CREATE TABLE especialidades (
    id_especialidad SERIAL PRIMARY KEY,
    nom_espe VARCHAR(200) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT true
);
*/

export const Especialidad = sequelize.define('especialidad', {
    id_especialidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_espe: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'especialidades',
    timestamps: false // Desactiva los campos createdAt y updatedAt
});