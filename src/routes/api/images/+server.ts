import { readdirSync, writeFileSync, readFileSync } from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';

// GET endpoint to fetch images
export const GET = async () => {
  try {
    const uploadsDir = path.join('static', 'uploads');
    const files = readdirSync(uploadsDir);

    const images = files.map(file => ({
      name: file,
      delete: false // Initialize delete property to false
    }));
    
    return json({ images });
  } catch (error) {
    console.error('Error reading uploads directory:', error);
    return json({ images: [] }, { status: 500 });
  }
};

// POST endpoint to mark an image as deleted
export const POST = async ({ request }) => {
  const { fileName, deletedValue } = await request.json();

  try {
    const jsonFilePath = path.join('static', 'cheat-sheets.json'); // Replace with your JSON file path
    const jsonData = JSON.parse(readFileSync(jsonFilePath, 'utf-8'));

    // Find the image and mark it as deleted
    const image = jsonData.find((item: { fileUrl: string | any[]; }) => item.fileUrl.includes(fileName));
    if (image) {
      image.deleted = deletedValue;
    }

    // Write the updated data back to the JSON file
    writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

    return json({ success: true });
  } catch (error) {
    console.error('Error updating JSON file:', error);
    return json({ success: false }, { status: 500 });
  }
};
