const services = [
  { id: 1, name: "Cuci + Setrika", price: 7000, unit: "kg" },
  { id: 2, name: "Cuci Sepatu", price: 30000, unit: "pasang" },
  { id: 3, name: "Cuci Karpet", price: 15000, unit: "m2" }
];

function calculateTotal() {
  const serviceId = document.getElementById("service").value;
  const qty = document.getElementById("qty").value;

  if (!qty || qty <= 0) {
    alert("Masukkan jumlah yang valid");
    return;
  }

  const selectedService = services.find(s => s.id == serviceId);

  const total = selectedService.price * qty;

  document.getElementById("total").innerText =
    "Total: Rp " + total.toLocaleString("id-ID");
}
