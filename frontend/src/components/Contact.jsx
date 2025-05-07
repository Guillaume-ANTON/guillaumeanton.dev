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
    
        {/* FORMULAIRE */}
        <div className="bg-white rounded-xl shadow-md p-8 flex-1">
          <p className="text-sm text-blue-600 font-semibold">{texts.contact}</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{texts.title}</h2>
          <p className="text-gray-500 mb-6">
            {texts.description}
          </p>

          <form className="space-y-4">
            <div className="flex gap-4">
              <input type="text" placeholder={texts.firstname} className="w-1/2 px-4 py-2 border rounded-md" />
              <input type="text" placeholder={texts.lastname} className="w-1/2 px-4 py-2 border rounded-md" />
            </div>
            <input type="email" placeholder={texts.mail} className="w-full px-4 py-2 border rounded-md" />
            <textarea placeholder={texts.message} rows={4} className="w-full px-4 py-2 border rounded-md"></textarea>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold">
              {texts.button}
            </button>
          </form>
        </div>

        {/* INFOS & AVATAR */}
        <div className="flex-1 flex flex-col justify-between gap-8">
        
          {/* Avatar en haut */}
          <div className="bg-gray-100 rounded-xl p-6 flex justify-center items-center h-1/2">
            <img src="/pictures/contact.png" alt="Avatar" className="w-40 h-40" />
          </div>

          {/* Bloc infos en bas */}
          <div className="bg-gray-100 text-white rounded-2xl p-4 space-y-3">
          {/* Bloc Email */}
          <div className="flex items-center bg-gray-700 rounded-xl p-2 gap-2">
            <div className="bg-[#1E293B] p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l8 8 8-8" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-200">Email</p>
              <p className="font-semibold">anton.guillaume0gmail.com</p>
            </div>
          </div>

          {/* Bloc Phone */}
          <div className="flex items-center bg-gray-700 rounded-xl p-2 gap-2">
            <div className="bg-[#1E293B] p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l3.6 7.59a1 1 0 001.68.09l4.24-5.3a1 1 0 011.48-.08l3.22 3.22a1 1 0 01-.08 1.48l-5.3 4.24a1 1 0 00.09 1.68L19 19h2" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-200">{texts.phone}</p>
              <p className="font-semibold">+34 600 540 278</p>
            </div>
          </div>

          {/* Bloc Adresse */}
          <div className="flex items-center bg-gray-700 rounded-xl p-2 gap-2">
            <div className="bg-[#1E293B] p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.1046 0 2-.8954 2-2s-.8954-2-2-2-2 .8954-2 2 .8954 2 2 2zm0 0c3.866 0 7 3.134 7 7h-14c0-3.866 3.134-7 7-7z" />
              </svg>
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
