import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

// Modelo Medico

/*
CREATE TABLE medicos (
    id_medico SERIAL PRIMARY KEY,
    certificacion VARCHAR(200) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT true,
    id_especialidad INTEGER NOT NULL REFERENCES especialidades(id_especialidad),
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario)
);
*/

export const Medico = sequelize.define('medico', {
    id_medico: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    certificacion: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    id_especialidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'especialidades', // Nombre de la tabla referenciada
            key: 'id_especialidad' // Clave primaria de la tabla referenciada
        }
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios', // Nombre de la tabla referenciada
            key: 'id_usuario' // Clave primaria de la tabla referenciada
        }
    }
}, {
    tableName: 'medicos',
    timestamps: false // Desactiva los campos createdAt y updatedAt
});

