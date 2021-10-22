let sections;
let background;
let logo;
let heroImageX = "0%";
window.addEventListener('load', () => {
    sections = Array.from(document.querySelectorAll("section"));
    background = document.getElementsByClassName("background_hero")[0];
    logo = document.getElementById("main_logo");

    document.body.onresize = () => {
        background.style = "";
        heroImageX = getComputedStyle(background).objectPosition.split(' ')[0];
        heroImageX = heroImageX === '0%' ? heroImageX : getComputedStyle(background).objectPosition.split(')')[0] + ')';
    };
});

// ----- page scrolling -----

window.addEventListener('scroll', () => {

    if (!sections)
        return;

    let array = [...sections];
    let copy = array.map(el => {
        return {
            element: el,
            height: el.scrollHeight,
            event: undefined
        }
    });

    copy[0].event = function (scrollHeights) {
        background.style = "";
        background.style.objectPosition = heroImageX + ' ' + (500 * (window.scrollY / scrollHeights[1])) + 'px';
        //logo.style.transform = 'translateY(' + (400 * (window.scrollY / scrollHeights[1])) + 'px)';
        logo.style.transform = `matrix(1.2, 0, 0, 1.2, 0, ${(350 * (window.scrollY / scrollHeights[1]))})`;
    };

    let scrollHeights = [];
    let currentHeight = 0;
    copy.forEach((section) => {
        scrollHeights.push(currentHeight);
        currentHeight += section.height;
    });

    copy.forEach((section, index) => {

        if (window.scrollY >= scrollHeights[index] && (index === scrollHeights.length - 1 ? true : (window.scrollY <= scrollHeights[index + 1]))) {
            if (section.event)
                section.event(scrollHeights);
        }
    });
});

// ----- end page scrolling -----