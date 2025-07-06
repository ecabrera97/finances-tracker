import express from "express"
import cors from "cors"
import sequelize from "./src/config/database.js"
import expensesRoutes from "./src/routes/expenses.js"
import expenseTypeRoutes from "./src/routes/expenses_type.js"
import { config } from "dotenv"

config()
const app = express()

app.use(cors())
app.use(express.json())
app.use("/expenses", expensesRoutes)
app.use("/expenses-type", expenseTypeRoutes)


const PORT = process.env.PORT || 8080
sequelize.authenticate().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on port %s", PORT)
    })
}).catch((err) => {
    console.log("Unable to connect to DB:", err)
})