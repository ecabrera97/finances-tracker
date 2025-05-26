import { DataTypes } from "sequelize"
import sequelize from "../config/database.js"

const Expense = sequelize.define(
    "Expense",
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: "expenses_type",
                key: "type"
            }
        },
        description: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        shared: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: "expenses",
        timestamps: true,
        underscored: true,
    }
)

const ExpenseType = sequelize.define(
    "ExpenseType",
    {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        tableName: "expenses_type",
        timestamps: true
    }
)

Expense.belongsTo(ExpenseType, 
    {
        foreignKey: "type",
        targetKey: "type",
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    }
)

export {
    Expense,
    ExpenseType
}