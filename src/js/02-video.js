import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(event) {
    const currentTime = event.seconds;
    localStorage.setItem("videoplayer-current-time", currentTime);

    if (event.percent === 1) {
        localStorage.removeItem("videoplayer-current-time");
    }
};

setStorageTime();

function setStorageTime() {
    const savedTime = localStorage.getItem("videoplayer-current-time");

    if (savedTime) {
        player.setCurrentTime(savedTime);
    }
}
 