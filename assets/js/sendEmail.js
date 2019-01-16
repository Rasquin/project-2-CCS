function sendMail(contactForm) {
    emailjs.send("gmail", "monica", {
        "from_name": contactForm.name.value, // the names must be equal to what we write on our template
        "from_email": contactForm.emailaddress.value,
        "experience": contactForm.experience.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}