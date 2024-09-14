import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    alamat: '',
    kota: '',
    berkaitanDengan: 'Berita',
    tautan: '',
    pesan: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.nama || !formData.email || !formData.pesan) {
      alert('Nama, email, dan pesan harus diisi.');
      return;
    }
    // Di sini Anda bisa menambahkan logika untuk mengirim data ke server
    console.log(formData); // Untuk sementara, kita hanya akan menampilkan data yang dikirim
  };

  return (
    <form className='contact' onSubmit={handleSubmit}>
      <h2>Hubungi Kami</h2>
      <p>Ajukan pertanyaan, kritik dan saran tentang Intannews.com</p>
      <div>
        <label htmlFor="nama">Nama</label>
        <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="alamat">Alamat</label>
        <input type="text" id="alamat" name="alamat" value={formData.alamat} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="kota">Kota</label>
        <input type="text" id="kota" name="kota" value={formData.kota} onChange={handleChange} />
      </div>
      <div>
        <label>Berkaitan dengan</label>
        <div>
          <input type="radio" id="berita" name="berkaitanDengan" value="Berita" checked={formData.berkaitanDengan === 'Berita'} onChange={handleChange} />
          <label htmlFor="berita">Berita</label>
          <input type="radio" id="iklan" name="berkaitanDengan" value="Iklan" checked={formData.berkaitanDengan === 'Iklan'} onChange={handleChange} />
          <label htmlFor="iklan">Iklan</label>
        </div>
      </div>
      <div>
        <label htmlFor="tautan">Tautan (url) yang berkaitan</label>
        <input type="text" id="tautan" name="tautan" value={formData.tautan} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="pesan">Pesan</label>
        <textarea id="pesan" name="pesan" value={formData.pesan} onChange={handleChange}></textarea>
      </div>
      <button type="submit">Kirim</button>
    </form>
  );
}

export default Contact;
