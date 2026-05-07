import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Plus, Trash2, Upload, Palette } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

interface Project {
  title: string;
  link: string;
  description: string;
}

interface FormData {
  name: string;
  bio: string;
  skills: { value: string }[];
  projects: Project[];
  profileImage: FileList | null;
  theme: "dark" | "light" | "minimal";
}

  const PortfolioForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const API = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<
    "dark" | "light" | "minimal"
  >("dark");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { register, handleSubmit, control, watch, setValue } =
    useForm<FormData>({
      defaultValues: {
        name: "",
        bio: "",
        skills: [{ value: "" }],
        projects: [{ title: "", link: "", description: "" }],
        profileImage: null,
        theme: "dark",
      },
    });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } =
    useFieldArray({
      control,
      name: "skills",
    });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projects",
  });

  const watchedProfileImage = watch("profileImage");

  React.useEffect(() => {
    if (watchedProfileImage && watchedProfileImage.length > 0) {
      const file = watchedProfileImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [watchedProfileImage]);

  const onSubmit = async (data: FormData) => {
  try {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");  
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("userId", String(user.id));
    formData.append("name", data.name);
    formData.append("bio", data.bio);
    formData.append("skills", JSON.stringify(data.skills.filter((s) => s.value.trim()).map((s) => s.value)));
    formData.append("projects", JSON.stringify(data.projects.filter((p) => p.title.trim())));
    formData.append("theme", data.theme);

    if (data.profileImage && data.profileImage.length > 0) {
      formData.append("profileImage", data.profileImage[0]);
    }

    const response = await axios.post(`${API}/api/portfolios`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Portfolio created successfully!");
    const shareUrl = response.data.shareUrl || response.data.slug;
    navigate(`/portfolio/${shareUrl.split("/").pop() || shareUrl}`);
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || "Failed to create portfolio");
  } finally {
    setLoading(false);  
  }
};

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-4xl font-bold mt-6 text-gray-900">
            Create Portfolio
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* BIO */}
          <div>
            <label className="block text-sm font-medium mb-2">Bio *</label>
            <textarea
              {...register("bio", { required: "Bio is required" })}
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
            />
          </div>

          {/* SKILLS */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              Skills
              <button
                type="button"
                onClick={() => appendSkill({ value: "" })}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <Plus className="w-5 h-5" />
              </button>
            </h2>

            {skillFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mt-2">
                <input
                  {...register(`skills.${index}.value`, {
                    required: "Skill is required"
                  })}
                  placeholder={`Skill ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                {skillFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* PROJECTS */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <button
              type="button"
              onClick={() => appendProject({ title: "", link: "", description: "" })}
              className="mb-4 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>

            {projectFields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 p-6 rounded-xl mt-4 bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold">Project {index + 1}</h3>
                  {projectFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <input
                  {...register(`projects.${index}.title`)}
                  placeholder="Project Title"
                  className="w-full border px-3 py-2 mb-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                />

                <input
                  {...register(`projects.${index}.link`)}
                  placeholder="Project URL (https://...)"
                  className="w-full border px-3 py-2 mb-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                />

                <textarea
                  {...register(`projects.${index}.description`)}
                  placeholder="Project Description"
                  rows={3}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 resize-vertical"
                />
              </div>
            ))}
          </div>

          {/* THEME */}
          <div>
            <label className="block text-sm font-medium mb-4">Theme</label>
            <div className="flex gap-6">
              {(["dark", "light", "minimal"] as const).map((theme) => (
                <label key={theme} className="flex items-center gap-2 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-all group">
                  <input
                    type="radio"
                    value={theme}
                    {...register("theme")}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="font-medium capitalize">{theme}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button type="submit" disabled={loading || !user}  
           className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:from-purple-700
            hover:to-purple-800 disabled:opacity-50 
           disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl">
          {loading ? (
           <>
      <span className="animate-spin mr-2">⏳</span>
      Creating Portfolio...
    </>
  ) : (
    "🚀 Generate My Portfolio"
  )}
</button>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;