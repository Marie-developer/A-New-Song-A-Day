
const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
	{
		album: "K.(Clear)",
		emblem: "Cigarettes After Sex",
		"bg-color": ["#53254C", "#0D1827"],
		"accent-color": "#7C2E70",
		url:
			"https://i.imgur.com/7N1jKLg.jpg",
		spotify:
			"https://open.spotify.com/embed/track/7LX4aXtvImhdgUHQBlo8Kp?utm_source=generator"
	},
	{
		album: "Try 🌐",
		emblem: "Try Or Prxsphy",
		"bg-color": ["#66493D", "#32130F"],
		"accent-color": "#B4653C",
		url: "https://i.imgur.com/Q9QgEMc.jpg",
		spotify:
			"https://open.spotify.com/embed/playlist/0zUDuQmIMbBKHov9vFbW26?utm_source=generator"
	},


];

// Add Event Listeners
scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
	heroDiv.classList.remove("album-transition");
	document.addEventListener("keydown", handleKeyScroll);
	scrollLeft.disabled = false;
	scrollRight.disabled = false;
	scrollLeft.classList.remove("key-press-hover-left");
	scrollRight.classList.remove("key-press-hover-right");

	for (const text of texts) text.classList.add("show-texts");
});

// Event Listeners
const handleClickScroll = (val) => {
	if (index + val >= 0 && index + val < albums.length) {
		updateDisplay((index += val));
	}
};

const handleKeyScroll = (e) => {
	if (e.key == "ArrowLeft") {
		scrollLeft.classList.add("key-press-hover-left");
		handleClickScroll(-1);
	}
	if (e.key == "ArrowRight") {
		scrollRight.classList.add("key-press-hover-right");
		handleClickScroll(1);
	}
};

// Main Function
let index = 0;

const updateDisplay = (index) => {
	// SET DELIMITER
	let DELIMITER = "";

	// delcare album specified by index
	const album = albums[index];

	// reset all animations and disable button
	for (const text of texts) text.classList.remove("show-texts");
	emblemDiv.innerHTML = "";
	scrollLeft.disabled = true;
	scrollRight.disabled = true;
	document.removeEventListener("keydown", handleKeyScroll);

	// add css classes, texts, and styles
	sectionContainer.id = `hero-${album.album.toLowerCase().replace(" ", "-")}`;
	bodyContainer.style.background = `linear-gradient(180deg, ${album["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
	heroDiv.style.backgroundImage = `url(${album.url})`;
	albumTitleSpan.textContent = album.album;
	spotifyWidget.src = album.spotify;

	const number = albums.length - index;
	albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
	albumNum.style.color = album["accent-color"];

	// hide arrows
	if (index === 0) scrollLeft.classList.add("hide-arrow");
	else scrollLeft.classList.remove("hide-arrow");

	if (index === 1) scrollRight.classList.add("hide-arrow");
	else scrollRight.classList.remove("hide-arrow");

	// create emblem
	createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
		emblemDiv.append(node)
	);

	// add final animations
	heroDiv.classList.add("album-transition");
};

const createEmblem = (string, delimiter = "•") => {
	const spans = [];

	string = string.trim().replaceAll(" ", delimiter) + delimiter;
	const numChars = string.length;
	const degVal = 90 / (numChars / 4);

	string.split("").forEach((char, idx) => {
		const span = document.createElement("span");
		span.innerText = char;
		span.style.transform = `rotate(${180 - degVal * idx}deg)`;
		if (char === delimiter) span.style.color = albums[index]["accent-color"];
		spans.push(span);
	});

	return spans;
};

// Start Script
updateDisplay(index);
