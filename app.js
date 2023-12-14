let currentMusic = 0;
const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

playBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        playBtn.classList.remove('pause');
        disk.classList.add('play');
    } else {
        music.pause();
        playBtn.classList.add('pause');
        disk.classList.remove('play');
    }
});


let songs = [
    {
        name: 'song 1',
        path: 'musics/Song 1.mp3',
        artist: 'artist 1',
        cover: 'images/cover 1.png'
    },
    {
        name: 'song 2',
        path: 'musics/Song 2.mp3',
        artist: 'artist 2',
        cover: 'images/cover 2.png'
    },
    {
        name: 'song 3',
        path: 'musics/Song 3.mp3',
        artist: 'artist 3',
        cover: 'images/cover 3.png'
    },
    {
        name: 'song 4',
        path: 'musics/Song 4.mp3',
        artist: 'artist 4',
        cover: 'images/cover 4.png'
    },
    {
        name: 'song 5',
        path: 'musics/Song 5.mp3',
        artist: 'artist 5',
        cover: 'images/cover 5.png'
    },
];

// Setup music
const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
        music.play(); // Auto-play the song when setting up
        playBtn.classList.remove('pause');
        disk.classList.add('play');
    }, 300);
}


// Formatting time in min and max seconds format
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

// Event listener for changing the seek bar
seekBar.addEventListener('input', () => {
    music.currentTime = seekBar.value;
    currentTime.innerHTML = formatTime(music.currentTime);
});

// Event listener for changing the music time
music.addEventListener('timeupdate', () => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
});

// Event listener for playing the next song
forwardBtn.addEventListener('click', () => {
    currentMusic = (currentMusic + 1) % songs.length;
    setMusic(currentMusic);
    if (playBtn.classList.contains('pause')) {
        music.play();
    }
});

// Event listener for playing the previous song
backwardBtn.addEventListener('click', () => {
    currentMusic = (currentMusic - 1 + songs.length) % songs.length;
    setMusic(currentMusic);
    if (playBtn.classList.contains('pause')) {
        music.play();
    }
});

// Initial setup
setMusic(0);
