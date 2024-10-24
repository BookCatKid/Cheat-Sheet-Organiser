<script lang="ts">  
    let title = '';
    let description = '';
  </script>
    
  <section class="form-container">
    <h1>Add a Cheat-Sheet</h1>
    <form method="post" enctype="multipart/form-data">
      
      <div class="form-group">
        <label for="title">Cheat-Sheet Title</label>
        <input type="text" id="title" name="title" bind:value={title} placeholder="Enter the title of the cheat-sheet" required />
      </div>
  
      <div class="form-group">
        <label for="description">Cheat-Sheet Description</label>
        <textarea id="description" name="description" bind:value={description} placeholder="Enter a brief description" required></textarea>
      </div>
  
      <div class="form-group">
        <label for="file">Upload Cheat-Sheet File</label>
        <input type="file" id="file" name="fileToUpload" required />
      </div>
  
      <button type="submit">Submit</button>
    </form>
  </section>
  
  
  <style>
    :root {
      --dark-bg: #121212;
      --dark-accent: #1f1f1f;
      --primary-color: #28a745; /* Green color for accents */
      --text-color: #ffffff;
      --input-bg: #2a2a2a;
      --input-border: #333;
    }
  
    .form-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background-color: var(--dark-accent);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      color: var(--text-color);
    }
  
    h1 {
      text-align: center;
      color: var(--primary-color);
      margin-bottom: 1.5rem;
    }
  
    .form-group {
      margin-bottom: 1.5rem;
    }
  
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: var(--primary-color);
    }
  
    .form-group input[type="text"],
    .form-group textarea,
    .form-group input[type="file"] {
      width: 100%;
      padding: 0.75rem;
      background-color: var(--input-bg);
      border: 1px solid var(--input-border);
      border-radius: 4px;
      font-size: 1rem;
      color: var(--text-color);
    }
  
    .form-group textarea {
      height: 100px;
      resize: vertical;
    }
  
    button {
      display: inline-block;
      width: 100%;
      padding: 0.75rem;
      background-color: var(--primary-color);
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 4px;
      font-size: 1rem;
      transition: background-color 0.3s;
    }
  
    button:hover {
      background-color: #218838; /* Darker green */
    }
  </style>
  