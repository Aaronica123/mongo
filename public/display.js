 async function fetchData() {
            const dataDisplay = document.getElementById('data-display');
            dataDisplay.innerHTML = '<p class="text-gray-500">Loading data...</p>'; // Show loading state

            try {
                // Make a GET request to your server's API endpoint
                // The URL was changed from '/api/data' to 'http://localhost:3500/api/data'
                // to ensure it resolves correctly when the HTML is served from a blob URL.
                const response = await fetch('http://localhost:3500/api/data');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json(); // Parse the JSON response

                // Clear previous content
                dataDisplay.innerHTML = '';

                if (data && data.length > 0) {
                    // Iterate over the data and create HTML elements to display it
                    data.forEach(item => {
                        const card = document.createElement('div');
                        card.className = 'data-card w-full'; // Apply Tailwind classes for styling
                        card.innerHTML = `
                           <h3 class="text-lg font-semibold text-gray-800">Username: ${item.username || 'N/A'}</h3>
                           <p class="text-gray-700">Email: ${item.email || 'N/A'}</p>
                            <p class="text-gray-700">Password: ${item.password || 'N/A'}</p>
                          
                        `;
                        dataDisplay.appendChild(card);
                    });
                } else {
                    dataDisplay.innerHTML = '<p class="text-gray-500">No data received from the server.</p>';
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                dataDisplay.innerHTML = `<p class="text-red-500">Failed to load data: ${error.message}</p>`;
            }
        }

        // Add event listener to the refresh button
        document.getElementById('refreshButton').addEventListener('click', fetchData);

        // Fetch data when the page loads
        window.onload = fetchData;