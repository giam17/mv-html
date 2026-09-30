# BarberElite Studio 💈

App de reservas para barbería hecha con **Vite + React**.

## Funcionalidades
- 🗓️ Selección de fecha y horario
- ✂️ Catálogo de 6 servicios con precios
- 👤 Selección de barbero
- 🎉 Modal de confirmación animado
- 🌙 Diseño dark mode premium con tema dorado

## Correr localmente

```bash
npm install
npm run dev
```

## Desplegar en producción (Oracle Cloud / cualquier servidor Linux)

```bash
# 1. Instalar Node.js en el servidor (si no está)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Clonar el repo
git clone https://github.com/giam17/mv-html.git
cd mv-html

# 3. Instalar dependencias y compilar
npm install
npm run build

# 4. Servir con npx serve (simple) o nginx
npx serve dist -p 3000
```

## Stack
- ⚡ Vite 8
- ⚛️ React 19
- 🎨 CSS Vanilla (sin frameworks CSS)
