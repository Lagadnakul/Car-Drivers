// frontend/src/hooks/useImageUpload.js
import { useState } from 'react';
import { uploadImage } from '../services/imageKitService';

export const useImageUpload = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpload = async (file, folder) => {
        try {
            setLoading(true);
            setError(null);
            const result = await uploadImage(file, folder);
            return result.url;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleUpload, loading, error };
};