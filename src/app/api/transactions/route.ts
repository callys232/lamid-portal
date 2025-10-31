import express, { Request, Response } from "express";
import Transaction from "../../models/Transactions";

const router = express.Router();

// GET all transactions
router.get("/", async (req: Request, res: Response) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

// GET transaction by ID
router.get("/:id", async (req: Request, res: Response) => {
  const transaction = await Transaction.findById(req.params.id);
  res.json(transaction);
});

// POST new transaction
router.post("/", async (req: Request, res: Response) => {
  const newTransaction = new Transaction(req.body);
  await newTransaction.save();
  res.status(201).json(newTransaction);
});

// PUT update transaction
router.put("/:id", async (req: Request, res: Response) => {
  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE transaction
router.delete("/:id", async (req: Request, res: Response) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
