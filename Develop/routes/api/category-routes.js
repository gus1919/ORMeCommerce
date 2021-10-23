const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
        attributes: ['id', 'category_name'],
        include: [
          {
           model: Product,
           attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] 
          }
        ]
      });
      res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (_req, _res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] 
        }
      ]
    });
    if (!categoryData) {
      res.status(404).json({message: 'No Category Found!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (_req, _res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (_req, _res) => {
  // update a category by its `id` value
});

router.delete('/:id', (_req, _res) => {
  // delete a category by its `id` value
});

module.exports = router;
