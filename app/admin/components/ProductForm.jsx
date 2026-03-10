"use client";

import { useState } from "react";

const tallas = ["XS", "S", "M", "L", "XL"];
const lineas = [
  { value: "clasica", label: "Velour Clásica" },
  { value: "noche", label: "Velour Noche" },
  { value: "co", label: "Velour Co." },
  { value: "edit", label: "Velour Edit" },
];

export default function ProductForm({ producto, onSave, onCancel }) {
  // Usar lazy initialization para generar ID único solo una vez
  const [formData, setFormData] = useState(() => {
    if (producto) {
      return {
        ...producto,
        imagenes: [
          producto.imagenes[0] || "",
          producto.imagenes[1] || "",
          producto.imagenes[2] || "",
          producto.imagenes[3] || "",
        ],
        colores: producto.colores || [],
        unidadesRestantes: producto.unidadesRestantes || null,
      };
    }

    return {
      id: `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      nombre: "",
      linea: "clasica",
      precio: "",
      descripcion: "",
      tallas: ["XS", "S", "M", "L", "XL"],
      disponibilidad: {
        XS: true,
        S: true,
        M: true,
        L: true,
        XL: true,
      },
      colores: [],
      imagenes: ["", "", "", ""],
      destacado: false,
      esLimitado: false,
      unidadesRestantes: null,
    };
  });

  const [colorInput, setColorInput] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.imagenes];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, imagenes: newImages }));
  };

  const handleTallaToggle = (talla) => {
    setFormData((prev) => ({
      ...prev,
      disponibilidad: {
        ...prev.disponibilidad,
        [talla]: !prev.disponibilidad[talla],
      },
    }));
  };

  const handleAddColor = () => {
    if (colorInput.trim() && !formData.colores.includes(colorInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        colores: [...prev.colores, colorInput.trim()],
      }));
      setColorInput("");
    }
  };

  const handleRemoveColor = (color) => {
    setFormData((prev) => ({
      ...prev,
      colores: prev.colores.filter((c) => c !== color),
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (!formData.precio || formData.precio <= 0) {
      newErrors.precio = "El precio debe ser mayor a 0";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    }

    const validImages = formData.imagenes.filter((img) => img.trim());
    if (validImages.length === 0) {
      newErrors.imagenes = "Debe haber al menos una imagen";
    }

    if (
      formData.esLimitado &&
      (!formData.unidadesRestantes || formData.unidadesRestantes <= 0)
    ) {
      newErrors.unidadesRestantes =
        "Las unidades restantes son obligatorias para ediciones limitadas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Limpiar imágenes vacías
    const cleanedData = {
      ...formData,
      imagenes: formData.imagenes.filter((img) => img.trim()),
      precio: parseFloat(formData.precio),
      unidadesRestantes: formData.esLimitado
        ? parseInt(formData.unidadesRestantes)
        : null,
    };

    onSave(cleanedData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white max-w-4xl w-full my-8 rounded shadow-lg">
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-2xl font-light">
            {producto ? "Editar Producto" : "Nuevo Producto"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nombre y Línea */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Nombre del producto *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                className={`w-full px-4 py-2 border ${errors.nombre ? "border-red-500" : "border-neutral-300"} focus:border-velour-black focus:outline-none`}
                placeholder="Ej: Blusa Atelier"
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Línea *
              </label>
              <select
                value={formData.linea}
                onChange={(e) => handleChange("linea", e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 focus:border-velour-black focus:outline-none"
              >
                {lineas.map((linea) => (
                  <option key={linea.value} value={linea.value}>
                    {linea.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Precio (COP) *
            </label>
            <input
              type="number"
              value={formData.precio}
              onChange={(e) => handleChange("precio", e.target.value)}
              className={`w-full px-4 py-2 border ${errors.precio ? "border-red-500" : "border-neutral-300"} focus:border-velour-black focus:outline-none`}
              placeholder="145000"
              min="0"
              step="1000"
            />
            {errors.precio && (
              <p className="text-red-500 text-xs mt-1">{errors.precio}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Descripción *
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              className={`w-full px-4 py-2 border ${errors.descripcion ? "border-red-500" : "border-neutral-300"} focus:border-velour-black focus:outline-none`}
              rows="3"
              placeholder="Descripción detallada del producto..."
            />
            {errors.descripcion && (
              <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>
            )}
          </div>

          {/* Imágenes */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              URLs de Imágenes (Unsplash) *
            </label>
            <div className="space-y-2">
              {formData.imagenes.map((img, index) => (
                <input
                  key={index}
                  type="url"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 focus:border-velour-black focus:outline-none text-sm"
                  placeholder={`https://images.unsplash.com/photo-...?w=800&h=1200 ${index === 0 ? "(Principal)" : ""}`}
                />
              ))}
            </div>
            {errors.imagenes && (
              <p className="text-red-500 text-xs mt-1">{errors.imagenes}</p>
            )}
            <p className="text-xs text-neutral-500 mt-1">
              Usa URLs de Unsplash. La primera imagen será la principal.
            </p>
          </div>

          {/* Disponibilidad por Talla */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Disponibilidad por Talla
            </label>
            <div className="flex gap-3">
              {tallas.map((talla) => (
                <button
                  key={talla}
                  type="button"
                  onClick={() => handleTallaToggle(talla)}
                  className={`px-4 py-2 border-2 transition-all ${
                    formData.disponibilidad[talla]
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-red-300 bg-red-50 text-red-500"
                  }`}
                >
                  {talla}
                </button>
              ))}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Haz clic para marcar/desmarcar disponibilidad
            </p>
          </div>

          {/* Colores */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Colores Disponibles
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddColor())
                }
                className="flex-1 px-4 py-2 border border-neutral-300 focus:border-velour-black focus:outline-none"
                placeholder="Negro, Blanco, Beige..."
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 transition-colors"
              >
                Añadir
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {formData.colores.map((color) => (
                <span
                  key={color}
                  className="px-3 py-1 bg-neutral-100 text-neutral-800 text-sm rounded-full flex items-center gap-2"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(color)}
                    className="hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Opciones adicionales */}
          <div className="space-y-3 border-t border-neutral-200 pt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.destacado}
                onChange={(e) => handleChange("destacado", e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Marcar como producto destacado</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.esLimitado}
                onChange={(e) => handleChange("esLimitado", e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Edición limitada</span>
            </label>

            {formData.esLimitado && (
              <div className="ml-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Unidades restantes *
                </label>
                <input
                  type="number"
                  value={formData.unidadesRestantes || ""}
                  onChange={(e) =>
                    handleChange("unidadesRestantes", e.target.value)
                  }
                  className={`w-32 px-4 py-2 border ${errors.unidadesRestantes ? "border-red-500" : "border-neutral-300"} focus:border-velour-black focus:outline-none`}
                  placeholder="20"
                  min="1"
                />
                {errors.unidadesRestantes && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.unidadesRestantes}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-neutral-300 hover:border-neutral-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-velour-black text-white hover:bg-velour-charcoal transition-colors uppercase tracking-wider text-sm font-medium"
            >
              {producto ? "Guardar Cambios" : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
