
const canv = document.getElementById('canvas')
const ctx = canv.getContext('2d');
const mul = 100;
const edgeSize = 0.5 / Math.sin(Math.PI / 3);

let field = JSON.parse(document.currentScript.getAttribute('field'));

let L = 1e9;
let R = -1e9;
let D = 1e9;
let U = -1e9;

let dx = 0;
let dy = 0;
let csz = 1;

console.log(field);
for (let i = 0; i < field.length; i++) {
    field[i].selected = false;
    L = Math.min(L, RealX(field[i].x, field[i].y));
    R = Math.max(R, RealX(field[i].x, field[i].y));
    D = Math.min(D, RealY(field[i].x, field[i].y));
    U = Math.max(U, RealY(field[i].x, field[i].y));
}

setInterval(function() {
    DrawField();
}, 30);

canv.addEventListener('contextmenu', function(e) {
    console.log("contextmenu");
});

canv.addEventListener('click', function(e) {
    console.log("click");
});

canv.addEventListener('mousedown', function(e) {
    console.log("mousedown");
});

canv.addEventListener('mouseup', function(e) {
    console.log("mouseup");
});

canv.addEventListener('mousemove', function(e) {
    console.log("mousemove");
    for (let i = 0; i < field.length; i++) {
        if (Dist(e.offsetX, e.offsetY, RealX(field[i].x, field[i].y), RealY(field[i].x, field[i].y)) < mul / 2 * csz) {
            field[i].selected = true;
        } else {
            field[i].selected = false;
        }
    }
});

canv.addEventListener('dblclick', function(e) {
    console.log("dbclick");
});

document.addEventListener('keydown', function(e) {
    console.log("keydown");
});


function Visible(x, y) {
    return -mul < y < canv.height + mul && -mul < x < canv.width + mul;
}

function Dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function RealX(x, y) {
    return (x + 0.5 * y) * mul * csz + dx;
}

function RealY(x, y) {
    return y * 1.5 * edgeSize * mul * csz + dy;
}

function Hex(realX, realY, mul, c) {
    ctx.beginPath();

    ctx.moveTo(realX + 0.5 * c * mul * csz, realY - 0.5 * c * edgeSize * mul * csz);
    ctx.lineTo(realX, realY - c * edgeSize * mul * csz);
    ctx.lineTo(realX - 0.5 * c * mul * csz, realY - 0.5 * c * edgeSize * mul * csz);
    ctx.lineTo(realX - 0.5 * c * mul * csz, realY + 0.5 * c * edgeSize * mul * csz);
    ctx.lineTo(realX, realY + c * edgeSize * mul * csz);
    ctx.lineTo(realX + 0.5 * c * mul * csz, realY + 0.5 * c * edgeSize * mul * csz);
    ctx.lineTo(realX + 0.5 * c * mul * csz, realY - 0.5 * c * edgeSize * mul * csz);

    ctx.fill();
}

function DrawHexagon(hexagon) {
    let realX = RealX(hexagon.x, hexagon.y);
    let realY = RealY(hexagon.x, hexagon.y);

    if (Visible(realX, realY)) {
        ctx.strokeStyle = 'bisque';
        if (hexagon.selected) {
            ctx.fillStyle = 'magenta';
            Hex(realX, realY, mul, 0.95);
        }
        ctx.fillStyle = 'bisque';
        Hex(realX, realY, mul, 0.9);
    }
}

function DrawField() {
    if (canv.offsetWidth < canv.offsetHeight) {
        canv.width = 10 * mul;
        canv.height = 10 * canv.offsetHeight / canv.offsetWidth * mul;
    } else {
        canv.width = 10 * canv.offsetWidth / canv.offsetHeight * mul;
        canv.height = 10 * mul;
    }
    if ((R - L + mul) / (U - D + mul) < canv.width / canv.height) {
        csz = canv.height / (U - D + mul * 2);
    } else {
        csz = canv.width / (R - L + mul * 2);
    }
    dx = -(L + (R - L) / 2) * csz + (canv.width / 2);
    dy = -(D + (U - D) / 2) * csz + (canv.height / 2);

    ctx.beginPath();
    ctx.fillStyle = 'rgba(49, 30, 71, 1)';
    ctx.fillRect(0, 0, canv.width, canv.height);

    for (let i = 0; i < field.length; i++) {
        DrawHexagon(field[i]);
    }

    // ctx.strokeStyle = 'bisque';
    // ctx.strokeweight = 10;
    // ctx.beginPath();
    //
    // ctx.moveTo(L * csz + dx, D * csz + dy);
    // ctx.lineTo(R * csz + dx, D * csz + dy);
    // ctx.lineTo(R * csz + dx, U * csz + dy);
    // ctx.lineTo(L * csz + dx, U * csz + dy);
    // ctx.lineTo(L * csz + dx, D * csz + dy);
    //
    // ctx.stroke();

}