const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height:800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Kiểm tra tên file có đúng từng chữ hoa/thường không
  mainWindow.loadFile('datatest.html');

  // Mở công cụ sửa lỗi (DevTools) để xem app bị lỗi gì khi mở
  // Sau khi sửa xong bạn có thể xóa dòng dưới này
  mainWindow.webContents.openDevTools(); 
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});