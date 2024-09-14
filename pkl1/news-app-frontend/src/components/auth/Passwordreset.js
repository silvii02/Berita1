import React, { useState } from 'react';
import axios from 'axios';

const Passwordreset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/reset-password', {
        email,
      });
      console.log(response.data); // Untuk debug
      setSuccess('Link reset password telah dikirim ke email Anda.');
      setError('');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Gagal mengirim email reset. Silakan coba lagi.');
      }
      setSuccess('');
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className='h2pw'>Lupa Password</h2>
      <p className='lupapw'>Jangan khawatir, masukan email anda</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email"></label>
          <input
            placeholder='Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
          />
        </div>
        <button type="submit">Kirim</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
      <p className="back-to-login">
        <a href="/login">Kembali ke halaman login</a>
      </p>

      <style>
        {`
   body {
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh; 
              margin: 0; 
            }

            .h2pw {
              text-align: left; 
              font-size: 24px; 
              color: #21409A; 
              margin-bottom: 10px; 
              font-weight: bold; 
            }           

            .lupapw {
              text-align: left;
              font-size: 16px;
              color: #555;
              margin-bottom: 20px; 
            }           

            .reset-password-container {
              max-width: 450px;
              margin: auto;
              padding: 80px 45px;
              border: 1px solid #ddd;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              background-color: #fffff;
            }

            .reset-password-container form {
              display: flex;
              flex-direction: column;
              align-items: flex-start; /* Ratakan ke kiri */
            }

            .reset-password-container label {
              margin-bottom: 5px;
              font-weight: bold;
              color: #555;
            }

            .reset-password-container input {
              padding: 10px;
              margin-bottom: 8px; 
              border: 1px solid #ccc;
              border-radius: 15px;
              width: 122%; /* Sesuaikan lebar input */
              box-sizing: border-box;
            }
                    
            .reset-password-container button {
              padding: 10px;
              border: none;
              border-radius: 15px;
              background-color: #21409A;
              color: #fff;
              font-size: 16px;
              width: 100%; 
              cursor: pointer;
              margin-top: 5px; /* Kurangi jarak atas tombol */
            }
                    
            .reset-password-container button:hover {
              background-color: #21409A;
            }
                    

            .reset-password-container p {
              text-align: left; /* Ratakan ke kiri */
              font-size: 14px;
              margin-top: 10px;
            }

            .reset-password-container p.error {
              color: red;
            }

            .reset-password-container p.success {
              color: green;
            }

.back-to-login {
  text-align: center; /* Ubah menjadi center untuk meratakan teks ke tengah */
  margin-top: 20px; /* Jarak atas */
}

.back-to-login a {
  color: #21409A;
  text-decoration: none;
}

.back-to-login a:hover {
  text-decoration: underline;
}
/* Media query untuk layar kecil */
@media (max-width: 768px) {
  .reset-password-container {
    padding: 30px 20px; /* Sesuaikan padding untuk layar kecil */
  }

  .h2pw {
    font-size: 20px; /* Kurangi ukuran font untuk layar kecil */
  }

  .lupapw {
    font-size: 14px; /* Kurangi ukuran font untuk layar kecil */
  }

  .reset-password-container button {
    padding: 10px; /* Sesuaikan ukuran tombol */
    font-size: 14px; /* Kurangi ukuran font tombol */
  }
}

        `}
      </style>
    </div>
  );
};

export default Passwordreset;
