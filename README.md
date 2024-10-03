## **Pemahaman Sistem NTXG KULIAH**

### **Entiti Utama**

1. **Lecturer (Lect):**
   - **Pendaftaran Pelajar:** Lect akan mendaftarkan pelajar ke dalam kelas tertentu (contoh: DDT5IS1).
   - **Pengurusan Jadual:** Sistem akan secara automatik menambah jadual kelas pelajar ke dalam pangkalan data. Jika terdapat perubahan seperti pembatalan atau penangguhan kelas, Lect perlu mengemas kini sistem agar jadual pelajar dikemaskini.

2. **Pelajar:**
   - **Notifikasi Jadual:** Pelajar akan menerima notifikasi mengenai jadual kelas melalui fungsi jadual dalam sistem.
   - **QR Code Kehadiran:** Pada masa tertentu, pelajar akan melihat QR Code pada telefon mereka untuk membuktikan kehadiran. QR Code ini akan diimbas oleh Lect sebelum kelas bermula untuk mengambil kehadiran.

### **Ciri-ciri Utama QR Code dalam Sistem**

- **Unik:** Satu QR Code adalah unik untuk setiap pelajar pada setiap acara/kelas.
- **Keselamatan:** QR Code direka supaya tidak boleh dikongsi dengan orang lain, memastikan hanya pelajar yang sah dapat menandakan kehadiran.

## **Cadangan untuk Pembuatan QR Code dengan JavaScript**

Untuk membangunkan fungsi pembuatan QR Code yang memenuhi keperluan sistem NTXG KULIAH, berikut adalah langkah-langkah yang boleh diambil:

### **1. Pilih Perpustakaan QR Code**

Gunakan perpustakaan JavaScript yang popular dan mudah digunakan untuk menghasilkan QR Code. Beberapa pilihan termasuk:

- **[QRCode.js](https://davidshimjs.github.io/qrcodejs/):** Mudah digunakan dan tidak memerlukan dependencies tambahan.
- **[qrcode](https://github.com/soldair/node-qrcode):** Sesuai untuk penggunaan di server (Node.js) dan klien.

### **2. Struktur Data untuk QR Code**

Setiap QR Code perlu mengandungi maklumat yang unik dan selamat. Berikut adalah contoh struktur data yang boleh dimasukkan ke dalam QR Code:

- **User ID:** ID unik pelajar.
- **Event ID:** ID unik kelas atau acara.
- **Timestamp:** Masa QR Code dihasilkan.
- **Token/Security Key:** Untuk memastikan QR Code tidak boleh diubah atau dipalsukan.

Contoh Data dalam Format JSON:
```json
{
  "userId": "12345",
  "eventId": "DDT5IS1-2024-09-20",
  "timestamp": "2024-09-20T08:00:00Z",
  "token": "abcdef123456"
}
```

### **3. Enkripsi Data (Opsional tetapi Disarankan)**

Untuk meningkatkan keselamatan, anda boleh mengenkripsi data sebelum menjadikannya QR Code. Ini memastikan bahawa hanya aplikasi sistem yang boleh membaca dan memproses maklumat tersebut.

**Contoh Menggunakan CryptoJS:**
```javascript
// Tambah CryptoJS melalui CDN atau npm
// CDN: <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

// Encrypt Data
const data = JSON.stringify({
  userId: "12345",
  eventId: "DDT5IS1-2024-09-20",
  timestamp: "2024-09-20T08:00:00Z",
  token: "abcdef123456"
});

const secretKey = "your-secret-key";
const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();

// decryptedData untuk memeriksa
const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
console.log(decryptedData);
```

### **4. Menghasilkan QR Code**

Berikut adalah contoh bagaimana menghasilkan QR Code menggunakan **QRCode.js**:

```html
<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <title>QR Code Kehadiran</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
</head>
<body>
    <div id="qrcode"></div>

    <script>
        // Data unik untuk QR Code
        const qrData = {
            userId: "12345",
            eventId: "DDT5IS1-2024-09-20",
            timestamp: new Date().toISOString(),
            token: "abcdef123456"
        };

        // Opsional: Enkripsi data
        // const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(qrData), "your-secret-key").toString();

        // Tanpa enkripsi
        const qrString = JSON.stringify(qrData);

        // Generate QR Code
        const qrcode = new QRCode(document.getElementById("qrcode"), {
            text: qrString,
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    </script>
</body>
</html>
```

### **5. Memastikan Keaslian QR Code**

Untuk memastikan QR Code tidak boleh dikongsi atau dipalsukan, pertimbangkan langkah-langkah berikut:

- **Tokenisasi Satu Kali Pakai:** Setiap QR Code hanya boleh digunakan sekali. Setelah diimbas, token akan ditandai sebagai digunakan dalam pangkalan data.
- **Masa Terhad:** QR Code hanya sah dalam jangka masa tertentu (contoh: beberapa minit sebelum kelas bermula).
- **Verifikasi Server-Side:** Setelah QR Code diimbas, sistem backend perlu memverifikasi data (misalnya, memeriksa token, masa, dan keaslian user).

**Contoh Verifikasi Server-Side (Pseudo-Code):**
```javascript
app.post('/verify-attendance', (req, res) => {
    const { encryptedData } = req.body;
    // Dekripsi data
    const bytes = CryptoJS.AES.decrypt(encryptedData, "your-secret-key");
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // Periksa token dan masa
    if (isValidToken(data.token) && isWithinAllowedTime(data.timestamp)) {
        markAttendance(data.userId, data.eventId);
        res.status(200).send({ success: true });
    } else {
        res.status(400).send({ success: false, message: "QR Code tidak sah." });
    }
});
```

### **6. Integrasi dengan Sistem NTXG KULIAH**

- **Backend API:** Bangunkan API untuk menghasilkan QR Code berdasarkan data pelajar dan jadual kelas.
- **Frontend Aplikasi Pelajar:** Paparkan QR Code pada aplikasi pelajar pada masa yang ditetapkan.
- **Frontend Aplikasi Lect:** Sediakan fungsi imbasan QR Code menggunakan kamera untuk mengambil kehadiran.

### **7. Penggunaan Perpustakaan Tambahan untuk Imbasan QR Code**

Untuk bahagian imbasan QR Code oleh Lecturer, anda boleh menggunakan perpustakaan seperti **[jsQR](https://github.com/cozmo/jsQR)** atau **[QRCode Scanner](https://github.com/zxing-js/library)**.

**Contoh Menggunakan jsQR:**
```html
<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <title>Imbas QR Code</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.js"></script>
</head>
<body>
    <video id="video" width="300" height="200" autoplay></video>
    <canvas id="canvas" hidden></canvas>
    <script>
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(stream => {
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // Untuk iOS
            video.play();
            requestAnimationFrame(tick);
        });

        function tick() {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.height = video.videoHeight;
                canvas.width = video.videoWidth;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });
                if (code) {
                    // Kirim data ke server untuk verifikasi
                    fetch('/verify-attendance', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ encryptedData: code.data })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert('Kehadiran berjaya diambil.');
                        } else {
                            alert('QR Code tidak sah.');
                        }
                    });
                }
            }
            requestAnimationFrame(tick);
        }
    </script>
</body>
</html>
```

## **Langkah-Langkah Selanjutnya**

1. **Pengujian Sistem:**
   - Uji fungsi pembuatan dan pengimbasan QR Code untuk memastikan keaslian dan keselamatan.
   - Pastikan QR Code hanya sah untuk satu pelajar pada satu kelas dan tidak boleh dikongsi.

2. **Pengurusan Token dan Masa:**
   - Implementasikan mekanisme untuk mengurus token sekali pakai dan masa sah QR Code untuk mengelakkan penyalahgunaan.

3. **Pengurusan Error:**
   - Tangani situasi di mana QR Code tidak sah atau masa tamat untuk memberikan maklum balas yang sesuai kepada pengguna.

4. **Dokumentasi:**
   - Buat dokumentasi teknikal mengenai cara sistem QR Code berfungsi untuk rujukan masa depan dan untuk membantu pengembang lain yang mungkin terlibat dalam projek.

## **Kesimpulan**

Sistem NTXG KULIAH yang menggunakan QR Code untuk pengambilan kehadiran adalah idea yang canggih dan efisien. Dengan memastikan QR Code unik dan selamat, anda boleh meningkatkan ketepatan dan integriti data kehadiran pelajar. Jika anda memerlukan bantuan lebih lanjut dalam mana-mana aspek pembangunan sistem ini, jangan ragu untuk bertanya!
