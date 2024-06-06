function toggleStyle() {
    var linkElement = document.getElementById("styleSheetLink");
    var currentHref = linkElement.getAttribute("href");
    var changeStyleButton = document.getElementById("changeStyleButton");

    if (currentHref === "style.css") {
        linkElement.setAttribute("href", "style2.css");
        changeStyleButton.textContent = "어두운 테마";
        changeButtonColor("dark");
    } else {
        linkElement.setAttribute("href", "style.css");
        changeStyleButton.textContent = "밝은 테마";
        changeButtonColor("light");
    }
}

function changeButtonColor(theme) {
    var buttons = document.querySelectorAll("button, .btn-primary, .rating-form-table button[type='button'], .delete-comment");
    var hoverColor, activeColor;

    if (theme === "dark") {
        hoverColor = "rgb(65, 8, 37)";
        activeColor = "#e91e63";
    } else {
        hoverColor = "rgb(22, 22, 97)";
        activeColor = "#3f51b5";
    }

    buttons.forEach(function (button) {
        button.addEventListener("mouseover", function () {
            button.style.backgroundColor = hoverColor;
        });
        button.addEventListener("mouseout", function () {
            button.style.backgroundColor = activeColor;
        });
    });
}