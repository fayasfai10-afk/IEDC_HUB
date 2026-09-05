import { useState } from "react";
import { createProject } from "../services/api";

const initialForm = {
  founderName: "",
  title: "",
  domain: "",
  abstract: "",
  pitchDeckLink: "",
};

export default function SubmissionForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function validate() {
    const newErrors = {};

    if (!form.founderName.trim()) {
      newErrors.founderName = "Founder name is required";
    }

    if (form.title.trim().length < 3) {
      newErrors.title = "Startup title must be at least 3 characters";
    }

    if (!form.domain) {
      newErrors.domain = "Please select a category";
    }

    if (form.abstract.trim().length < 20) {
      newErrors.abstract =
        "Summary must contain at least 20 characters";
    }

    if (!form.pitchDeckLink.trim()) {
      newErrors.pitchDeckLink =
        "Pitch deck link is required";
    } else {
      try {
        new URL(form.pitchDeckLink);
      } catch {
        newErrors.pitchDeckLink =
          "Enter a valid URL";
      }
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setStatus("");

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setStatus("loading");

      await createProject({
        title: form.title,
        domain: form.domain,
        teamLead: form.founderName,
        abstract: form.abstract,
        pitchDeckLink: form.pitchDeckLink,
      });

      setForm(initialForm);
      setErrors({});
      setStatus("success");

    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
    >

      <div className="grid gap-6 md:grid-cols-2">

        <Field
          label="Founder Name"
          name="founderName"
          value={form.founderName}
          onChange={handleChange}
          error={errors.founderName}
          placeholder="Enter founder name"
        />

        <Field
          label="Startup Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="Enter startup title"
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            name="domain"
            value={form.domain}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-indigo-400/50"
          >
            <option value="">Select category</option>
            <option value="AI">AI</option>
            <option value="EdTech">EdTech</option>
            <option value="FinTech">FinTech</option>
            <option value="HealthTech">HealthTech</option>
            <option value="AgriTech">AgriTech</option>
            <option value="IoT">IoT</option>
            <option value="Sustainability">
              Sustainability
            </option>
          </select>

          {errors.domain && (
            <p className="mt-2 text-xs text-red-400">
              {errors.domain}
            </p>
          )}
        </div>

        <Field
          label="Pitch Deck Link"
          name="pitchDeckLink"
          value={form.pitchDeckLink}
          onChange={handleChange}
          error={errors.pitchDeckLink}
          placeholder="https://..."
        />

      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Project Summary
        </label>

        <textarea
          name="abstract"
          value={form.abstract}
          onChange={handleChange}
          rows="5"
          placeholder="Describe your startup idea..."
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-indigo-400/50"
        />

        {errors.abstract && (
          <p className="mt-2 text-xs text-red-400">
            {errors.abstract}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-xl bg-indigo-500 px-5 py-3.5 font-semibold transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading"
          ? "Submitting..."
          : "Submit Pitch"}
      </button>

      {status === "success" && (
        <p className="mt-4 rounded-xl bg-emerald-400/10 p-4 text-sm text-emerald-400">
          Your startup pitch has been submitted successfully.
        </p>
      )}

      {status && status !== "success" && status !== "loading" && (
        <p className="mt-4 rounded-xl bg-red-400/10 p-4 text-sm text-red-400">
          {status}
        </p>
      )}

    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-indigo-400/50"
      />

      {error && (
        <p className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
