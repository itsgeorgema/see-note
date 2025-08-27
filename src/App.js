import logo from './logo.svg';
import './App.css';

function App() {
  // Check if we're running in Electron
  const isElectron = window.electronAPI !== undefined;

  const getAppInfo = () => {
    if (isElectron && window.electronAPI) {
      return {
        name: window.electronAPI.getAppName(),
        version: window.electronAPI.getVersion(),
        platform: window.electronAPI.getPlatform()
      };
    }
    return { name: 'SeeNote', version: 'Web Version', platform: 'Web' };
  };

  const appInfo = getAppInfo();

  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      {/* Custom Title Bar for Desktop App */}
      {isElectron && (
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-2 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <img src={logo} className="w-6 h-6" alt="logo" />
            <span className="font-semibold text-gray-700">{appInfo.name}</span>
          </div>
        </div>
      )}

      {/* Main Content - Simple Logo and Text */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img src={logo} className="w-32 h-32 mx-auto mb-8 animate-pulse" alt="logo" />
          <h1 className="text-4xl font-bold text-gray-800">desktop app</h1>
          
          {/* Electron Info Display */}
          {isElectron && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-md mx-auto">
              <p className="text-sm text-blue-700">
                Running on {appInfo.platform} • Electron v{appInfo.version}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
