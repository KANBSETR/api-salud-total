import { sequelize } from '../db.js';
import { DataTypes } from 'sequelize';

// Definición del modelo Paciente

/*
CREATE TABLE pacientes (
    id_paciente SERIAL PRIMARY KEY,
    fecha_nac DATE NOT NULL,
    telefono VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    fec_reg DATE NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT true,
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario)
);
*/

export const Paciente = sequelize.define('paciente', {
    id_paciente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha_nac: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    fec_reg: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios', // Nombre de la tabla referenciada
            key: 'id_usuario', // Clave primaria de la tabla referenciada
        },
    },
}, {
    tableName: 'pacientes',
    timestamps: false, // Desactiva los campos createdAt y updatedAt
});

