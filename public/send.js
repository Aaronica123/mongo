 function showMessage(message, type) {
            const messageBox = document.getElementById('form-message');
            messageBox.textContent = message;
            messageBox.className = `message-box ${type} visible`; // Add visible class
            setTimeout(() => {
                messageBox.classList.remove('visible'); // Hide after 3 seconds
            }, 3000);
        }

        // Handle form submission
        document.getElementById('userForm').addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:3500/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                const result = await response.json();

                if (response.ok) {
                    showMessage('User added successfully!', 'success');
                    document.getElementById('userForm').reset(); // Clear the form
                    // No fetchData() call here as this HTML file doesn't display data
                } else {
                    showMessage(`Error: ${result.message || 'Failed to add user'}`, 'error');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showMessage(`Failed to connect to server: ${error.message}`, 'error');
            }
        });
        document.getElementById('next').addEventListener('click', () => {
            window.location.href = 'http://localhost:3500/diplsay.html'; // Adjust to your display HTML file name
        });