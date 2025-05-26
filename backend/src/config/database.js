import { Sequelize } from "sequelize"
import { config } from "dotenv"
http://127.0.0.1:8081/expenses/
config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
)

export default sequelize