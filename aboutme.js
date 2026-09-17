document.addEventListener("DOMContentLoaded", () => {

    const certificateImages =
        document.querySelectorAll(".certificate-image img");

    const viewer =
        document.getElementById("certificateViewer");

    const viewerImage =
        document.getElementById("viewerImage");

    const exitButton =
        document.getElementById("certificateExit");


    /* Open certificate */

    certificateImages.forEach((image) => {

        image.addEventListener("click", () => {

            viewerImage.src = image.src;
            viewerImage.alt = image.alt;

            viewer.classList.add("active");

            document.body.style.overflow = "hidden";
        });

    });


    /* Close using X button */

    exitButton.addEventListener("click", closeViewer);


    /* Close by clicking outside certificate */

    viewer.addEventListener("click", (event) => {

        if (event.target === viewer) {
            closeViewer();
        }

    });


    /* Close using ESC key */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeViewer();
        }

    });


    function closeViewer() {

        viewer.classList.remove("active");

        document.body.style.overflow = "";

        setTimeout(() => {
            viewerImage.src = "";
        }, 300);
    }

});