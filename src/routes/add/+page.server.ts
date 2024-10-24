import { fail } from '@sveltejs/kit';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const filePath = join('static', 'cheat-sheets.json');

// Helper function to load existing cheat-sheets
function loadCheatSheets() {
  if (existsSync(filePath)) {
    const fileContents = readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents);
  } else {
    return [];
  }
}

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('fileToUpload') as File;

    if (!title || !description || !file) {
      return fail(400, {
        error: true,
        message: 'All fields are required'
      });
    }

    // You can also save the file in a folder if needed
    const fileName = file.name;

    // Read file as Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Save the file to a 'static/uploads' folder
    const fileUploadPath = join('static', 'uploads', fileName);
    writeFileSync(fileUploadPath, fileBuffer);

    // Load existing cheat-sheets
    const cheatSheets = loadCheatSheets();

    // Create new entry
    const newCheatSheet = {
      title,
      description,
      fileUrl: `/uploads/${fileName}`, // Path where the file is accessible
    };

    // Add new cheat-sheet
    cheatSheets.push(newCheatSheet);

    // Save the updated cheat-sheets to the JSON file
    writeFileSync(filePath, JSON.stringify(cheatSheets, null, 2));

    return {
      success: true
    };
  }
};
