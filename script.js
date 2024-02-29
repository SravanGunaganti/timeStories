async function getStories() {
    let latestContainer = document.getElementById("latest-list");
    let response = await fetch("http://localhost:3000/getTimeStories", {
        method: "GET", headers: {
            'Accept': 'application/json',
        }
    });
    let data = await response.json();
    data.forEach(story => {
        const date = new Date();

        const element =
            `<a href="${story.link}" targer="_blank" class="story-link">
            <h3 class="story-title">${story.title}</h3>
    <p class="published-date">${date.toUTCString()}}</p>
    </a>`;
        let listItem = document.createElement("li");
        listItem.innerHTML = element;
        listItem.classList.add("latest-item");
        latestContainer.appendChild(listItem);
    });
}

getStories();