const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try{
    const categoriesData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoriesData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try{
    const categoriesData = await Category.findByPk(req.params.id, {
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
router.post('/', async (req, res) => {
  try{
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((error) => {
    res.json(error);
  })
//   try {
//     const categoryUpdate = await Category.update(
//       {
//         category_name: req.body.category_name,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     res.status(200).json(categoryUpdate);
//   } catch (error) {
//     res.status(500).json(error);
//   }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try{
    const categoriesData = await Category.destroy({
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
