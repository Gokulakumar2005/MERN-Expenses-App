import { ExpenseModel } from "../model/ExpenseModel.js";

const ExpenseCtrl = {};

ExpenseCtrl.create = async (req, res) => {
    try {
        console.log("Incoming Request Body:", JSON.stringify(req.body, null, 2));

        if (req.file) {
            console.log("File Uploaded Successfully:", JSON.stringify(req.file, null, 2));
        } else {
            console.log("WARNING: No file received in req.file. Check Cloudinary credentials.");
        }

        const { title, date, amount, description, category } = req.body;
        const userId = req.user.id;
        const receiptUrl = req.file ? (req.file.path || req.file.secure_url) : null;

        const expense = new ExpenseModel({
            userId,
            title,
            date,
            amount,
            description,
            category,
            receiptUrl
        });

        console.log("Saving Expense to MongoDB:", JSON.stringify(expense, null, 2));
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        console.error("CRITICAL ERROR in ExpenseCtrl.create:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

ExpenseCtrl.list = async (req, res) => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const expenses = await ExpenseModel.find({ userId })
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        const totalItems = await ExpenseModel.countDocuments({ userId });

        res.json({
            expenses,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            totalItems
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

ExpenseCtrl.getStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await ExpenseModel.find({ userId }).sort({ date: 1 });

        const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        // Group by date for chart
        const dailyTrends = expenses.reduce((acc, exp) => {
            const date = new Date(exp.date).toLocaleDateString();
            acc[date] = (acc[date] || 0) + exp.amount;
            return acc;
        }, {});

        const chartData = Object.keys(dailyTrends).map(date => ({
            date,
            amount: dailyTrends[date]
        })).sort((a, b) => new Date(a.date) - new Date(b.date));

        // Group by category for pie chart
        const categoryDataMap = expenses.reduce((acc, exp) => {
            const cat = exp.category || 'Other';
            acc[cat] = (acc[cat] || 0) + exp.amount;
            return acc;
        }, {});

        const categoryData = Object.keys(categoryDataMap).map(name => ({
            name,
            value: categoryDataMap[name]
        }));

        // Individual transactions for the pie chart (Limited to top 15 for readability)
        const transactionData = expenses
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 15)
            .map(exp => ({
                name: exp.title,
                value: exp.amount
            }));

        res.json({
            totalAmount,
            totalCount: expenses.length,
            chartData,
            categoryData,
            transactionData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

ExpenseCtrl.remove = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const expense = await ExpenseModel.findOneAndDelete({ _id: id, userId });
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.json({ message: "Expense removed successfully", id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

ExpenseCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { title, date, amount, description, category } = req.body;
        const receiptUrl = req.file ? (req.file.path || req.file.secure_url) : undefined;

        const updateData = { title, date, amount, description, category };
        if (receiptUrl) {
            updateData.receiptUrl = receiptUrl;
        }

        const expense = await ExpenseModel.findOneAndUpdate(
            { _id: id, userId },
            { $set: updateData },
            { new: true }
        );

        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default ExpenseCtrl;
