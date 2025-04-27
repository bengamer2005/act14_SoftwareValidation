document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form")

    if(!form) {
        return console.log("no se encontro el formulario ");
    }

    // para cambiar las ciudades dependiendo el pais
    const countrySelect = document.getElementById("country")
    const citySelect = document.getElementById("city")

    if(countrySelect && citySelect) {
        countrySelect.addEventListener("change", () => {
            const countrySelected = countrySelect.value

            citySelect.innerHTML = `<option value="">-- Escoge una ciudad --</option>`

            const citiesForCountry = {
                mexico: ["Ciudad de Mexico", "Monterrey"],
                usa: ["Nueva york", "Chicago"]
            }

            const cities = citiesForCountry[countrySelected] || []

            cities.forEach((ciudad) => {
                const option = document.createElement("option")
                option.value = ciudad
                option.textContent = ciudad
                citySelect.appendChild(option)
            })
        })
    }

    // para hacer que el boton de cancelar reinicie el form
    const cancelButton = document.getElementById("cancel")

    if(cancelButton) {
        cancelButton.addEventListener("click", () => {
            form.reset()
        })
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const name = document.getElementById("name").value
        const lastname = document.getElementById("lastname").value
        const age = document.getElementById("age").value
        const country = document.getElementById("country").value
        const city = document.getElementById("city").value
        const address = document.getElementById("address").value
        const balance = document.getElementById("balance").value

        // le da un id al cliete
        const id = "id-client-" + Math.floor(Math.random() * 1000000);

        // lanza alerta si no llena todo los datos
        if(!name || !lastname || !age || !country || !city || !address || !balance) {
            return alert("Te faltan datos por llenar")
        }

        // validacion de longitud de caracteres en el name y lastname
        if(name.length > 30) {
            return alert("el campo NOMBRE solo admite menos de 30 caracteres")
        }

        if(lastname.length > 30) {
            return alert("el campo APELLIDO solo admite menos de 30 caracteres")
        }

        // validacion de longitud de address
        if(address.length > 100) {
            return alert("el campo DIRECCION solo admiten menos de 100 caracteres")
        }

        // verifica que age sea un numero positivo y que sea mayor de 18
        if(isNaN(age) || age <= 0) {
            return alert("La edad debe ser un número mayor a 0");
        }

        if(isNaN(age) || age < 18) {
            return alert("tienes que ser mayor de edad")
        }

        // valida que balance negativo no sea mayor a 500
        if(balance < -500) {
            return alert("La deuda no puede ser mayor a 500");
        }
        
        const data = {
            id,
            name,
            lastname,
            age,
            country,
            city,
            address,
            balance
        }

        const customersList = document.getElementById("list");

        const customerDiv = document.createElement("div");
        customerDiv.classList.add("customer-card");
        customerDiv.innerHTML = `
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Apellido:</strong> ${data.lastname}</p>
            <p><strong>Edad:</strong> ${data.age}</p>
            <p><strong>País:</strong> ${data.country}</p>
            <p><strong>Ciudad:</strong> ${data.city}</p>
            <p><strong>Dirección:</strong> ${data.address}</p>
            <p><strong>Balance:</strong> ${data.balance} USD</p>
            <hr>
        `;

        customersList.appendChild(customerDiv);

        alert("Formulario enviado correctamente");
        form.reset();

    })
})