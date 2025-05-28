"use client";

import axios from "axios";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    const { firstName, email, phone, company, subject, message } = formData;

    if (!firstName || !email || !phone || !company || !subject || !message) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`,
        {
          name: firstName,
          email,
          subject,
          message,
        }
      );

      if (res.status === 201) {
        toast.success("Message sent successfully!");
        setFormData({
          firstName: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
        });
      }
    } catch {
      toast.error("Failed to send message.");
    }
  };

  return (
    <div className="min-h-screen md:container px-4 md:px-12 py-16 mx-auto">
      <Toaster />
      <div>
        <h2 className="font-bold text-3xl md:text-[48px]">Contact Us.</h2>
        <p className="my-6 text-xl text-gray-500">
          Have questions or need assistance? We’re here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-11">
        <div className="bg-gray-100 p-5 rounded-xl">
          <h2 className="text-2xl mb-4 font-bold">
            Fill out the form below and our team will get back to you asap!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block mb-1 ">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  required
                  onChange={handleChange}
                  className="border border-gray-400 px-4 py-1 rounded-md w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 ">
                  Email
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="border border-gray-400 px-4 py-1 rounded-md w-full"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 ">
                  Phone No. (Optional)
                </label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  className="border border-gray-400 px-4 py-1 rounded-md w-full"
                />
              </div>
              <div>
                <label htmlFor="company" className="block mb-1 ">
                  Company (Optional)
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  onChange={handleChange}
                  className="border border-gray-400 px-4 py-1 rounded-md w-full"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="subject" className="block mb-1 ">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                name="subject"
                onChange={handleChange}
                className="border border-gray-400 px-4 py-1 rounded-md w-full"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="block mb-1 ">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                onChange={handleChange}
                className="border border-gray-400 px-4 py-1 rounded-md w-full resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                Get in touch
              </button>
            </div>
          </form>
        </div>

        <div className="bg-gray-100 p-5 rounded-xl flex items-center">
          <div className="text-gray-800 space-y-3">
            <h2 className="text-2xl font-bold">Office Address</h2>
            <p className="font-bold text-xl">Acme Electronics</p>
            <p className="text-sm">
              <strong>
                <MapPin size={20} className="inline-block" /> Address:
              </strong>{" "}
              123 Main St, New York, NY 10001
            </p>
            <div className="flex flex-wrap gap-4">
              <p className="text-sm">
                <strong>
                  <Mail size={20} className="inline-block" /> Email:
                </strong>{" "}
                <a
                  href="mailto:tarikulabir@gmail.com"
                  className="text-blue-600"
                >
                  tarikulabir@gmail.com
                </a>
              </p>
              <p>
                <strong>
                  <Phone size={20} className="inline-block" /> Phone:
                </strong>{" "}
                +880 123888435
              </p>
            </div>
            <p className="text-sm">
              <strong>
                <Calendar size={20} className="inline-block" /> Joined:
              </strong>{" "}
              May 6, 2025
            </p>
            <h3 className="font-bold text-xl mt-9">Business hours</h3>
            <p>Mon–Fri : 9 AM–5PM</p>
            <p>Sat–Sun (Closed)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
