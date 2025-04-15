import express from 'express';
import ImageKit from 'imagekit';
const router = express.Router();

// Initialize ImageKit with your credentials
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Route to get authentication parameters
router.get('/auth', (req, res) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    res.status(200).json(authParams);
  } catch (error) {
    console.error('ImageKit auth error:', error);
    res.status(500).json({ error: 'Failed to generate authentication parameters' });
  }
});

export default router;