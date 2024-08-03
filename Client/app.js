document.addEventListener('DOMContentLoaded', function() {
  // Asegúrate de que la URL es completa y correcta
  fetch('http://localhost:3000/api/access/records')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('accessTable').getElementsByTagName('tbody')[0];
      data.forEach(record => {
        // Insertar una nueva fila al final de la tabla
        let row = tableBody.insertRow();
        // Insertar celdas en la fila
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        // Rellenar las celdas con datos
        cell1.textContent = record.cardId;
        cell2.textContent = record.authorized ? 'Yes' : 'No';
        cell3.textContent = new Date(record.accessTime).toLocaleString();
      });
    })
    .catch(err => console.error('Error fetching access attempts:', err));
});
