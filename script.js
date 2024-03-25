const musicPlayer = document.getElementById('music-player');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

let lines = document.querySelectorAll(".vertical");

let songIndex = 0;

loadSong(songIndex);

function loadSong(index) {
    title.innerText = `${musics[index].name}`;
    audio.src = `${musics[index].music_url}`;
    cover.src = `${musics[index].cover_url}`;
}

function playSong() {
    musicPlayer.classList.add("play");
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    setEqualizer();
    audio.play();
}

function pauseSong() {
    musicPlayer.classList.remove("play");
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    stopEqualizer();
    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = musics.length - 1;
    }
    loadSong(songIndex)
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > musics.length - 1) {
        songIndex = 0;
    }
    loadSong(songIndex)
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function setEqualizer() {
    for (let i = 0; i < lines.length; i += 1) {
        let line = lines[i];
        line.style.animation = `equalizer ${Math.random() * (3 - 0.3) + 0.3}s ease infinite`;
        line.style.animationDirection = 'alternate-reverse'
    }
}

function stopEqualizer() {
    for (let i = 0; i < lines.length; i += 1) {
        let line = lines[i];
        line.style = 'height: 0px';
    }
}

playBtn.addEventListener('click', () => {
    const isPlaying = musicPlayer.classList.contains("play");
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);