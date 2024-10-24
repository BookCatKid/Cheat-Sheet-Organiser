<script lang="ts">
    // No script necessary for this simple navigation bar
  </script>
  
  <nav class="navbar">
    <ul>
      <li><a href="/add">Add Cheat-Sheets</a></li>
      <li><a href="/sheets">View Cheat-Sheets</a></li>
      <li><a href="/deleted">View Deleted Cheat-Sheets</a></li>
    </ul>
  </nav>
  
  <style>
    .navbar {
      background-color: #333;
      padding: 1rem;
      display: flex;
      justify-content: center;
    }
  
    .navbar ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 20px;
    }
  
    .navbar ul li {
      display: inline;
    }
  
    .navbar ul li a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      background-color: #555;
      border-radius: 5px;
      transition: background-color 0.3s;
    }
  
    .navbar ul li a:hover {
      background-color: #777;
    }
  </style>
  