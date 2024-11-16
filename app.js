let boxes = document.querySelectorAll(".box");
let rBtn = document.querySelector("#btn"); 
let Nbtn = document.querySelector("#new-btn"); 
let playerx = true;

// Modal elements
const winnerModal = document.getElementById("winnerModal");
const winnerName = document.getElementById("winnerName");
const closeBtn = document.querySelector(".close");
const winningLine = document.getElementById("winning-line"); 

const winnigPat = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 8, 5],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    playerx = true;
    enableBoxes();
    winnerModal.classList.remove("show");
    winningLine.style.display = "none"; 
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (playerx) {
            box.innerText = "X";
            playerx = false;
        } else {
            box.innerText = "O";
            playerx = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const displayWinner = (winner) => {
    winnerName.innerText = winner;
    winnerModal.classList.add("show");
    disableBoxes();
};

const drawLine = (startIndex, endIndex) => {
    const startBox = boxes[startIndex].getBoundingClientRect();
    const endBox = boxes[endIndex].getBoundingClientRect();

    const x1 = startBox.left + startBox.width / 2;
    const y1 = startBox.top + startBox.height / 2;
    const x2 = endBox.left + endBox.width / 2;
    const y2 = endBox.top + endBox.height / 2;

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    winningLine.style.width = `${length}px`;
    winningLine.style.transform = `rotate(${angle}deg)`;
    winningLine.style.left = `${x1}px`;
    winningLine.style.top = `${y1}px`;
    winningLine.style.display = "block";
};

const checkWinner = () => {
    for (let pattern of winnigPat) {
        const [a, b, c] = pattern;
        const box1 = boxes[a].innerText;
        const box2 = boxes[b].innerText;
        const box3 = boxes[c].innerText;

        if (box1 && box1 === box2 && box2 === box3) {
            drawLine(a, c); 
            displayWinner(box1);
            return;
        }
    }
};


Nbtn.addEventListener("click", resetGame);
rBtn.addEventListener("click", resetGame);
closeBtn.addEventListener("click", () => {
    winnerModal.classList.remove("show");
});
window.addEventListener("click", (event) => {
    if (event.target === winnerModal) {
        winnerModal.classList.remove("show");
    }
});
