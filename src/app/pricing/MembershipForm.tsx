"use client";

import React, { useState } from "react";

interface Membership {
  id: number;
  name: string;
  price: string;
  benefits: string;
}

interface Props {
  memberships: Membership[];
}

export default function MembershipForm({ memberships }: Props) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    membership: "",
  });
  const [registrationStatus, setRegistrationStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegistrationStatus("Registering...");

    if (!formData.username || !formData.email || !formData.password || !formData.membership) {
      setRegistrationStatus("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          membership: parseInt(formData.membership, 10),
        }),
      });

      if (response.ok) {
        setRegistrationStatus("Registration successful! Please log in.");
        setFormData({ username: "", email: "", password: "", membership: "" });
      } else {
        const errorData = await response.json();
        setRegistrationStatus(`Registration failed: ${errorData.detail || JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="mt-12 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Join Us Today!</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-neutral-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="membership" className="block text-sm font-medium text-neutral-700">Select Membership</label>
          <select
            id="membership"
            name="membership"
            value={formData.membership}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            <option value="">-- Select a Membership --</option>
            {memberships.map((membership) => (
              <option key={membership.id} value={membership.id}>
                {membership.name} - ${membership.price}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Register
        </button>
        {registrationStatus && <p className="mt-4 text-center text-sm">{registrationStatus}</p>}
      </form>
    </section>
  );
}
