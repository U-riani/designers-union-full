// backend/routes/newsRoutes.js
const express = require('express');
const { 
  saveNews, 
  getAllNews, 
  getSingleNews, 
  getLast5News, 
  updateSingleNews, 
  deleteNews, 
  getSomeNews
} = require('../controllers/newsControllers');
const { validateNewsData } = require('../middleware/newsMiddleware');
const { handleImageUpload } = require('../middleware/imageMiddleware');

const router = express.Router();

// Route to save news
router.post('/news', handleImageUpload, validateNewsData, saveNews);

// Route to get all news
router.get('/news', getAllNews);

// For Vercel testing
router.get('/test', async (req, res) => {
  try {
    res.json({ message: 'News endpoint is working' });
  } catch (err) {
    res.json({ error: err.message, myError: 'my error' });
  }
});

// Route to get a single news article by ID
router.get('/news/:id', getSingleNews);

// Route to update a single news article by ID
router.patch('/news/:id', handleImageUpload, updateSingleNews);

// Route to delete a single news article by ID
router.delete('/news/:id', deleteNews);

// Get last 5 news for cardsSlider
router.get('/last5News', getLast5News);

router.get('/paginated', getSomeNews);

module.exports = router;
