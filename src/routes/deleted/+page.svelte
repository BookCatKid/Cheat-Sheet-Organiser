<script lang="ts">
    import { onMount } from 'svelte';
    import CheatSheet from '$lib/CheatSheet.svelte';
  
    let cheatSheets: string | any[] = [];
    let imageSize = 100; // Initial image size in percentage
  
    // Load cheat-sheets from the JSON file
    onMount(async () => {
      const response = await fetch('/cheat-sheets.json');
      if (response.ok) {
        cheatSheets = await response.json();
      } else {
        console.error('Failed to load cheat-sheets');
      }
    });
  </script>
    
  <section class="sheets-container">
    <h1>Deleted Cheat-Sheets</h1>
  
    <label for="imageSize">Image Size: {imageSize}%</label>
    <input
      type="range"
      id="imageSize"
      min="10"
      max="150"
      bind:value={imageSize}
    />
  
    {#if cheatSheets.length > 0}
      {#each cheatSheets as cheatSheet}
        {#if cheatSheet.deleted}
            <CheatSheet
                title={cheatSheet.title}
                description={cheatSheet.description}
                fileUrl={cheatSheet.fileUrl}
                imageSize={imageSize}
                buttonText="Restore"
            />
        {/if}
      {/each}
    {:else}
      <p>loading...</p>
    {/if}
  </section>
  
  <style>
    .sheets-container {
      padding: 20px;
      background-color: #121212; /* Dark background */
      color: white; /* White text */
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  
    h1 {
      margin-bottom: 20px;
      color: #00ff00; /* Green color for headings */
    }
  
    label {
      display: block;
      margin-bottom: 10px;
      color: #00ff00; /* Green color for labels */
    }
  
    input[type="range"] {
      width: 100%;
      margin-bottom: 20px;
    }
  </style>
  