import express from "express"
import { ExpenseType } from "../models/expense.js"

const router = express.Router()

router.post("/", async(req, res) => {
    try {
        const expense_type = await ExpenseType.create(req.body)
        res.status(201).json(expense_type)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.get("/", async(req, res) => {
    try {
        const expense_types = await ExpenseType.findAll()
        res.status(202).json(expense_types)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params
        await ExpenseType.destroy({
            where: {
                type: id
            }
        })
        res.status(204).send()
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default router