# 🎮 Век живи — век учись

Браузерная кликер-игра с полной системой регистрации и авторизации.  
Проект выполнен в рамках дипломной работы в Академии "ШАГ".

---

## 🚀 Стек технологий

### 🖥️ Фронтенд:
- React (на JavaScript)
- Vite
- Axios
- React Router
- Анимации (CSS, Framer Motion)
- Авторизация через JWT
- Адаптивный UI

### 🛠️ Бэкенд:
- Django 4.x
- Django REST Framework
- djangorestframework-simplejwt
- SQLite (по умолчанию)

---

## 📦 Установка

### ⚙️ Клонировать проект:
```bash
git clone https://github.com/Abafarius/Clicker-js-react-diploma.git
cd learn-for-life


python -m venv venv
venv\Scripts\activate   # или source venv/bin/activate на Mac/Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

cd frontend
npm install
npm run dev
