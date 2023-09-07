document.addEventListener("DOMContentLoaded", function () {
    // Get references to elements
    const pickGameButton = document.getElementById("pickGameButton");
    const gameInfoDiv = document.getElementById("gameInfo");
    const gameName = document.getElementById("gameName");
    const gameLink = document.getElementById("gameLink");
    const copyLinkButton = document.getElementById("copyLinkButton");
    const openLinkButton = document.getElementById("openLinkButton");

    // Define an array to store game data
    let gameData = [];

    // Load JSON data from data.json
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            gameData = data;

            // Function to generate a random number
            function getRandomNumber(max) {
                return Math.floor(Math.random() * max);
            }

            // Function to display game information
            function displayGameInfo() {
                if (gameData.length === 0) {
                    return;
                }

                const randomIndex = getRandomNumber(gameData.length);
                const selectedGame = gameData[randomIndex];

                gameName.textContent = selectedGame.name;
                gameLink.textContent = selectedGame.link;

                // Set the link href for the "Open Link" button
                openLinkButton.href = selectedGame.link;

                // Show the game information section
                gameInfoDiv.style.display = "block";
            }

            // Event listener for the "Pick a Game" button
            pickGameButton.addEventListener("click", displayGameInfo);

            // Event listener for the "Copy Link" button
            copyLinkButton.addEventListener("click", function () {
                const tempInput = document.createElement("input");
                tempInput.value = gameLink.textContent;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand("copy");
                document.body.removeChild(tempInput);
                alert("Game link copied to clipboard!");
            });
        })
        .catch(error => console.error("Error loading JSON data: " + error));
});
