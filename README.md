
---

### **Documentation**

Here is an outline  **docs** that explains the structure and usage of this project:

---

# **Dattebayo API Anime Search Documentation**

## Introduction

The **Dattebayo API Anime Search** is an app designed to allow users to search for various pieces of information from the Naruto universe. It uses the **Dattebayo API** as the source of data and React for building the user interface. The app allows users to search characters, clans, villages, and other related data dynamically.

## App Structure

### 1. **Components**
   - **SearchBar:** The search bar where users type their queries.
   - **Card:** Displays individual data cards for each anime entity (character, clan, etc.).
   - **CategoryFilter:** Allows users to filter results based on category.
   - **Loader:** Shows a loading spinner while data is being fetched from the API.

### 2. **State Management**
   - **char, clans, vill, team, beast, akatsuki, kara:** States to store the data fetched from the API for each category.
   - **search:** Holds the user's search term.
   - **loading:** Tracks the loading state.
   - **activeCategory:** Keeps track of which category filter is active.

### 3. **Fetching Data**
   - The app fetches data from the Dattebayo API using `fetch()` within a `useEffect()` hook to load the data once the component mounts.
   - The data is then set into the respective state variables using `setState`.

### 4. **Filtering Logic**
   - **Search:** The data is filtered by matching the search term with any value in the object (characters, clans, etc.).
   - **Category Filter:** Once a search term is entered, users can further filter the results based on categories (e.g., characters, villages).
   - The filtered data is then displayed in cards.

## API Endpoints

The app makes use of the following API endpoints from the **Dattebayo API**:

- **/characters**: Fetches data for Naruto characters.
- **/clans**: Fetches data for Naruto clans.
- **/villages**: Fetches data for villages in the Naruto universe.
- **/teams**: Fetches data for teams.
- **/tailed-beasts**: Fetches data about the Tailed Beasts.
- **/akatsuki**: Fetches data for the Akatsuki members.
- **/kara**: Fetches data for the Kara organization.

## Categories

The app divides the data into the following categories:

- **Characters:** All characters from the Naruto universe.
- **Clans:** Different clans in the Naruto universe.
- **Villages:** Villages like Konoha, Suna, and others.
- **Teams:** Teams formed in the Naruto series.
- **Tailed Beasts:** The different Tailed Beasts in Naruto.
- **Akatsuki:** The organization of rogue ninjas, Akatsuki.
- **Kara:** A criminal organization from Boruto.

## How to Use

1. **Searching for Entities:**
   - Enter a search term in the search bar to search across all available categories.
   
2. **Filtering by Categories:**
   - Use the category buttons to filter results by specific entities (characters, villages, etc.).
   
3. **Viewing Results:**
   - Each result will display key information such as name, description, image (if available), and more.

4. **Handling Errors:**
   - If no results are found, a message will be shown notifying the user to try another search term.

---

This should cover both the **README** and **project documentation** to help you get started with pushing your project to GitHub! Let me know if you need any further adjustments.
