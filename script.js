let player;
const apiKey = 'YOUR_YOUTUBE_API_KEY';

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: '', // The initial video will be set dynamically
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // You can do something when the player is ready
}

function onPlayerStateChange(event) {
    // You can do something when the player's state changes
}

function playSong(videoId) {
    player.loadVideoById(videoId);
    player.playVideo();
}

function togglePlayPause() {
    const playPauseButton = document.getElementById('play-pause-button');
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        playPauseButton.textContent = '▶️';
    } else {
        player.playVideo();
        playPauseButton.textContent = '⏸️';
    }
}

function decreaseVolume() {
    if (player.getVolume() > 0) {
        player.setVolume(player.getVolume() - 10);
        console.log('Decreasing volume');
    }
}

function increaseVolume() {
    if (player.getVolume() < 100) {
        player.setVolume(player.getVolume() + 10);
        console.log('Increasing volume');
    }
}

function setVolume(value) {
    player.setVolume(value);
    console.log('Setting volume to:', value);
}

function searchAndPlay() {
    const searchInput = document.getElementById('song-search');
    const query = searchInput.value;

    if (query) {
        // Use the YouTube Data API to search for videos
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const videoId = data.items[0].id.videoId;
                playSong(videoId);
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        console.log('king smoke baby drill');
    }
}
