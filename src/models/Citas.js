import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

// Modelo para la tabla Citas
/**
 * CREATE TABLE citas (
    id_cita SERIAL PRIMARY KEY,
    fec_en DATE NOT NULL,
    hora_cita_inicio TIMESTAMP NOT NULL,
    hora_cita_termino TIMESTAMP NOT NULL,
    motivo_cita VARCHAR(500) NOT NULL,
    token_cita VARCHAR(100) NOT NULL UNIQUE,
    id_medico INTEGER NOT NULL REFERENCES medicos(id_medico),
    id_paciente INTEGER NOT NULL REFERENCES pacientes(id_paciente),
    id_seguro INTEGER NOT NULL REFERENCES seguros(id_seguro),
    id_estado INTEGER NOT NULL REFERENCES estados(id_estado)
);
 */

export const Citas = sequelize.define('citas', {
    id_cita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fec_en: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora_cita_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora_cita_termino: {
        type: DataTypes.DATE,
        allowNull: false
    },
    motivo_cita: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    token_cita: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    id_medico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'medicos', // Nombre de la tabla referenciada
            key: 'id_medico' // Clave primaria de la tabla referenciada
        }
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pacientes', // Nombre de la tabla referenciada
            key: 'id_paciente' // Clave primaria de la tabla referenciada
        }
    },
    id_seguro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'seguros', // Nombre de la tabla referenciada
            key: 'id_seguro' // Clave primaria de la tabla referenciada
        }
    },
    id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estados', // Nombre de la tabla referenciada
            key: 'id_estado' // Clave primaria de la tabla referenciada
        }
    }
},
    {
        tableName: 'citas',
        timestamps: false // Para no crear campos de timestamps automáticamente
    });