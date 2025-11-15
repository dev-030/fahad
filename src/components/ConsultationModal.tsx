"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    referral: "",
    comment: "",
    subscribeRemindersEmail: false,
    subscribeRemindersText: false,
    subscribeOffersEmail: false,
    subscribeOffersText: false,
    honeypot: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) {
      // It's a bot
      console.log("Bot submission detected.");
      return;
    }
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    alert("Thank you for your submission!");
    onClose(); // Close modal on successful submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-8 max-w-2xl w-full relative text-white animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-red-600 transition-colors"
          aria-label="Close modal"
        >
          <FaTimes size={24} />
        </button>
        
        <div className="text-center mb-6">
            <h2 className="text-3xl font-black uppercase text-red-600">Get a Free Consultation and Free Week Trial</h2>
            <p className="text-neutral-400 mt-2 max-w-lg mx-auto">
            If you are in need BJJ, Muay Thai, MMA or Fitness training, or if you want to talk about your fitness and MMA goals, please feel free to contact us.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field for spam prevention */}
          <div className="absolute w-0 h-0 overflow-hidden">
            <label htmlFor="honeypot">Do not fill in this field</label>
            <input
              type="text"
              id="honeypot"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex={-1}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="firstName" placeholder="First Name" required className="form-input" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" required className="form-input" value={formData.lastName} onChange={handleChange} />
          </div>
          
          <input type="email" name="email" placeholder="Email" required className="form-input" value={formData.email} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" className="form-input" value={formData.phone} onChange={handleChange} />

          <select name="referral" required className="form-input" value={formData.referral} onChange={handleChange}>
            <option value="" disabled>How did you hear about us?</option>
            <option value="social-media">Social Media</option>
            <option value="friend">Friend</option>
            <option value="search-engine">Search Engine (Google, etc.)</option>
            <option value="advertisement">Advertisement</option>
            <option value="other">Other</option>
          </select>

          <textarea name="comment" placeholder="Comment (optional)" className="form-input h-24" value={formData.comment} onChange={handleChange}></textarea>

          <div className="space-y-4 rounded-lg border border-neutral-800 p-4">
            <fieldset>
              <legend className="text-base font-medium text-white mb-2">Subscribe to reminders & notifications</legend>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer text-neutral-300 hover:text-white">
                  <input type="checkbox" name="subscribeRemindersEmail" checked={formData.subscribeRemindersEmail} onChange={handleChange} className="form-checkbox" />
                  <span>Email</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-neutral-300 hover:text-white">
                  <input type="checkbox" name="subscribeRemindersText" checked={formData.subscribeRemindersText} onChange={handleChange} className="form-checkbox" />
                  <span>Text</span>
                </label>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Get updates on events and our latest offers.</p>
            </fieldset>
          </div>

          <div className="text-center pt-4">
            <button type="submit" className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-12 uppercase rounded-full transition-all hover:shadow-lg hover:shadow-red-600/50 hover:scale-105">Submit</button>
          </div>
          
          <p className="text-xs text-neutral-500 text-center pt-2">
            By submitting this form, you agree to our <a href="/privacy-policy" className="underline hover:text-white transition-colors">Privacy Policy</a>.
          </p>
        </form>
      </div>
      <style jsx>{`
        .form-input {
            background-color: #262626;
            border: 1px solid #404040;
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
            width: 100%;
            color: white;
            transition: border-color 0.3s, box-shadow 0.3s;
        }
        .form-input::placeholder {
            color: #a3a3a3;
        }
        .form-input:focus {
            outline: none;
            border-color: #dc2626;
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.4);
        }
        .form-checkbox {
            height: 1.25rem;
            width: 1.25rem;
            background-color: #404040;
            border: 1px solid #525252;
            border-radius: 0.25rem;
            color: #dc2626;
        }
        .form-checkbox:focus {
            ring: #dc2626;
            --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
            --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
            box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
        }
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ConsultationModal;

