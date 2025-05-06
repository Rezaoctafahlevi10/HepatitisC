import React from 'react';

function Contact() {
  return (
    <section id="contact" className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Hubungi Kami</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-2">Nama:</label>
          <input type="text" className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-2">Email:</label>
          <input type="email" className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-2">Pesan:</label>
          <textarea className="border p-2 w-full"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Kirim</button>
      </form>
    </section>
  );
}

export default Contact;