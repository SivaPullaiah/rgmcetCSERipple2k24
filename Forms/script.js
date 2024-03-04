function checkFields() {
  var name = document.getElementById('name').value.trim();
  var regno = document.getElementById('regno').value.trim();
  var clgName = document.getElementById('clgName').value.trim();
  var branch = document.getElementById('Branch').value.trim();
  var semister = document.getElementById('Semister').value.trim();
  var email = document.getElementById('email').value.trim();
  var phone = document.getElementById('phone').value.trim();

  var isValid = true;

  // Validation for Name
  if (name === '') {
    isValid = false;
  }

  // Validation for Reg.No.
  if (regno === '') {
    isValid = false;
  }

  // Validation for College Name
  if (clgName === '') {
    isValid = false;
  }

  // Validation for Branch
  if (branch === '') {
    isValid = false;
  }

  // Validation for Year & Semester
  if (semister === '') {
    isValid = false;
  }

  // Validation for Email
  if (email === '' || !isValidEmail(email)) {
    isValid = false;
  }

  // Validation for Phone
  if (phone === '' || !isValidPhone(phone)) {
    isValid = false;
  }

  // Enable/disable Next button based on validation
  var nextButton = document.getElementById('nextButton');
  nextButton.disabled = !isValid;
}

// Function to validate email format
function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate phone format
function isValidPhone(phone) {
  // Regular expression to match Indian phone numbers with or without country code
  var phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
  return phoneRegex.test(phone);
}

// oldcode
let sections = document.querySelectorAll('[id^="section"]');
if (sections.length > 1) {
  let sectionOne = sections[0];
  sections.forEach((section) => {
    if (section != sectionOne) {
      $(section).css('display', 'none');
    }
  });
}

const display = (sectionId) => {
  makeRemainingScreensInvisible(sectionId);
  let section = document.getElementById(sectionId);
  $(section).css('display', 'block');
  // window.scrollTo(0, 0);
};

const makeRemainingScreensInvisible = (sectionId) => {
  let sections = document.querySelectorAll('[id^="section"]');
  let firstSection = document.querySelector('.first_section');
  let secondSection = document.querySelector('.second_section');

  sections.forEach((section) => {
    if (section.id !== sectionId) {
      $(section).css('display', 'none');
    }
  });

  if (sectionId === 'sectionFirst') {
    $(firstSection).addClass('selected_section');
    $(secondSection).removeClass('selected_section');
  } else if (sectionId === 'sectionSecond') {
    $(firstSection).removeClass('selected_section');
    $(secondSection).addClass('selected_section');
  }
};

document.addEventListener('DOMContentLoaded', function () {
  // Function to check if all input fields are filled
  function checkFields() {
    var inputs = document.querySelectorAll('.inputEle');
    var filled = true;
    inputs.forEach(function (input) {
      if (input.value.trim() === '') {
        filled = false;
      }
    });
    return filled;
  }

  let imageUrl = 'test';
  const toolTip = (id) => {
    // Update the tooltip content
    const tooltipText = document.querySelector('.tooltiptext');
  };

  let url =
    'https://script.google.com/macros/s/AKfycbyvx5RlO-1trf-pLBHZ_HFL_iEgUfV5nzAKLBFxgv8ASbFZP228JKbY8XxCzeMWrfGAoQ/exec';
  let file = document.querySelector('#image');
  let img = document.querySelector('img');
  let submit_button = document.getElementById('submit-button');
  submit_button.disabled = true;
  let upload_image_status = document.getElementById('status_of_image_upload');
  file.addEventListener('change', () => {
    let fr = new FileReader();
    fr.addEventListener('loadend', () => {
      upload_image_status.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="Loading..." style="height: 60px;" />`;
      let res = fr.result;
      // Comment out or remove the following line to prevent displaying the image as a preview
      // img.src = res;
      let spt = res.split('base64,')[1];
      let obj = {
        base64: spt,
        type: file.files[0].type,
        name: file.files[0].name,
      };
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(obj),
      })
        .then((r) => r.text())
        .then((data) => {
          imageUrl = data;
          console.log(imageUrl);
          upload_image_status.innerHTML = `<img src="https://res.cloudinary.com/sivapullaiah/image/upload/v1709040534/icons8-tick_qexxjn.gif" alt="Loading..." style="height: 40px" />`;
          submit_button.disabled = false;
        });
    });
    fr.readAsDataURL(file.files[0]);
  });

  const form = document.getElementById('myForm');
  const submitButton = document.getElementById('submit-button');
  const loadingGifUrl =
    'https://leetcode.com/_next/static/images/dark-pending-f313d6fe32951fb6b4d48ad3ee4f3821.gif';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    formData.delete('Image');
    formData.append('Image', imageUrl);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]); // You will see the data here
    }
    const apiUrl =
      'https://script.google.com/macros/s/AKfycbxpqOcKwtHoRUpq9UGaJrFHgDjduDOHt64mjht94ZXE0_lr2cbnt7tD5sd0zoN20s_vGg/exec';

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
          submit_button.disabled = true;
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
        // submit_button.disabled = true;
        upload_image_status.innerHTML = '';
      });
  });
});
