import { fail } from '@sveltejs/kit';
import { writeFileSync } from 'fs';
import path from 'path';

export const actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());

    const file = formData.fileToUpload as File;

    if (!file || !file.name || file.name === 'undefined') {
      return fail(400, {
        error: true,
        message: 'You must provide a valid file to upload',
      });
    }

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const fileExtension = path.extname(file.name);

    if (!allowedExtensions.includes(fileExtension)) {
      return fail(400, {
        error: true,
        message: 'Invalid file type. Only images are allowed.',
      });
    }

    try {
      // Define your upload path here
      const uploadPath = path.join('static', 'uploads', file.name);

      // Save the file to the desired folder (e.g., /static/uploads)
      writeFileSync(uploadPath, Buffer.from(await file.arrayBuffer()));

      return {
        success: true,
        message: 'File uploaded successfully!',
      };
    } catch (error) {
      console.error('File upload error:', error);
      return fail(500, {
        error: true,
        message: 'Something went wrong while uploading the file.',
      });
    }
  }
};
