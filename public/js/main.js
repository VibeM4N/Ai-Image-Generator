/**
 * Alternate 
 * 👇
 */

function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  const promptError = document.querySelector('#promptError');
  promptError.textContent = ''; // Clear any previous error message

  if (prompt === '') {
    promptError.textContent = 'Please add some text';
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    console.log(data);

    const imageUrl = data.data;

    document.querySelector('#image').src = imageUrl;

    removeSpinner();
  } catch (error) {
    if (error instanceof DOMException) {
      // Handle network errors or other exceptions
      document.querySelector('.msg').textContent = 'An error occurred. Please try again.';
    } else {
      const errorMessage = error.message || 'An unknown error occurred.';

      // Handle specific error types and messages
      if (error.error && error.error.type === 'invalid_request_error' && error.error.message.includes('not allowed by our safety system')) {
        document.querySelector('.msg').textContent = 'The entered text contains words that are not allowed. Please try again with different text.';
      } else {
        document.querySelector('.msg').textContent = errorMessage;
      }
    }

    console.log(error);
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
