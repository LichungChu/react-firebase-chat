#利用React實作即時聊天平台，學習前端技能

##核心架構：

- 使用Vite + React框架搭建應用程式
- 狀態管理採用Zustand
- 利用Firebase快速建立網站及後端服務

##關鍵技術棧：

- 前端框架：React
- 檔案儲存：Firebase Storage 處理圖片/檔案
- 資料儲存：Firebase Database 使用者對話紀錄
- 權限管理：Firebase Authentication 使用者登入
- 網站架設：Firebase Hosting 掛在網站
- 狀態同步：Zustand管理跨元件狀態

---

# Firebase 各項功能設置說明

## 一、檔案儲存：Firebase Storage — 處理圖片/檔案上傳與下載

### 設定步驟：

1. **啟用 Firebase Storage：**
   - 登入 [Firebase Console](https://console.firebase.google.com/)
   - 選擇專案 > 左側選單「Build」 > 點選「Storage」
   - 點選「開始使用」並選擇預設的儲存位置

2. **上傳與下載檔案：**

   ```javascript
   import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

   const storage = getStorage();
   const storageRef = ref(storage, 'images/example.jpg');

   // 上傳檔案
   uploadBytes(storageRef, file).then((snapshot) => {
     console.log('檔案上傳成功');
   });

   // 取得下載 URL
   getDownloadURL(storageRef).then((url) => {
     console.log('下載網址:', url);
   });
   ```

3. **設定安全規則（可限制上傳/下載權限）：**

   ```javascript
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

---

## 二、資料儲存：Firebase Realtime Database — 儲存使用者對話紀錄

### 設定步驟：

1. **啟用 Realtime Database：**
   - 在 Firebase Console 中，點選「Realtime Database」>「建立資料庫」
   - 選擇地區與模式（開發階段可用「測試模式」）

2. **儲存資料（例如對話紀錄）：**

   ```javascript
   import { getDatabase, ref, set } from "firebase/database";

   const db = getDatabase();
   set(ref(db, 'users/user1/messages'), {
     text: "哈囉，這是一段對話",
     timestamp: Date.now()
   });
   ```

3. **設定資料讀寫權限：**

   ```json
   {
     "rules": {
       ".read": "auth != null",
       ".write": "auth != null"
     }
   }
   ```

---

## 三、權限管理：Firebase Authentication — 使用者登入/註冊

### 設定步驟：

1. **啟用登入方式：**
   - 前往 Firebase Console > 「Authentication」>「登入方法」
   - 啟用 Email/Password 或其他登入方式（如 Google）

2. **使用 Email 註冊與登入：**

   ```javascript
   import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

   const auth = getAuth();

   // 註冊
   createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       console.log('註冊成功', userCredential.user);
     });

   // 登入
   signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       console.log('登入成功', userCredential.user);
     });
   ```

---

## 四、網站架設：Firebase Hosting — 架設網站

### 設定步驟：

1. **安裝 Firebase CLI 並初始化專案：**

   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   ```

2. **選擇要部署的目錄（例如 `dist/` 或 `public/`）**

3. **部署網站：**

   ```bash
   firebase deploy
   ```

4. **部署成功後會提供網址，例如：**

   ```
   Hosting URL: https://your-project-id.web.app
   ```

