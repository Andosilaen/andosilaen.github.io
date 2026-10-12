# Fernando Trisandi — Online CV & Prototypes

Static site (HTML/CSS/JS, no build step). Deployed with GitHub Pages via `.github/workflows/pages.yml`.

## Deploy
```bash
cd cv-site
git init -b main
git add .
git commit -m "Initial CV site"
git remote add origin git@github.com:Andosilaen/<repo-name>.git
git push -u origin main
```
Then in the repo: Settings → Pages → Source: **GitHub Actions**. Site URL: `https://andosilaen.github.io/<repo-name>/`
(Tip: name the repo `Andosilaen.github.io` to get `https://andosilaen.github.io/`.)

## Structure
- `index.html` — CV
- `prototypes/` — dopay, nexwave, wiratama, tigaputra (illustrative / anonymised data only)
- `Curriculum_Vitae_Fernando_Trisandi.pdf` — downloadable CV

## Catatan workflow
`.github/workflows/pages.yml` tidak bisa ditulis lewat Claude, jadi isinya disimpan di `pages.yml.txt`. Sebelum `git add`, jalankan:
```bash
mkdir -p .github/workflows && mv pages.yml.txt .github/workflows/pages.yml
```
