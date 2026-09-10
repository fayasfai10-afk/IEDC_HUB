import { useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { createProject } from "../services/api";

const initialForm = {
  founderName: "",
  title: "",
  domain: "",
  abstract: "",
  pitchDeckLink: "",
};

export default function SubmissionForm({ onProjectCreated }) {
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
      newErrors.founderName = "Please enter your name.";
    }

    if (form.title.trim().length < 3) {
      newErrors.title = "Startup title must be at least 3 characters.";
    }

    if (!form.domain) {
      newErrors.domain = "Please select a category";
    }

    if (form.abstract.trim().length < 20) {
      newErrors.abstract =
        "Please provide a short project summary.";
    }

    if (!form.pitchDeckLink.trim()) {
      newErrors.pitchDeckLink =
        "Please add a pitch deck link.";
    } else {
      try {
        new URL(form.pitchDeckLink);
      } catch {
        newErrors.pitchDeckLink =
          "Enter a valid pitch deck URL.";
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

      const createdProject = await createProject({
        title: form.title,
        domain: form.domain,
        teamLead: form.founderName,
        abstract: form.abstract,
        pitchDeckLink: form.pitchDeckLink,
      });

      onProjectCreated(createdProject);

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
      className="border border-white/15 bg-white p-6 text-ink sm:p-8"
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
            className="w-full border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-brand focus:ring-2 focus:ring-teal-brand/15"
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
          className="w-full resize-none border border-line bg-white px-4 py-3 text-sm outline-none transition placeholder:text-muted focus:border-teal-brand focus:ring-2 focus:ring-teal-brand/15"
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
        className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-teal-brand px-5 py-3.5 font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading"
          ? <><LoaderCircle size={18} className="spinner" /> Submitting...</>
          : "Submit Pitch"}
      </button>

      {status === "success" && (
        <p className="fade-in mt-4 flex items-start gap-3 border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <Check size={18} /> <span><strong className="block">Pitch submitted successfully</strong>Your idea has been added to the IEDC Innovation Hub.</span>
        </p>
      )}

      {status && status !== "success" && status !== "loading" && (
        <p className="mt-4 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
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
        className="w-full border border-line bg-white px-4 py-3 text-sm outline-none transition placeholder:text-muted focus:border-teal-brand focus:ring-2 focus:ring-teal-brand/15"
      />

      {error && (
        <p className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
