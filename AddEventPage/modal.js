// Dapatkan elemen modal dan butang
var modal = document.getElementById("eventModal");
var modalContent = document.querySelector(".modal-content");
var btn = document.getElementById("openModalBtn");
var clearAllBtn = document.getElementById("clearAll");
var span = document.getElementsByClassName("event-title")[0];
const categoryCheckboxes = document.querySelectorAll('.custom-checkbox');


// Buka modal apabila butang ditekan
btn.onclick = function() {
  modal.style.display = "block";
  setTimeout(function() {
    modal.classList.add("show");
  }, 10); // Tambah sedikit delay untuk animasi transition
}

// Tutup modal apabila user klik 'X'
span.onclick = function() {
  modal.classList.remove("show");
  setTimeout(function() {
    modal.style.display = "none";
  }, 500); // Tunggu transition selesai sebelum sembunyikan modal
}

// Tambahkan event listener untuk mengosongkan semua input dalam form
clearAllBtn.onclick = function() {
  document.getElementById("eventForm").reset();
}

// Tutup modal apabila user klik di luar modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove("show");
    setTimeout(function() {
      modal.style.display = "none";
    }, 500);
  }
}

// Inisialisasi Flatpickr untuk input masa
flatpickr("#startTime", {
  enableTime: true,
  noCalendar: true, // Hanya masa, tiada pemilih tarikh
  dateFormat: "H:i", // Format jam:minit
  time_24hr: false, // Format 12 jam dengan AM/PM
  minuteIncrement: 1 // Untuk membenarkan pengguna memilih minit secara lebih tepat
});

flatpickr("#endTime", {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  time_24hr: false,
  minuteIncrement: 1
});

// Tambah event listener untuk setiap kotak pilihan
categoryCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('click', function() {
      // Padam kelas 'selected' dari semua kotak
      categoryCheckboxes.forEach(cb => cb.classList.remove('selected'));
      // Tambah kelas 'selected' ke kotak yang diklik
      this.classList.add('selected');
  });
});

// Event listener untuk mengesahkan borang sebelum dihantar
document.getElementById("eventForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Mencegah penghantaran borang secara lalai
  // Tambah logik untuk menghantar data ke server atau pengendalian lain di sini
  alert("Event submitted!"); // Pemberitahuan bahawa borang dihantar
  modal.classList.remove("show");
  setTimeout(function() {
    modal.style.display = "none";
  }, 500); // Tunggu transition selesai sebelum sembunyikan modal
});
