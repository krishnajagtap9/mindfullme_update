
import React from 'react'

const Contact = () => {
  return (
    <section className="w-full px-4 py-12 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#121C52]">Get in touch</h2>
        <p className="text-sm mt-2 text-gray-600">
          Feel free to reach out via phone, WhatsApp, email, or by submitting a contact form. We'll get back to you ASAP.
        </p>
      </div>

      <div className="mt-10 max-w-5xl mx-auto bg-[#F9FAFB] rounded-md shadow-md overflow-hidden md:flex">
        {/* Left Image */}
        <div className="md:w-1/2 w-full">
          <img
            src="https://www.discover.com/content/dam/discover/en_us/credit-cards/card-acquisitions/grey-redesign/global/images/background/bg-contact-us-stocksy-675-456.png"
            alt="Contact Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="md:w-1/2 w-full p-6 md:p-10">
          <h3 className="text-xl md:text-2xl font-bold text-[#121C52] mb-4 text-left">
            Connect With Your Next Great Hire Today!
          </h3>

          <form className="space-y-3">
            <input type="text" placeholder="Company" className="w-full border border-gray-300 rounded px-4 py-2" />
            <input type="text" placeholder="Your Name" className="w-full border border-gray-300 rounded px-4 py-2" />
            <input type="text" placeholder="Phone Number" className="w-full border border-gray-300 rounded px-4 py-2" />
            <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded px-4 py-2" />
            <textarea placeholder="Project Detail" rows="3" className="w-full border border-gray-300 rounded px-4 py-2" />

            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1" />
              <p>By sending this form I confirm that I have read and accept the <span className="text-blue-500">Privacy Policy</span></p>
            </div>

            <button type="submit" className="bg-black text-white w-full py-2 rounded hover:opacity-90 transition">
              GET CONSULTATION
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact