document.addEventListener('DOMContentLoaded', function () {
  const toolTip = (id) => {
    // Update the tooltip content
    const tooltipText = document.querySelector('.tooltiptext');
  };

  const form = document.getElementById('myForm');
  const submitButton = document.getElementById('submit-button');
  const loadingGifUrl =
    'https://leetcode.com/_next/static/images/dark-pending-f313d6fe32951fb6b4d48ad3ee4f3821.gif';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const apiUrl =
      'https://script.google.com/macros/s/AKfycbwmkw4MRisKueud4Ljh61UKci_0Bh3vSN26_P-xvCVjTDKElqJF3Vo1SMuIqf-naNd-iA/exec';

    // Change button text to loading GIF with reduced height
    submitButton.innerHTML = `<img src="${loadingGifUrl}" alt="Loading..." style="height: 30px;" />`;

    fetch(apiUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const successMessage = document.getElementById('msg-success');
        successMessage.textContent = data.success ? data.message : data.message;

        // Check if success is true
        if (data.success) {
          // Add a CSS class to change text color to green
          successMessage.classList.add('success-message');
          // Reset the form
          setTimeout(() => {
            successMessage.textContent = '';
            // Reset the class to remove the green color
            successMessage.classList.remove('success-message');
            form.reset();
          }, 5000);
        } else {
          // Add a CSS class to change text color to red
          successMessage.classList.add('error-message');
        }
      })

      .catch((error) => {
        console.error('Error:', error);
        const errorMessage = document.getElementById('msg-success');
        errorMessage.textContent = 'Error submitting the form';
      })
      .finally(() => {
        // Revert button text back to "Submit"
        submitButton.textContent = 'Submit';
      });
  });
});
