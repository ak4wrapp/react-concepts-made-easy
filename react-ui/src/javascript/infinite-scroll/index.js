let container = document.getElementById("image-container");

// This variable is used to prevent multiple fetches at the same time
let isFetching = false;

function fetchImages(numberOfImages = 10) {
  // Implementation for fetching images
  isFetching = true;

  const avatars = [...Array(numberOfImages)].map(
    () => `https://robohash.org/${Math.random().toString(36).slice(2)}`
  );

  avatars.forEach((avatar) => {
    const img = document.createElement("img");
    img.src = avatar;
    img.alt = "Avatar";
    img.width = 300;
    img.height = 300;
    container.appendChild(img);
  });
  container.innerHTML += avatars
    .map(
      (avatar) =>
        `<img src="${avatar}" alt="Avatar" style="width: 400px; height: 400px;" />`
    )
    .join("");

  // Reset the fetching state after images are added only after a short delay to simulate network latency
  setTimeout(() => {
    isFetching = false;
  }, 1000);
}

window.addEventListener("scroll", () => {
  // Check if the user has scrolled to the bottom of the page
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 10
  ) {
    if (!isFetching) {
      fetchImages();
    }
  }
});

// Initial fetch of images when the page loads
fetchImages();
