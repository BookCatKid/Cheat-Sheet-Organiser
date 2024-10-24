<script lang="ts">
    import { fade, fly } from 'svelte/transition'; // Import Svelte transitions
    import CheatSheet from './CheatSheet.svelte';

    export let title: string;
    export let description: string;
    export let fileUrl: string;
    export let imageSize: number; // New prop for image size
    export let buttonText: string;

    let sheetRef: HTMLDivElement

    let isModalOpen = false; // Track modal state

    // Function to open the modal
    function openModal() {
        isModalOpen = true;
    }

    // Function to close the modal
    function closeModal() {
        isModalOpen = false;
    }

    async function markImage(imageUrl: string, deletedValue: boolean) {
        try {
            const response = await fetch('/api/images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fileName: imageUrl, deletedValue })
            });

            const data = await response.json();

            if (data.success) {
                const action = deletedValue ? 'deleted' : 'restored';
                console.log(`Image marked as ${action} successfully!`);
                alert(`Image marked as ${action} successfully!`);
                sheetRef.remove();
            } else {
                console.error(`Failed to mark image as ${deletedValue ? 'deleted' : 'restored'}.`);
                alert(`Failed to mark image as ${deletedValue ? 'deleted' : 'restored'}.`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error);
        }
    }

    // Function to modify the cheat sheet deleted value
    function modifyCheatSheet() {
        console.log('Modifying cheat sheet:', fileUrl);
        if (buttonText === 'Delete') {
            markImage(fileUrl, true);
        } else if (buttonText === 'Restore') {
            markImage(fileUrl, false);
        } else {
            console.error('Invalid button text:', buttonText);
            alert('Invalid button text: ' + buttonText);
        }
    }
</script>

<div class="cheat-sheet" style="width: {imageSize}%;" bind:this={sheetRef}>
    <h2 style="word-wrap: break-word;">{title}</h2>
    <p style="word-wrap: break-word;">{description}</p>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div class="image-container">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img src={fileUrl} alt={title} on:click={openModal} />
    </div>
    
    <!-- Delete Button -->
    <button class="delete" on:click={modifyCheatSheet} aria-label={buttonText}>{buttonText}</button>

    {#if isModalOpen}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="modal" on:click={closeModal} transition:fade={{ duration: 300 }}>
            <img class="modal-content" src={fileUrl} alt={title} transition:fly={{ y: 20, duration: 300 }} />
            <button class="close" on:click={closeModal} aria-label="Close modal">&times;</button>
        </div>
    {/if}
</div>

<style>
    .cheat-sheet {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 20px;
        background-color: #1c1c1c; /* Dark background */
        color: white; /* White text */
        transition: box-shadow 0.3s ease;
    }

    .cheat-sheet:hover {
        box-shadow: 0 4px 15px rgba(0, 255, 0, 0.5); /* Green shadow on hover */
    }

    .image-container {
        width: 100%; /* Full width for the container */
        overflow: hidden; /* Prevent overflow */
        display: flex; /* Allow wrapping of images */
        justify-content: center; /* Center the image */
        margin-top: 10px;
    }

    img {
        max-width: 100%; /* Ensure image fits the container */
        height: auto; /* Maintain aspect ratio */
        flex-shrink: 0; /* Prevent shrinking */
        border-radius: 8px;
        cursor: pointer; /* Change cursor to pointer for clickable images */
    }

    /* Delete button styles */
    .delete {
        background-color: #c0392b; /* Red background */
        color: white; /* White text */
        border: none;
        border-radius: 4px;
        padding: 8px 12px;
        cursor: pointer;
        margin-top: 10px;
        transition: background-color 0.3s;
    }

    .delete:hover {
        background-color: #e74c3c; /* Darker red on hover */
    }

    /* Modal styles */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000; /* Bring modal above other content */
        transition: opacity 0.3s ease; /* Smooth opacity transition */
    }

    .modal-content {
        max-width: 90%; /* Limit modal image size */
        max-height: 90%; /* Limit modal image height */
        border-radius: 8px;
    }

    .close {
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        font-size: 30px;
        font-weight: bold;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
    }

    .close:hover {
        color: red; /* Change close button color on hover */
    }
</style>
