import { Model, DataTypes } from "sequelize";
import { sequelize } from '../instances/mysql';

export interface NoteInstance extends Model {
    id: number;
    noteName: string;
    noteContent: string;

}

export const Note = sequelize.define<NoteInstance>('Note', {
    id: {
        primaryKey: true, 
        autoIncrement: true,
        type: DataTypes.INTEGER
    }, 
    noteName: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    noteContent:{
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    tableName: 'notes',
    timestamps: false
}
)

