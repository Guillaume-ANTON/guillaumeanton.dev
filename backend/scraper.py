import requests
from bs4 import BeautifulSoup
import csv
import os

def run_scraper(url: str, tags: list[str], output: str = "generated/output.csv"):
    try:
        # Requête HTTP vers l'URL donnée
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        raise Exception(f"Erreur de requête : {e}")

    # Parsing HTML
    soup = BeautifulSoup(response.content, "html.parser")

    # Extraire les balises demandées
    results = []
    for tag in tags:
        elements = soup.find_all(tag)
        for el in elements:
            text = el.get_text(strip=True)
            results.append({
                "tag": tag,
                "content": text
            })

    # Créer le dossier s'il n'existe pas
    os.makedirs(os.path.dirname(output), exist_ok=True)

    # Écrire les résultats dans un CSV
    with open(output, "w", newline='', encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["tag", "content"])
        writer.writeheader()
        writer.writerows(results)

    print(f"[✓] Fichier généré : {output}")

if __name__ == "__main__":
    run_scraper(
        url="https://fr.wikipedia.org/wiki/Python",
        tags=["h1", "p", "a"],
        output="generated/test.csv"
    )