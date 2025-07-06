import express from "express"
import { Expense } from "../models/expense.js"

const router = express.Router()

router.post("/", async(req, res) => {
    try {
        const expense = await Expense.create(req.body)
        res.status(201).json(expense)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.get("/", async(req, res) => {
    try {
        const expenses = await Expense.findAll()
        res.status(202).json(expenses)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params
        const expense = await Expense.findByPk(id)
        res.status(202).json(expense)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params
        const expense = await Expense.findByPk(id)
        expense.set(req.body)
        await expense.save()
        res.status(202).json(expense)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params
        await Expense.destroy({
            where: {
                id: id
            }
        })
        res.status(204).send()
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default router