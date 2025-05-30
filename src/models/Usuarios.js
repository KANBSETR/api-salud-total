import { sequelize } from '../db.js';
import { DataTypes } from 'sequelize';


// Definición del modelo Usuario
/*
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    rut VARCHAR(12) NOT NULL,
    correo VARCHAR(200) NOT NULL,
    contrasena VARCHAR(200) NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    ap_paterno VARCHAR(200) NOT NULL,
    ap_materno VARCHAR(200) NOT NULL,
    sexo BOOLEAN NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT true
);
*/

export const Usuarios = sequelize.define('Usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    rut: {
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true
    },
    correo: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    contrasena: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    ap_paterno: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    ap_materno: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    sexo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'usuarios',
    timestamps: false // Desactivar los campos createdAt y updatedAt
});