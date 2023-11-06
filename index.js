
const URL = "https://aixpfrontend.azurewebsites.net/api/namegen"

document.getElementById("btn-get-name").addEventListener("click", getName)

async function getName(){
    const nameURL = `${URL}?description=${document.getElementById("description").value}`;
    const spinner = document.getElementById('spinner');
    const result = document.getElementById("result")
    result.style.color = "black"

    try {
        spinner.style.display = "block";
        //Add a spinner gif or? yes.
        const response = await fetch(nameURL).then(handleHttpErrors)
        result.innerText = response.answer;
    } catch (error) {
        result.style.color = "red";
        result.innerText = error.message;
    }
    finally {
        spinner.style.display = "none";
      }
}

async function handleHttpErrors(res) {
    if (!res.ok) {
      const errorResponse = await res.json();
      const msg = errorResponse.message ? errorResponse.message : "No error details provided"
      throw new Error(msg)
    }
    return res.json()
  }