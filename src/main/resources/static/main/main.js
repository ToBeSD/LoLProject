const realtime = document.getElementById('realtime_search');
const realWrapper = document.querySelector('.word_wrapper');

let count = 1;

const slideRealtime = setInterval(() => {
    realtime.style.transform = `translate(0%, ${count * -29}px)`;
    count++;

    if(count == 11) {
        realtime.style.transform = 'translate(0%, 0%)';
        count = 1;
    }

}, 1000);

realtime.addEventListener('click', () => {
    realWrapper.style.overflow = 'visible';
    clearInterval(slideRealtime);
})