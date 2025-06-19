function add() {
    const msv = document.getElementById('msv').value;
    const hoten = document.getElementById('hoten').value;
    const email = document.getElementById('email').value;
    const sdt = document.getElementById('sdt').value;
    if (!msv || !hoten || !email || !sdt) {
        alert('Vui lòng nhập đủ thông tin');
        return;
    }
    const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${msv}</td>
    <td>${hoten}</td>
    <td>${email}</td>
    <td>${sdt}</td>
`;
table.appendChild(newRow);
document.getElementById('msv').value='';
document.getElementById('hoten').value='';
document.getElementById('email').value = '';
document.getElementById('sdt').value='';
}