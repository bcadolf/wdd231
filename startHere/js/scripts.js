const currentUrl = window.location.href;
console.log(currentUrl);

// Divide the url in to two halves
const everything = currentUrl.split('?')
console.log(everything)

//Grab jus the second half
let formData = everything[1]
console.log(formData)

//break the form name value pairs into array
formData = formData.split('&')
console.log(formData)


