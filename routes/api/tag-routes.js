const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', (req, res) => {
  try{
    const tagsData = Tag.findAll({
      include: [{model: ProductTag}],
    });
    res.status(200).json(tagsData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  try{
    const tagsData = Tag.findByPk(req.params.id, {
      include: [{model: ProductTag}],
    });
    if(!tagsData){
      res.status(404).json({message: 'No tag found with that id.'});
      return;
    }

    res.status(200).json(tagsData);
  }catch (error) {
    res.status(500).json(error);
  }
});

// create a new tag
router.post('/', (req, res) => {
  try{
    const tagsData = Tag.create(req.body);
    res.status(200).json(tagsData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  try{
    const tagsData = Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    
    if(!tagsData){
      res.status(404).json({message: 'No tag found with that id.'});
      return;
    }
    res.status(200).json(tagsData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
