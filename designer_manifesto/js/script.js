const waterfalls = [ document.getElementById('waterfall_1'), document.getElementById('waterfall_2') ];
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789||<>,.[]@!#$%^&*()-=___';
const num_chars = characters.length;
const INTERVAL = 25;
let time = 0;
let frame = 0;

function random_character(index) {
    const rand = RAND_TAB[index % RAND_TAB.length];
    return characters.charAt(Math.floor(rand * num_chars));
}

function random_character_no_space(index) {
    const rand = RAND_TAB[index % RAND_TAB.length];
    return characters_no_space.charAt(Math.floor(rand * num_chars_no_space));
}

function get_line_size(elem) {
    const width = elem.offsetWidth;
    const root = parseFloat(
                    getComputedStyle(document.documentElement).fontSize
                 ) - 7;
    return Math.floor(width / root);
}

function get_num_lines(elem) {
    const root = parseFloat(
                    getComputedStyle(document.documentElement).fontSize
                 );
    const height = window.innerHeight;
    return Math.floor(height / root);
}

function main() {
    // Waterfalls
    for (let i = 0; i < waterfalls.length; i++) {
        setInterval(waterfall, INTERVAL, i);
    }
    setInterval(() => {
       time++; 
    }, INTERVAL);

    if (CUBE_FRAMES != undefined) {
        // Spinning cube
        setInterval(() => {
            const cube_window = document.getElementById('cube');
            cube_window.innerText = CUBE_FRAMES[frame];
            frame = (frame + 1) % CUBE_FRAMES.length;
        }, INTERVAL);
    }
}

function waterfall(id) {
    let text = '';
    const line_size = get_line_size(waterfalls[id])
    const text_len = line_size * get_num_lines(waterfalls[id]);
    for (let i = 0; i < text_len; i++) {
        text += random_character(i + (time * line_size));
        if ((i+1) % line_size == 0) {
            text += '\n'
        }
    }
    waterfalls[id].innerText = text;
}

window.onload = main;
