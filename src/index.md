---
layout: default
---

<style>
  form {
    margin-top: 1rem;
  }

  form label,
  form input,
  .generated-image-url,
  form button {
    color: var(--text);
    display: block;
    font-family: var(--font-family);
    font-size: 1rem;
  }

  form input,
  .generated-image-url {
    border: 1px solid var(--text);
    border-radius: 0.25rem;
    line-height: 1.1;
    margin-top: 0.25rem;
    padding: 0.75rem 1rem;
    width: 100%;
  }

  form button {
    background: navy;
    border: none;
    border-radius: 0.25rem;
    color: white;
    font-size: 1.25rem;
    font-weight: 900;
    padding: 0.5rem 1rem;
  }

  .output.hidden {
    display: none;
  }

  .generated-image-url {
    display: block;
    width: 100%;
  }

  .generated-image {
    display: block;
    width: 100%;
  }
</style>

# Create a Social Media Image!

<form action="/.netlify/functions/get-image-url" method="POST">
  <label for="caption">Enter the text that should appear on the image (e.g. the article title):</label>
  <input id="caption" name="caption" type="text" />

  <label for="size">If it doesn’t fit, you can adjust the font size here:</label>
  <input id="size" name="size" type="number" value="110" min="10" />

  <button>Generate Image</button>
</form>

<p>
  This is powered by <a href="https://jason.af/cloudinary">Cloudinary</a> and <a href="https://www.netlify.com/products/functions/?utm_source=site&utm_medium=netlify-social-images-jl&utm_campaign=devex">Netlify Functions</a>. You can set up your own social media image generator in one click by <a href="https://app.netlify.com/start/deploy?repository=https://github.com/jlengstorf/netlify-social-image-generator&utm_source=site&utm_medium=netlify-social-images-jl&utm_campaign=devex">deploying your own instance to Netlify</a>.
</p>

<div class="output hidden">
  <h2>Right click and save this image to your repo.</h2>
  <img class="generated-image" alt="" />

  <h3>The full Cloudinary URL of this image is:</h3>
  <input type="text" class="generated-image-url" disabled />
</div>

<script>
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);

    fetch('/.netlify/functions/get-image-url', {
      method: 'POST',
      body: JSON.stringify({
        caption: data.get('caption'),
        size: data.get('size'),
      }),
    })
      .then(res => res.text())
      .then(url => {
        const output = document.querySelector('.output');
        const input = document.querySelector('.generated-image-url');
        const img = document.querySelector('.generated-image');

        input.value = url;
        img.src = url;

        output.classList.remove('hidden');
      });
  });
</script>
