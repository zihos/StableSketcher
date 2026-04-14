window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/

    bulmaSlider.attach();

})

function createGrid() {
  const categoryInput = document.getElementById("categoryInput");
  const galleryGrid = document.getElementById("galleryGrid");
  if (!categoryInput || !galleryGrid) {
      return;
  }
  const category = categoryInput.value;
  galleryGrid.innerHTML = ""; // Clear existing grid

  if (!category) {
      alert("Please select a category.");
      return;
  }

  // Path to the images and sketches
  const basePath = `static/figures/controlsketch_gallery/${category}_50_random/`;
  const maxPairs = 48; // Only use 48 pairs instead of 50
  const rows = 8; // Number of rows
  const cols = 12; // Number of columns (image, sketch, image, sketch...)

  for (let row = 0; row < rows; row++) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("columns", "is-centered");

      for (let col = 0; col < cols; col += 2) { // Each row has 6 image-sketch pairs
          const index = row * (cols / 2) + col / 2; // Calculate index for image-sketch pairs

          if (index >= maxPairs) break; // Stop after 48 pairs (96 images total)

          // Add image
          const imageDiv = document.createElement("div");
          imageDiv.classList.add("column", "is-narrow");

          const image = document.createElement("img");
          image.src = `${basePath}image_${index}.png`;
          image.alt = `Image ${index}`;
          image.classList.add("grid-image-gallery");

          imageDiv.appendChild(image);

          // Add sketch
          const sketchDiv = document.createElement("div");
          sketchDiv.classList.add("column", "is-narrow");

          const sketch = document.createElement("img");
          sketch.src = `${basePath}sketch_${index}.png`;
          sketch.alt = `Sketch ${index}`;
          sketch.classList.add("grid-image-gallery");

          sketchDiv.appendChild(sketch);

          // Append both image and sketch to the row
          rowDiv.appendChild(imageDiv);
          rowDiv.appendChild(sketchDiv);
      }

      galleryGrid.appendChild(rowDiv);
  }
}




document.addEventListener("DOMContentLoaded", () => {
  // Automatically load the default category when the page is loaded
  createGrid();
});


document.addEventListener("DOMContentLoaded", function () {
  const categories = [
      "chair", "parrot", "rabbit", "purse", 
      "kangaroo", "crab", "duck", "fish",  
      "bed", "astronaut", "horse","sculpture" ,
      "giraffe", "hammer", "tomato", "jacket", 
      "pig",  "camel", "yoga", "cat",  
      
  ];

  const basePath = "static/figures/swiftsketch_gallery/";
  const carousel = document.getElementById("category-carousel");
  if (!carousel) {
      return;
  }

  for (let i = 0; i < 5; i++) { // 5 windows, each with 4 categories
      const slide = document.createElement("div");
      slide.classList.add("carousel-item");

      const grid = document.createElement("div");
      grid.classList.add("columns", "is-multiline", "is-centered");

      for (let j = 0; j < 4; j++) { // 4 categories per slide
          const categoryIndex = i * 4 + j;
          if (categoryIndex >= categories.length) break;

          const category = categories[categoryIndex];
          const row = document.createElement("div");
          row.classList.add("column", "is-full");

          const rowContent = document.createElement("div");
          rowContent.classList.add("columns", "is-centered");

          for (let k = 0; k < 6; k++) { // Each category has 6 images and sketches
              const imageDiv = document.createElement("div");
              imageDiv.classList.add("column", "is-narrow");

              // Image
              const image = document.createElement("img");
              image.src = `${basePath}${category}/image_${k}.png`;
              image.alt = `Image ${k}`;
              image.classList.add("carousel-grid-image");

              // Sketch
              const sketch = document.createElement("img");
              sketch.src = `${basePath}${category}/sketch_${k}.png`;
              sketch.alt = `Sketch ${k}`;
              sketch.classList.add("carousel-grid-image");

              imageDiv.appendChild(image);
              imageDiv.appendChild(sketch);
              rowContent.appendChild(imageDiv);
          }

          row.appendChild(rowContent);
          grid.appendChild(row);
      }

      slide.appendChild(grid);
      carousel.appendChild(slide);
  }

  bulmaCarousel.attach("#category-carousel", {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
  });


  
});

document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("denoisingGrid");
  if (!gridContainer) {
    return;
  }
  const items = [
    { image: "astronaut.png", video: "astronaut.mp4" },
    { image: "bee.png", video: "bee.mp4" },
    { image: "robot.png", video: "robot.mp4" },
    { image: "rabbit.png", video: "rabbit.mp4" },
    { image: "car.png", video: "car.mp4" },
    { image: "fish.png", video: "fish.mp4" },
    { image: "angel.png", video: "angel.mp4" }
  ];

  // Clear the container first
  gridContainer.innerHTML = "";

  // Images Row
  const imagesRow = document.createElement("div");
  imagesRow.classList.add("columns", "is-centered");
  items.forEach(item => {
    const column = document.createElement("div");
    column.classList.add("column", "is-narrow");
    const img = document.createElement("img");
    img.src = `static/figures/denoising_video/${item.image}`;
    img.alt = `${item.image.split('.')[0]} Image`;
    img.classList.add("grid-item");
    column.appendChild(img);
    imagesRow.appendChild(column);
  });
  gridContainer.appendChild(imagesRow);

  // Videos Row
  const videosRow = document.createElement("div");
  videosRow.classList.add("columns", "is-centered");

  const videoElements = []; // Store video elements for synchronization

  items.forEach(item => {
    const column = document.createElement("div");
    column.classList.add("column", "is-narrow");
    const video = document.createElement("video");

    video.autoplay = true; // Enable autoplay
    video.muted = true; // Required for autoplay on mobile
    video.loop = false; // We handle looping manually
    video.playsInline = true; // Prevent fullscreen on iOS
    video.classList.add("grid-item");

    const source = document.createElement("source");
    source.src = `static/figures/denoising_video/${item.video}`;
    source.type = "video/mp4";
    video.appendChild(source);
    column.appendChild(video);
    videosRow.appendChild(column);

    videoElements.push(video);
  });
  gridContainer.appendChild(videosRow);

  // Synchronize videos
  Promise.all(
    videoElements.map(video =>
      new Promise(resolve => {
        video.addEventListener("loadeddata", () => resolve(video));
      })
    )
  ).then(videos => {
    function syncVideos() {
      videos.forEach(video => {
        video.currentTime = 0;
        video.play();
      });
    }

    syncVideos(); // Start all videos at the same time

    videos.forEach(video => {
      video.addEventListener("ended", () => {
        setTimeout(() => {
          video.currentTime = 0;
          video.play();
        }, 3000); // 3-second delay before restarting
      });
    });
  });
});
