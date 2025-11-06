// Rien à installer : ce script vérifie que tout marche
const root = document.getElementById("root");

root.innerHTML = `
  <div class="max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-3">✅ Déploiement réussi</h1>
    <p class="mb-4">Ta page GitHub Pages fonctionne sans erreur 404.</p>

    <div class="space-y-2">
      <button id="btn" class="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700">
        Tester une interaction
      </button>
      <p id="out" class="text-sm text-gray-300"></p>
    </div>
  </div>
`;

document.getElementById("btn").addEventListener("click", () => {
  document.getElementById("out").textContent =
    "Bouton cliqué 👍 (ton JS est bien chargé)";
});
