import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = "videoplayer-current-time";

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(event) {
    const currentTime = event.seconds;
    localStorage.setItem(STORAGE_KEY, currentTime);

    if (event.percent === 1) {
        localStorage.removeItem(STORAGE_KEY);
    }
};

setStorageTime();

function setStorageTime() {
    const savedTime = localStorage.getItem(STORAGE_KEY);

    if (savedTime) {
        player.setCurrentTime(savedTime);
    }
}
 