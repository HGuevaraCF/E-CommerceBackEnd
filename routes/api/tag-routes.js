const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {
  try{
    const tagsData = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tagsData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try{
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
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
router.post('/', async (req, res) => {
  try{
    const tagsData = await Tag.create(req.body);
    res.status(200).json(tagsData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((error) => {
    res.json(error);
  })
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try{
    const tagsData = await Tag.destroy({
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
