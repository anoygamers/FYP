document.addEventListener('DOMContentLoaded', function() {
    const calendarDays = document.getElementById('calendar_days');
    const calendar = document.getElementById('num_dates')
    const monthSelect = document.getElementById('calendar__month');
    const yearSelect = document.getElementById('calendar__year');

    let today = new Date();
    let currentMonth = today.getMonth(); // dapatkan bulan harini menggunakan library
    let currentYear = today.getFullYear(); // dapatkan tahun sekarang menggunakan library


    // Nama hari dalam seminggu
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // Penamaan Bulan dalam satu tahun
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 
                    'May', 'Jun', 'Jul', 'Aug', 'Sep', 
                    'Oct', 'Nov', 'Dec'];


    // Function untuk mengeluarkan dropdown bulan dengan cara looping forEach
    function MengisiMonthDropdown(){
        months.forEach((month, index) =>{
            const option = document.createElement('option');
            option.value = index;
            option.text = month;
            monthSelect.appendChild(option);
        });

        // Set bulan semasa sebagai default terpilih
        monthSelect.value = currentMonth;
    }

    // Function untuk mengisi tahun dalam dropdown
    function MengisiYearDropdown(startYear, endYear){
        for(let year = startYear; year <= endYear; year++){
            const option = document.createElement('option');
            option.value = year; //nilai tahun
            option.text = year; //teks tahun
            yearSelect.appendChild(option);
        }

        // Set tahun semasa sebagai default terpilih
        yearSelect.value = currentYear;
    }

    // Fungsi untuk menjana kalendar berdasarkan bulan dan tahun yang dipilih
    function generateCalendar(month, year) {
        calendar.innerHTML = ''; // Kosongkan kalendar yang sedia ada

        // Tetapkan nilai dropdown kepada bulan dan tahun yang betul
        monthSelect.value = month;
        yearSelect.value = year;

        // Tentukan bilangan hari dalam bulan yang dipilih
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Hari terakhir bulan
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // Hari pertama dalam bulan

        // Tambahkan sel kosong untuk hari sebelum hari pertama bulan ini
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendar.appendChild(document.createElement('div'));
        }

        // Tambahkan hari ke dalam kalendar
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar__date');

            //tambahkan elemen span
            const spanElement = document.createElement('span');
            spanElement.innerText = i; // Nombor hari

            // Tandakan hari semasa (hari ini) dengan warna hijau
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayElement.classList.add('calendar__date--range-end');
          }

          dayElement.appendChild(spanElement);
          document.getElementById('num_dates').appendChild(dayElement);
        }

    }

    // Tambahkan nama hari-hari dalam seminggu ke dalam grid
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.innerText = day; // Nama hari (contoh: Sun, Mon)
        calendarDays.appendChild(dayElement);
    });

    // Memanggil fungsi untuk mengisi dropdown bulan dan tahun
    MengisiMonthDropdown();
    MengisiYearDropdown(currentYear - 4, currentYear + 4); // Contoh untuk tahun 2000 hingga 2030

    // Jana kalendar berdasarkan bulan dan tahun semasa
    generateCalendar(currentMonth, currentYear);

    // Event listener untuk mengemaskini kalendar apabila bulan berubah
    monthSelect.addEventListener('change', () => {
        currentMonth = parseInt(monthSelect.value); // Tukar bulan berdasarkan pilihan pengguna
        generateCalendar(currentMonth, currentYear); // Jana semula kalendar
    });

    // Event listener untuk mengemaskini kalendar apabila tahun berubah
    yearSelect.addEventListener('change', () => {
    currentYear = parseInt(yearSelect.value); // Tukar tahun berdasarkan pilihan pengguna
    generateCalendar(currentMonth, currentYear); // Jana semula kalendar
    });

    document.getElementById('calendar').addEventListener('click', function() {
    window.location.href = '/SchedulePage/index.html';
    });

    document.getElementById('history').addEventListener('click', function() {
    window.location.href = '/mainMenuPage/index.html';
    });

    document.getElementById('add-schedule').addEventListener('click', function() {
    window.location.href = '/#/index.html';
    });

    document.getElementById('notifications').addEventListener('click', function() {
    window.location.href = '/notificationPage/notification.html';
    });

    document.getElementById('user').addEventListener('click', function() {
    window.location.href = '/profilePage/index.html';
    });

});