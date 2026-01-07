const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require("electron-updater");
const path = require('path');

let mainWindow;

// Cấu hình log để kiểm tra update (tùy chọn)
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('datatest.html');

  // Kiểm tra update ngay khi mở app
  autoUpdater.checkForUpdatesAndNotify();
}

// Các sự kiện Update
autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Cập nhật',
    message: 'Đã tìm thấy bản cập nhật mới. Đang tự động tải về...'
  });
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Hoàn tất',
    message: 'Bản cập nhật đã sẵn sàng. Ứng dụng sẽ khởi động lại để cài đặt.',
    buttons: ['Cài đặt ngay']
  }).then(() => {
    autoUpdater.quitAndInstall();
  });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});