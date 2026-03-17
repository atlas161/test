# 📚 Guide d'utilisation du Blog VPRR

## 🚀 Installation rapide

```bash
npm install
```

## Créer un nouvel article

### 1. Via l'interface admin (recommandé)

1. Allez sur `https://vprrtestblog.netlify.app/admin/`
2. Connectez-vous avec votre compte Netlify Identity
3. Cliquez sur "Articles Blog" → "Nouvel Article"
4. Remplissez le formulaire :

| Champ | Description | Exemple |
|-------|-------------|---------|
| **Titre** | Titre de l'article | "Comment choisir sa peinture extérieure" |
| **Slug** | URL de l'article | `choisir-peinture-exterieure` |
| **Description** | Résumé SEO (150-160 caractères) | "Guide complet pour sélectionner la peinture..." |
| **Date** | Date de publication | 2024-03-15 |
| **Image** | Photo de couverture | Upload depuis votre ordinateur |
| **Tags** | Mots-clés | peinture, extérieur, conseils |
| **Temps de lecture** | Estimation | 5 minutes |
| **Contenu** | Corps de l'article | Texte + images |

5. Décochez "Brouillon" pour publier
6. Cliquez sur "Publier"

### 2. Générer les pages HTML

Après avoir créé/modifié un article via l'admin :

```bash
npm run build:blog
```

Cette commande :
- Génère les pages HTML statiques dans `/blog/`
- Met à jour le `sitemap.xml`
- Crée le fichier `articles.json` pour la liste dynamique

### 3. Déployer sur Netlify

```bash
git add .
git commit -m "Nouvel article: [titre]"
git push origin main
```

Netlify déploiera automatiquement les changements.

---

## Ajouter des images

### Dans l'éditeur Decap CMS

1. Cliquez sur l'icône dans la barre d'outils
2. Upload une image ou sélectionnez-en une existante
3. L'image sera automatiquement redimensionnée et optimisée

### Format Markdown manuel

```markdown
![Texte alternatif](/assets/img/blog/mon-image.jpg "Titre optionnel")
```

**Conseils SEO pour les images :**
- Noms de fichiers descriptifs : `ravalement-facade-angouleme.jpg`
- Texte alternatif pertinent
- Formats : JPG pour photos, PNG pour graphiques
- Taille max recommandée : 1200x630px pour les images de couverture

---

## Ajouter des vidéos

### YouTube

Dans le champ "Vidéo" de l'admin :
```
URL: https://www.youtube.com/watch?v=ABC123XYZ
Titre: Démonstration de notre technique d'hydro-gommage
```

Ou dans le contenu Markdown :
```markdown
[video](https://www.youtube.com/watch?v=ABC123XYZ)
```

### Vimeo

```markdown
[video](https://vimeo.com/123456789)
```

**La vidéo sera automatiquement intégrée** avec player responsive.

---

## Modifier un article

1. Allez sur `https://vprrtestblog.netlify.app/admin/`
2. Cliquez sur "Articles Blog"
3. Trouvez l'article à modifier
4. Cliquez dessus pour l'ouvrir
5. Faites vos modifications
6. "Enregistrer" puis "Publier"
7. Relancez `npm run build:blog` en local
8. Commit et push

---

## Supprimer un article

1. Dans l'admin, ouvrez l'article
2. Cliquez sur "Supprimer l'entrée" (en haut à droite)
3. Confirmez la suppression
4. Relancez `npm run build:blog`
5. Commit et push

**⚠️ Important :** La suppression est définitive. L'article sera aussi retiré du sitemap.

---

## 🎯 Optimisation SEO

### Checklist avant publication

- [ ] **Titre** : 50-60 caractères, contient un mot-clé principal
- [ ] **Description** : 150-160 caractères, accrocheuse
- [ ] **Slug** : Court, descriptif, sans accents ni espaces
- [ ] **Image** : Minimum 1200x630px, nom de fichier pertinent
- [ ] **Tags** : 3-5 mots-clés relatifs au contenu
- [ ] **Contenu** : Minimum 300 mots, structure H2/H3
- [ ] **Liens** : Au moins 2 liens internes vers autres pages

### Structure d'un article SEO-friendly

```markdown
# Titre H1 principal (accrocheur)

Introduction percutante (2-3 phrases)

## Pourquoi ce sujet est important (H2)

Contenu détaillé...

## Les étapes clés (H2)

### Étape 1 : Préparation (H3)

Explications...

### Étape 2 : Réalisation (H3)

Explications...

## Conclusion (H2)

Résumé + [appel à l'action vers contact](/index.html#contact)
```

---

## 🛠️ Commandes utiles

```bash
# Générer uniquement le blog
npm run build:blog

# Générer tout (si d'autres builds existent)
npm run build

# Tester en local
npm run dev
```

---

## 📁 Structure des fichiers

```
/content/blog/           ← Articles en Markdown (source)
/blog/                   ← Pages HTML générées
/assets/img/blog/        ← Images des articles
/admin/                  ← Interface d'administration
/scripts/build-blog.js   ← Script de génération
```

---

## 🆘 Dépannage

### Problème : L'admin ne s'ouvre pas
- Vérifiez que Netlify Identity est activé
- Vérifiez que Git Gateway est activé
- Vérifiez l'URL dans la config : `site_url: https://vprr.fr`

### Problème : Les images ne s'affichent pas
- Vérifiez que le dossier `assets/img/blog/` existe
- Vérifiez les chemins dans le Markdown
- Relancez `npm run build:blog`

### Problème : L'article n'apparaît pas sur le site
- Vérifiez que "Brouillon" est décoché
- Vérifiez que `npm run build:blog` a été exécuté
- Vérifiez que les fichiers ont été commités et pushés

### Problème : Le sitemap n'est pas à jour
- Le build met automatiquement à jour le sitemap
- Vérifiez que le fichier `sitemap.xml` est bien commité

---

## 📞 Support

En cas de problème :
1. Vérifiez ce guide
2. Consultez les logs du build Netlify
3. Contactez le développeur

---

**🎉 Bonne rédaction !**
