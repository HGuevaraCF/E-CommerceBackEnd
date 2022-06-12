const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', (req, res) => {
  try{
    const categoriesData = Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoriesData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// find one category by its `id` value
router.get('/:id', (req, res) => {
  try{
    const categoriesData = Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if(!categoriesData){
      res.status(404).json({message: 'No category found with that id.'});
      return;
    }

    res.status(200).json(categoriesData);
  }catch (error) {
    res.status(500).json(error);
  }
});

// create a new category
router.post('/', (req, res) => {
  try{
    const categoriesData = Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  try{
    const categoriesData = Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    
    if(!categoriesData){
      res.status(404).json({message: 'No category found with that id.'});
      return;
    }
    res.status(200).json(categoriesData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
