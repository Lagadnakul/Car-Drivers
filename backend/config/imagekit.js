// backend/config/imagekit.js
import ImageKit from 'imagekit';
import dotenv from 'dotenv';

dotenv.config({path:'./.env.local'});

// Initialize ImageKit with your credentials from .env
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

console.log("ImageKit initialized with URL endpoint:", process.env.IMAGEKIT_URL_ENDPOINT);

export default imagekit;