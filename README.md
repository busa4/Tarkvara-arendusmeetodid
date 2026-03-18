#  Tarkvara-Arendusmeetodid

##  Kirjeldus

See on meeskonnaprojekt, mis on loodud kasutades **Next.js** raamistikku.
Rakendus on **autovaruosade veebipood**, millel on kasutajate haldamise funktsionaalsus.

Kasutajad saavad:

* registreeruda ja sisse logida
* otsida kasutajaid
* vaadata ja muuta oma profiili
* sirvida ja otsida autovaruosi

---

##  Tehnoloogiad

* **Framework:** Next.js
* **Andmebaas:** MongoDB
* **Keel:** TypeScript

---

## Käivitamine

### 1. Klooni repositoorium

```bash
git clone https://github.com/busa4/Tarkvara-Arendusmeetodid.git
cd Tarkvara-Arendusmeetodid
```

### 2. Paigalda sõltuvused

```bash
npm install
```

### 3. Keskkonnamuutujad

Loo projekti juurkausta `.env` fail:

```env
MONGODB_URI=your_mongodb_connection_string
```

### 4. Käivita arendusserver

```bash
npm run dev
```

Ava brauseris: http://localhost:3000

---

##  Projekti struktuur

```
/app            - lehed ja route'id
/components     - taaskasutatavad komponendid
/models         - MongoDB mudelid
/lib            - andmebaasi ühendus ja utiliidid
```

---

##  Funktsionaalsus

*  Kasutaja registreerimine ja sisselogimine
*  Autoriseerimine
*  Kasutajate leht
*  Kasutajate otsing
*  Autovaruosade leht
*  Autovaruosade otsing
*  Profiili leht
*  MongoDB andmebaas

---

##  Kasutajarollid

* **Kasutaja** – saab sirvida autovaruosi ja hallata oma profiili
* **Admin** – saab hallata kasutajaid ja tooteid

---

##  Edasised arendused

*  Makselahendused
*  Tellimuste haldus
*  Arvustused ja hinnangud
*  Täpsem filtreerimine

---

Projekt on loodud hariduslikul eesmärgil.
