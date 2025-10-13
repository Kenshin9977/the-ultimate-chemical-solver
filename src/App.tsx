import { useState } from "react";
import { motion } from "framer-motion";
import bg from "./assets/aotrt-ultimate-chemical.jpg";


type Formula = [string, string[]];

function getFormulae(phi: number, acetaldehyde: number, methylbenzene: number): Formula[] | null {
  const formulas: Record<string, number[]> = {
    "12,7": [23, 33, 29, 19, 23, 38, 19, 22, 33, 16, 36, 16, 25],
    "12,12": [38, 45, 20, 20, 21, 51, 20, 30, 41, 25, 29, 19, 26],
    "8,8": [27, 31, 21, 26, 30, 27, 26, 23, 28, 16, 28, 26, 19],
    "9,12": [30, 40, 28, 24, 18, 44, 24, 25, 29, 17, 21, 20, 18],
    "9,11": [36, 48, 19, 18, 23, 42, 18, 16, 35, 24, 43, 22, 17],
    "12,10": [34, 39, 17, 21, 30, 41, 21, 17, 37, 22, 31, 24, 21],
  };
  const key = `${acetaldehyde},${methylbenzene}`;
  const values = formulas[key];
  if (!values) return null;

  return [
    [
      "3-methyl-2,4-di-nitrobenzene",
      [
        `${values[0] - phi}: Déboucheur + Peinture + Détergent = Méthylbenzène`,
        `${values[1] - phi}: Méthylbenzène + Bicarbonate + Vinaigre + Détergent = Dinitro`,
        `${values[2] - phi}: Dinitro + Carburant = 3-methyl-2,4-di-nitrobenzene`,
      ],
    ],
    [
      "Octa-hydro-2,5-nitro-3,4,7-para-zokine",
      [
        `${values[3] - phi}: Carburant + Pièces = Formaldéhyde`,
        `${values[4] - phi}: Formaldéhyde + Nettoyant vitres = Hexamine`,
        `${values[5] - phi}: Hexamine + Vinaigre + Engrais + Détergent = Octa-hydro-2,5-nitro-3,4,7-para-zokine`,
      ],
    ],
    [
      "3,4-di-nitroxy-methyl-propane",
      [
        `${values[7] - phi}: Vodka + Piecettes = Acétaldéhyde`,
        `${values[6] - phi}: Carburant + Pièces = Formaldéhyde`,
        `${values[8] - phi}: Acétaldéhyde + Formaldéhyde + Détergent = Aldéhyde pâteux`,
        `${values[9] - phi}: Aldéhyde pâteux + Dissolvant = 3,4-di-nitroxy-methyl-propane`,
      ],
    ],
    [
      "1,3,5 tera-nitra-phenol",
      [
        `${values[10] - phi}: Huile moteur + Insectifuge + Nettoyant roues = Phénol`,
        `${values[11] - phi}: Phénol + Déboucheur = Acide phénolsulfonique`,
        `${values[12] - phi}: Acide phénolsulfonique + Détergent = 1,3,5 tera-nitra-phenol`,
      ],
    ],
  ];
}

export default function App() {
  const [phi, setPhi] = useState<number | "">("");
  const [acetaldehyde, setAcetaldehyde] = useState<number | "">("");
  const [methylbenzene, setMethylbenzene] = useState<number | "">("");
  const [results, setResults] = useState<Formula[] | string>("");

  const handleCompute = () => {
    if (phi === "" || acetaldehyde === "" || methylbenzene === "") {
      setResults("Sélectionnez une valeur pour tous les champs.");
      return;
    }

    const formulas = getFormulae(Number(phi), Number(acetaldehyde), Number(methylbenzene));
    setResults(formulas ?? "Il n'est pas possible de tomber sur cette combinaison de valeurs dans une partie.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          <span>Attaque de la chose radioactive</span>
          <span className="block">Calculateur formule chimique</span>
        </h1>

      {/* Zone image + menus */}
      <div className="relative w-[400px] mb-6">
        <img
          src={bg}
          alt="chemical background"
          className="w-full h-auto object-contain rounded-2xl"
        />

        <div className="absolute top-[5%] left-[59%]">
          <select
            className="bg-gray-900/70 border border-gray-600 rounded-xl px-3 py-2"
            value={phi}
            onChange={(e) => setPhi(Number(e.target.value))}
          >
            <option value=""></option>
            {[...Array(14)].map((_, i) => (
              <option key={i + 2} value={i + 2}>
                {i + 2}
              </option>
            ))}
          </select>
        </div>

        <div className="absolute top-[20%] left-[59%]">
          <select
            className="bg-gray-900/70 border border-gray-600 rounded-xl px-3 py-2"
            value={acetaldehyde}
            onChange={(e) => setAcetaldehyde(Number(e.target.value))}
          >
            <option value=""></option>
            {[8, 9, 12].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div className="absolute top-[45%] left-[59%]">
          <select
            className="bg-gray-900/70 border border-gray-600 rounded-xl px-3 py-2"
            value={methylbenzene}
            onChange={(e) => setMethylbenzene(Number(e.target.value))}
          >
            <option value=""></option>
            {[7, 8, 10, 11, 12].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 hover:bg-blue-500 transition-colors px-5 py-2 rounded-xl font-medium shadow-lg"
        onClick={handleCompute}
      >
        Calculer les formules
      </motion.button>

      <div className="mt-6 text-left w-[90%] max-w-lg">
        {typeof results === "string" ? (
          <p className="text-center">{results}</p>
        ) : (
          results.map(([title, steps], idx) => (
            <motion.details
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-800/70 rounded-xl p-3 mb-3 border border-gray-700"
            >
              <summary className="cursor-pointer font-semibold">{title}</summary>
              <ul className="mt-2 ml-5 list-disc text-sm text-gray-300">
                {steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </motion.details>
          ))
        )}
      </div>
    </div>
  );
}
