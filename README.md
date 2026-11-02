# CV en ligne — Abdoulaye Seck

Portfolio animé (preset B « Nocturne Prestige ») : React 19, Tailwind CSS 3.4.17, GSAP 3 + ScrollTrigger, Lucide React.

## Lancer le projet

```bash
npm install
npm run dev      # aperçu local sur http://localhost:5173
npm run build    # version prête à publier dans le dossier dist/
```

Le dossier `dist/` peut être mis en ligne tel quel sur Vercel, Netlify ou GitHub Pages.

## Personnaliser

Tout le contenu se trouve dans l'objet `PROFILE`, en haut de `src/App.jsx` :

- `contact` : remplace l'email, le téléphone et le lien LinkedIn (laisse `''` pour masquer une ligne).
- `photo` : dépose ta photo dans `public/` (ex. `public/photo.jpg`) puis mets `photo: './photo.jpg'`.
- `cvPdf` : remplace `public/cv-abdoulaye-seck.pdf` par ton vrai CV PDF (même nom de fichier).
- `experiences`, `skills`, `qualities`, `education`, `stats`, `about` : textes du CV.

## Recevoir les demandes du formulaire « Me contacter »

Par défaut, le bouton « Envoyer la demande » ouvre la messagerie du visiteur avec la demande pré-remplie, adressée à `contact.email`.

Pour recevoir les demandes directement dans ta boîte mail, sans dépendre de la messagerie du visiteur :

1. Crée un compte gratuit sur https://formspree.io et un nouveau formulaire.
2. Copie l'URL du formulaire (du type `https://formspree.io/f/abcdwxyz`).
3. Colle-la dans `formEndpoint` de l'objet `PROFILE`, puis relance `npm run build`.
