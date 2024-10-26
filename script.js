function getAndUpdate() {
	console.log("Atualizando lista...");
	tit = document.getElementById("title").value;
	desc = document.getElementById("description").value;
	if (localStorage.getItem("itemsJson") == null) {
		itemJsonArray = [];
		itemJsonArray.push([tit, desc]);
		localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
	} else {
		itemJsonArrayStr = localStorage.getItem("itemsJson");
		itemJsonArray = JSON.parse(itemJsonArrayStr);
		itemJsonArray.push([tit, desc]);
		localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
	}
	update();
}

function update() {
	if (localStorage.getItem("itemsJson") == null) {
		itemJsonArray = [];
		localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
	} else {
		itemJsonArrayStr = localStorage.getItem("itemsJson");
		itemJsonArray = JSON.parse(itemJsonArrayStr);
	}
	// Populate the table
	let tableBody = document.getElementById("tableBody");
	let str = "";
	itemJsonArray.forEach((element, index) => {
		str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td> 
        <td><button class="btn btn-sm btn-primary" onclick="check(this)">Check</button></td>
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Deletar</button></td> 
        </tr>`;
	});
	tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();
function deleted(itemIndex) {
	console.log("Delete", itemIndex);
	itemJsonArrayStr = localStorage.getItem("itemsJson");
	itemJsonArray = JSON.parse(itemJsonArrayStr);
	// Delete itemIndex element from the array
	itemJsonArray.splice(itemIndex, 1);
	localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
	update();
}
function clearStorage() {
	if (confirm("Realmente quer limpar a lista?")) {
		console.log("Limpando a lista");
		localStorage.clear();
		update();
	}
}

function check(button) {
	// Seleciona os <td> irmãos do botão
	const tdSiblings = button.parentElement.parentElement.querySelectorAll(
		"td:not(:first-child)"
	);

	// Alterna a classe 'riscado'
	tdSiblings.forEach((td) => {
		td.classList.toggle("riscado");
	});
}
