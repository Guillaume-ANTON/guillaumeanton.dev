import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function Contact( {texts} ) {
  const [form, setForm] = useState({ first: '', last: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/api/contact`, form)
      setStatus(texts.send)
      setForm({ first: '', last: '', email: '', phone: '', message: '' })
    } catch (err) {
      setStatus(texts.error)
    }
  }

  return (
    <section id="contact" className="py-6 bg-gray-0">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-6 lg:px-6">
        <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="flex items-center text-2xl font-mono text-gray-800 mb-6">
                <span className="whitespace-nowrap">await ContactMe():</span>
                <span className="ml-4 h-0.5 w-full max-w-[300px] bg-gray-300"></span>
            </h2>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
    
        {/* FORM */}
        <div className="bg-white rounded-xl shadow-md p-8 flex-1">
          <p className="text-sm text-blue-600 font-semibold">{texts.contact}</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{texts.title}</h2>
          <p className="text-gray-500 mb-6">
            {texts.description}
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input type="text" name="first" placeholder={texts.firstname} onChange={handleChange} value={form.first} className="w-1/2 px-4 py-2 border rounded-md" />
              <input type="text" name="last" placeholder={texts.lastname} onChange={handleChange} value={form.last} className="w-1/2 px-4 py-2 border rounded-md" />
            </div>
            <input type="email" name="email" placeholder={texts.mail} onChange={handleChange} value={form.email} className="w-full px-4 py-2 border rounded-md" />
            <textarea placeholder={texts.message} name="message" rows={4} onChange={handleChange} value={form.message} className="w-full px-4 py-2 border rounded-md"></textarea>
            {status && (
              <div className="mt-4 text-center text-sm font-medium text-green-600">
                {status}
              </div>
            )}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold">
              {texts.button}
            </button>
          </form>
        </div>

        {/* INFO */}
        <div className="flex-1 flex flex-col justify-between gap-8">
        
          {/* Avatar */}
          <div className="bg-gray-100 rounded-xl p-6 flex justify-center items-center h-1/2">
            <img src="/pictures/contact.png" alt="Avatar" className="w-40 h-40" />
          </div>

          {/* INFOS */}
          <div className="bg-gray-100 text-white rounded-2xl p-4 space-y-3">
          {/* MAIL */}
          <div className="flex items-center bg-gray-700 rounded-xl p-2 gap-2">
            <div className="bg-[#1E293B] p-3 rounded-full">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/mail.png" alt="Téléphone" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-200">{texts.mymail}</p>
              <p className="font-semibold">anton.guillaume0gmail.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center bg-gray-700 rounded-xl p-2 gap-2">
            <div className="bg-[#1E293B] p-3 rounded-full">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/phone.png" alt="Téléphone" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-200">{texts.phone}</p>
              <p className="font-semibold">+34 600 540 278</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center bg-gray-700 rounded-xl p-2 gap-2">
            <div className="bg-[#1E293B] p-3 rounded-full">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/home.png" alt="Téléphone" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-200">{texts.location}</p>
              <p className="font-semibold">{texts.txt}</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>

  )
}

export default Contact
