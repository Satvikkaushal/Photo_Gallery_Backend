const Category = require("../Models/Category")

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id)
        .exec((err, category) => {
            if (err) {
                return res.status(400).json({
                    err: "cannot find category"
                })
            }
            req.category = category;
            console.log(req.category._id);
        })
    next();

}

exports.getAllCategories = (req, res) => {
    res.json(req.category);
}

exports.updateCategory = (req, res) => {
    Category.findByIdAndUpdate(
        { _id: req.category._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) { return res.status(400).json({ err: "Not able to update" }) }
            res.json(user);
        }
    )
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                err: "unable to create Category"
            })
        }
        res.json(category)
    })
}

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if (err) {
            res.status(400).json({
                err: "failed to delete category"
            })
        }
        res.json({
            message: "deleted sucessfully",
            categoryId: category._id,
            categoryName: category.name
        });
    })
}